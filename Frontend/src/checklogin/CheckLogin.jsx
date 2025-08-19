
export function isLoggedIn() {
   // Logged in if username is present in sessionStorage (set on successful login)
   return sessionStorage.getItem('username') !== null;
}

export function logout() {
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('user_id');
}
