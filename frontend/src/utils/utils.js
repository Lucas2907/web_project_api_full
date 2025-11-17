export function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const xssPattern = /[<>"'();/\\[\]{}=|:]/;
  return emailPattern.test(email) & !xssPattern.test(email);
}

export function isSafePassword(password) {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#!]).{8,}$/;

  return passwordPattern.test(password);
}
