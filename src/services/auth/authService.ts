import Cookies from 'js-cookie'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const login = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error('All fields are required.')
  }

  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message || 'Login failed.')
  }

  const data = await res.json()

  if (data.access_token && data.refresh_token) {
    Cookies.set('access_token', data.access_token, {
      expires: 1 / 96,
      secure: true,
      sameSite: 'strict',
    })
    Cookies.set('refresh_token', data.refresh_token, {
      expires: 7,
      secure: true,
      sameSite: 'strict',
    })
    return data
  } else {
    throw new Error('Invalid tokens received.')
  }
}

export const refreshAccessToken = async () => {
  const refreshToken = Cookies.get('refresh_token')
  if (!refreshToken) throw new Error('No refresh token found')

  const res = await fetch(`${API_BASE_URL}/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })

  if (!res.ok) throw new Error('Failed to refresh token')
  const data = await res.json()

  if (data.access_token) {
    Cookies.set('access_token', data.access_token, {
      expires: 1 / 96,
      secure: true,
      sameSite: 'strict',
    })
  }
  return data.access_token
}

export const logout = async () => {
  try {
    const refreshToken = Cookies.get('refresh_token')

    if (refreshToken) {
      await fetch(`${API_BASE_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken }),
      })
    }

    Cookies.remove('access_token')
    Cookies.remove('refresh_token')

    return { success: true, message: 'Logout successfully!' }
  } catch (error) {
    throw new Error('Logout failed')
  }
}

export const authFetch = async (url: string, options: RequestInit = {}) => {
  let token = Cookies.get('access_token')

  if (!token) {
    try {
      token = await refreshAccessToken()
    } catch (err) {
      throw new Error('Session expired, please login again')
    }
  }

  let headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  }

  let res = await fetch(url, { ...options, headers })

  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken()
      if (newToken) {
        headers = {
          ...options.headers,
          Authorization: `Bearer ${newToken}`,
        }
        res = await fetch(url, { ...options, headers })
      }
    } catch (err) {
      throw new Error('Session expired, please login again')
    }
  }

  return res
}