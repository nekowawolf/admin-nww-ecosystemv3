export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('darkmode') === 'active';
}

export function toggleDarkMode(): boolean {
  const isDark = document.documentElement.classList.toggle('darkmode');
  
  if (isDark) {
    localStorage.setItem('darkmode', 'active');
  } else {
    localStorage.removeItem('darkmode');
  }
  
  return isDark;
}

export function applyDarkMode(): void {
  if (typeof window === 'undefined') return;
  
  if (isDarkMode()) {
    document.documentElement.classList.add('darkmode');
  } else {
    document.documentElement.classList.remove('darkmode');
  }

}