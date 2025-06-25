// Auth utils pour admin (localStorage)
export function isAdminAuthenticated() {
  return localStorage.getItem('isAdmin') === 'true';
}
export function setAdminAuthenticated(val) {
  localStorage.setItem('isAdmin', val ? 'true' : 'false');
}
export function logoutAdmin() {
  localStorage.removeItem('isAdmin');
} 