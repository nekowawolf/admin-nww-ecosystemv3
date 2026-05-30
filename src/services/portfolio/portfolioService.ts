import { authFetch } from '@/services/auth/authService'
import { 
  Portfolio, 
  Certificate, 
  Design, 
  Project, 
  Experience, 
  Education, 
  SkillItem,
  HeroProfile,
} from '@/types/portfolio'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const getPortfolio = async (): Promise<Portfolio> => {
  const response = await fetch(`${API_BASE_URL}/portfolio`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  if (!response.ok) {
    throw new Error('Failed to fetch portfolio')
  }

  return response.json()
}

export const updatePortfolio = async (data: Portfolio): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to update portfolio')
  }

  return response.json()
}

export const updateHeroProfile = async (data: HeroProfile): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/hero`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || 'Failed to update hero profile')
  }

  return response.json()
}

export const addCertificate = async (data: Certificate): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/certificates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to add certificate')
  }

  return response.json()
}

export const addDesign = async (data: Design): Promise<any> => {
  const payload: any = {
    ...data,
    screenshots: Array.isArray(data.screenshots)
      ? data.screenshots
          .map((s: any) => (typeof s === 'string' ? s : s?.image_url || ''))
          .filter((url: string) => typeof url === 'string' && url.trim().length > 0)
      : undefined,
  }

  const response = await authFetch(`${API_BASE_URL}/portfolio/designs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to add design')
  }

  return response.json()
}

export const addProject = async (data: Project): Promise<any> => {
  const payload: any = {
    ...data,
    screenshots: Array.isArray(data.screenshots)
      ? data.screenshots
          .map((s: any) => (typeof s === 'string' ? s : s?.image_url || ''))
          .filter((url: string) => typeof url === 'string' && url.trim().length > 0)
      : undefined,
  }

  const response = await authFetch(`${API_BASE_URL}/portfolio/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Failed to add project')
  }

  return response.json()
}

export const addExperience = async (data: Experience): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/experience`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to add experience')
  }

  return response.json()
}

export const addEducation = async (data: Education): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/education`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to add education')
  }

  return response.json()
}

export const addTechSkill = async (data: SkillItem): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/skills/tech`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to add tech skill')
  }

  return response.json()
}

export const addDesignSkill = async (data: SkillItem): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/skills/design`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Failed to add design skill')
  }

  return response.json()
}

export const deleteCertificate = async (id: string): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/certificates/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete certificate')
  }

  return response.json()
}

export const deleteDesign = async (id: string): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/designs/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete design')
  }

  return response.json()
}

export const deleteProject = async (id: string): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/projects/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete project')
  }

  return response.json()
}

export const deleteExperience = async (id: string): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/experience/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete experience')
  }

  return response.json()
}

export const deleteEducation = async (id: string): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/education/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete education')
  }

  return response.json()
}

export const deleteDesignSkill = async (id: string): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/skills/design/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete design skill')
  }

  return response.json()
}

export const deleteTechSkill = async (id: string): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/portfolio/skills/tech/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete tech skill')
  }

  return response.json()
}