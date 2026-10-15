// ==========================================================================
// Web Worker: Asynchronous Input Validation & Strict Policy Computing
// Offloads heavy regex validation and policy evaluation from the main thread
// ==========================================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_LOWERCASE_REGEX = /[a-z]/;
const PASSWORD_NUMBER_REGEX = /[0-9]/;
const PASSWORD_SPECIAL_REGEX = /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/;

self.onmessage = function(event) {
  const { id, type, value, compareValue } = event.data || {};
  let isValid = false;
  let message = '';

  switch (type) {
    case 'name': {
      const trimmed = (value || '').trim();
      if (trimmed.length === 0) {
        message = 'Full Name is required.';
      } else if (trimmed.length < 3) {
        message = 'Full Name must be at least 3 characters long.';
      } else {
        isValid = true;
      }
      break;
    }

    case 'email': {
      const trimmed = (value || '').trim();
      if (trimmed.length === 0) {
        message = 'Email Address is required.';
      } else if (!EMAIL_REGEX.test(trimmed)) {
        message = 'Please enter a valid email address (e.g., name@example.com).';
      } else {
        isValid = true;
      }
      break;
    }

    case 'password': {
      const pwd = value || '';
      if (pwd.length === 0) {
        message = 'Password is required.';
      } else if (pwd.length < 8) {
        message = 'Password must be at least 8 characters long.';
      } else if (!PASSWORD_UPPERCASE_REGEX.test(pwd)) {
        message = 'Password must include at least one uppercase letter (A-Z).';
      } else if (!PASSWORD_LOWERCASE_REGEX.test(pwd)) {
        message = 'Password must include at least one lowercase letter (a-z).';
      } else if (!PASSWORD_NUMBER_REGEX.test(pwd)) {
        message = 'Password must include at least one number (0-9).';
      } else if (!PASSWORD_SPECIAL_REGEX.test(pwd)) {
        message = 'Password must include at least one special character (@, #, $, etc.).';
      } else {
        isValid = true;
      }
      break;
    }

    case 'confirmPassword': {
      if (!value || value.length === 0) {
        message = 'Please confirm your password.';
      } else if (value !== compareValue) {
        message = 'Passwords do not match.';
      } else {
        isValid = true;
      }
      break;
    }

    default:
      break;
  }

  self.postMessage({ id, type, isValid, message });
};
