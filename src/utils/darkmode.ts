export function isDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('darkmode') === 'active';
}

export function toggleDarkMode(): boolean {
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);

  const isDark = document.documentElement.classList.toggle('darkmode');
  
  if (isDark) {
    localStorage.setItem('darkmode', 'active');
  } else {
    localStorage.removeItem('darkmode');
  }
  
  const _ = window.getComputedStyle(css).opacity;
  document.head.removeChild(css);

  return isDark;
}

export function applyDarkMode(): void {
  if (typeof window === 'undefined') return;
  
  const css = document.createElement('style');
  css.appendChild(
    document.createTextNode(
      `* {
       -webkit-transition: none !important;
       -moz-transition: none !important;
       -o-transition: none !important;
       -ms-transition: none !important;
       transition: none !important;
      }`
    )
  );
  document.head.appendChild(css);

  if (isDarkMode()) {
    document.documentElement.classList.add('darkmode');
  } else {
    document.documentElement.classList.remove('darkmode');
  }

  const _ = window.getComputedStyle(css).opacity;
  document.head.removeChild(css);
}