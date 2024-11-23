export function login() {
  localStorage.setItem('isLoggedIn', 'true');
}

export function isLoggedIn() {
  const result = localStorage.getItem('isLoggedIn');

  if (result === null) {
    return;
  }

  if (result === 'true') {
    return true;
  }
}

export function logout() {
  localStorage.removeItem('isLoggedIn');
}
