// state: current theme
let currentTheme = 'light';

// state: current featured project index
let currentProjectIndex = 0;

// data: featured projects list
const projects = [
  {
    title: 'CASA TERRA / 2026',
    description: 'An earthen architectural sanctuary sculpted into natural terrain, harmonizing raw board-formed concrete volumes with excavated rock formations to create enduring spatial intimacy.',
    image: 'images/casa-terra.webp',
    alt: 'Casa Terra subterranean architectural concrete structure embedded in natural earth',
    width: '1100',
    height: '520'
  },
  {
    title: 'HAVEN RESIDENCE / 2025',
    description: 'A serene private residence balancing refined oak finishes with contemplative interior light to create restorative everyday warmth.',
    image: 'images/residential.webp',
    alt: 'Minimalist living room with natural oak wall paneling and neutral furnishings',
    width: '800',
    height: '500'
  },
  {
    title: 'ATLAS PAVILION / 2024',
    description: 'A monolithic civic pavilion sculpted from raw board-formed concrete, creating monumental public gathering spaces shaped by quiet geometry.',
    image: 'images/cultural.webp',
    alt: 'Monolithic cultural gallery with serene concrete walls and minimal timber doorway',
    width: '800',
    height: '500'
  },
  {
    title: 'NEXUS WORKPLACE / 2024',
    description: 'An adaptive urban workspace crafted with natural timber framing and generous daylighting, shaping flexible environments for collective innovation.',
    image: 'images/workplace.webp',
    alt: 'Open-plan architectural studio workplace with collaborative wooden desks',
    width: '800',
    height: '500'
  }
];

// feature 1: dark mode toggle
// input: click toggle button
// process: toggle dark-mode class and save to localStorage
// output: update aria attributes and body class
function applyTheme(theme, button) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    if (button) {
      button.setAttribute('aria-pressed', 'true');
      button.setAttribute('aria-label', 'Switch to light mode');
    }
  } else {
    document.body.classList.remove('dark-mode');
    if (button) {
      button.setAttribute('aria-pressed', 'false');
      button.setAttribute('aria-label', 'Switch to dark mode');
    }
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem('nova-theme', theme);
  } catch (error) {
    // storage not available
  }
}

function toggleTheme(button) {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  applyTheme(currentTheme, button);
  saveTheme(currentTheme);
}

// feature 2: hamburger menu
// input: click menu button, click links, press escape, or click outside
// process: toggle is-open state
// output: update class and aria-expanded
function openMenu(button, panel) {
  if (!button || !panel) return;
  button.classList.add('is-open');
  panel.classList.add('is-open');
  button.setAttribute('aria-expanded', 'true');
  button.setAttribute('aria-label', 'Close menu');
}

function closeMenu(button, panel) {
  if (!button || !panel) return;
  button.classList.remove('is-open');
  panel.classList.remove('is-open');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-label', 'Open menu');
}

function toggleMenu(button, panel) {
  if (!button || !panel) return;
  const isOpen = panel.classList.contains('is-open');
  if (isOpen) {
    closeMenu(button, panel);
  } else {
    openMenu(button, panel);
  }
}

// feature 3: featured project switcher
// input: click pager button
// process: get project by index and update active state
// output: update title, description, image and active button
function setActiveButton(buttons, activeIndex) {
  if (!buttons) return;
  buttons.forEach((btn, index) => {
    if (index === activeIndex) {
      btn.classList.add('is-active');
      btn.setAttribute('aria-current', 'true');
    } else {
      btn.classList.remove('is-active');
      btn.removeAttribute('aria-current');
    }
  });
}

function showProject(index, titleEl, descEl, imageEl, mediaEl, contentEl, buttons) {
  if (index < 0 || index >= projects.length) return;
  currentProjectIndex = index;
  const project = projects[index];

  if (titleEl) {
    titleEl.textContent = project.title;
  }
  if (descEl) {
    descEl.textContent = project.description;
  }
  if (imageEl) {
    imageEl.setAttribute('src', project.image);
    imageEl.setAttribute('alt', project.alt);
    imageEl.setAttribute('width', project.width);
    imageEl.setAttribute('height', project.height);
  }

  if (mediaEl) {
    mediaEl.classList.remove('is-fading');
    void mediaEl.offsetWidth;
    mediaEl.classList.add('is-fading');
  }
  if (contentEl) {
    contentEl.classList.remove('is-fading');
    void contentEl.offsetWidth;
    contentEl.classList.add('is-fading');
  }

  setActiveButton(buttons, currentProjectIndex);
}

// feature 4: contact form feedback
// input: submit form or type in fields
// process: validate required fields and email format
// output: show error or success message and mark invalid fields
function showMessage(messageEl, text, type) {
  if (!messageEl) return;
  messageEl.textContent = text;
  if (type === 'error') {
    messageEl.classList.remove('is-success');
    messageEl.classList.add('is-error');
  } else if (type === 'success') {
    messageEl.classList.remove('is-error');
    messageEl.classList.add('is-success');
  } else {
    messageEl.classList.remove('is-error');
    messageEl.classList.remove('is-success');
  }
}

function validateForm(event, form, nameInput, emailInput, messageInput, messageEl) {
  if (event) {
    event.preventDefault();
  }
  if (!form || !nameInput || !emailInput || !messageInput) return;

  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const messageVal = messageInput.value.trim();

  let hasEmpty = false;

  if (!nameVal) {
    nameInput.classList.add('is-invalid');
    nameInput.setAttribute('aria-invalid', 'true');
    hasEmpty = true;
  }
  if (!emailVal) {
    emailInput.classList.add('is-invalid');
    emailInput.setAttribute('aria-invalid', 'true');
    hasEmpty = true;
  }
  if (!messageVal) {
    messageInput.classList.add('is-invalid');
    messageInput.setAttribute('aria-invalid', 'true');
    hasEmpty = true;
  }

  if (hasEmpty) {
    showMessage(messageEl, 'Please fill in your name, email and message.', 'error');
    return;
  }

  if (!emailVal.includes('@')) {
    emailInput.classList.add('is-invalid');
    emailInput.setAttribute('aria-invalid', 'true');
    showMessage(messageEl, 'Please enter a valid email address.', 'error');
    return;
  }

  showMessage(messageEl, 'Thank you, ' + nameVal + '. We will get back to you soon.', 'success');
  form.reset();
  nameInput.classList.remove('is-invalid');
  nameInput.removeAttribute('aria-invalid');
  emailInput.classList.remove('is-invalid');
  emailInput.removeAttribute('aria-invalid');
  messageInput.classList.remove('is-invalid');
  messageInput.removeAttribute('aria-invalid');
}

// ==========================================================================
// Project 4: Secure Form Design & Validation Module
// ==========================================================================
// Phase 3 Validation Rules & Regular Expressions
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_UPPERCASE_REGEX = /[A-Z]/;
const PASSWORD_LOWERCASE_REGEX = /[a-z]/;
const PASSWORD_NUMBER_REGEX = /[0-9]/;
const PASSWORD_SPECIAL_REGEX = /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/;

// helper: set input visual state and error text
// input: element, error container, message string, validity boolean
// process: update classes and accessibility attributes
// output: rendered error message or valid check
function setFieldFeedback(inputEl, errorEl, message, isValid) {
  if (!inputEl || !errorEl) return;
  if (isValid) {
    inputEl.classList.remove('is-invalid');
    inputEl.classList.add('is-valid');
    inputEl.setAttribute('aria-invalid', 'false');
    errorEl.textContent = '';
    errorEl.classList.remove('is-visible');
  } else {
    inputEl.classList.remove('is-valid');
    inputEl.classList.add('is-invalid');
    inputEl.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
    errorEl.classList.add('is-visible');
  }
}

// validator: full name (minimum 3 characters)
function validateRegName(nameInput, errorEl) {
  if (!nameInput) return false;
  const value = nameInput.value.trim();
  if (value.length === 0) {
    setFieldFeedback(nameInput, errorEl, 'Full Name is required.', false);
    return false;
  }
  if (value.length < 3) {
    setFieldFeedback(nameInput, errorEl, 'Full Name must be at least 3 characters long.', false);
    return false;
  }
  setFieldFeedback(nameInput, errorEl, '', true);
  return true;
}

// validator: email address (valid email regex syntax)
function validateRegEmail(emailInput, errorEl) {
  if (!emailInput) return false;
  const value = emailInput.value.trim();
  if (value.length === 0) {
    setFieldFeedback(emailInput, errorEl, 'Email Address is required.', false);
    return false;
  }
  if (!EMAIL_REGEX.test(value)) {
    setFieldFeedback(emailInput, errorEl, 'Please enter a valid email address (e.g., name@example.com).', false);
    return false;
  }
  setFieldFeedback(emailInput, errorEl, '', true);
  return true;
}

// validator: password (strict policy: 8+ chars, uppercase, lowercase, number, special char)
function validateRegPassword(passwordInput, errorEl) {
  if (!passwordInput) return false;
  const value = passwordInput.value;
  if (value.length === 0) {
    setFieldFeedback(passwordInput, errorEl, 'Password is required.', false);
    return false;
  }
  if (value.length < 8) {
    setFieldFeedback(passwordInput, errorEl, 'Password must be at least 8 characters long.', false);
    return false;
  }
  if (!PASSWORD_UPPERCASE_REGEX.test(value)) {
    setFieldFeedback(passwordInput, errorEl, 'Password must include at least one uppercase letter (A-Z).', false);
    return false;
  }
  if (!PASSWORD_LOWERCASE_REGEX.test(value)) {
    setFieldFeedback(passwordInput, errorEl, 'Password must include at least one lowercase letter (a-z).', false);
    return false;
  }
  if (!PASSWORD_NUMBER_REGEX.test(value)) {
    setFieldFeedback(passwordInput, errorEl, 'Password must include at least one number (0-9).', false);
    return false;
  }
  if (!PASSWORD_SPECIAL_REGEX.test(value)) {
    setFieldFeedback(passwordInput, errorEl, 'Password must include at least one special character (@, #, $, etc.).', false);
    return false;
  }
  setFieldFeedback(passwordInput, errorEl, '', true);
  return true;
}

// validator: confirm password (must match password field exactly)
function validateRegConfirmPassword(confirmInput, passwordInput, errorEl) {
  if (!confirmInput || !passwordInput) return false;
  const confirmVal = confirmInput.value;
  const passwordVal = passwordInput.value;

  if (confirmVal.length === 0) {
    setFieldFeedback(confirmInput, errorEl, 'Please confirm your password.', false);
    return false;
  }
  if (confirmVal !== passwordVal) {
    setFieldFeedback(confirmInput, errorEl, 'Passwords do not match.', false);
    return false;
  }
  setFieldFeedback(confirmInput, errorEl, '', true);
  return true;
}

// helper: password visibility toggle
function togglePasswordVisibility(buttonEl, inputEl) {
  if (!buttonEl || !inputEl) return;
  const isPassword = inputEl.type === 'password';
  inputEl.type = isPassword ? 'text' : 'password';
  buttonEl.textContent = isPassword ? 'Hide' : 'Show';
  buttonEl.setAttribute(
    'aria-label',
    isPassword ? 'Hide password as plain text' : 'Show password as plain text'
  );
}

// ==========================================================================
// Performance Optimization: Cooperative Task Scheduler & Worker Integration
// Breaks down long main-thread tasks using requestIdleCallback & Web Worker
// ==========================================================================

function scheduleTask(taskFn, timeout = 100) {
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(() => taskFn(), { timeout });
  } else {
    setTimeout(taskFn, 0);
  }
}

// Background validation worker instance
let validationWorker = null;

// Task 1: Theme Setup & Restoration
function initTheme() {
  const themeButton = document.querySelector('.js-theme-toggle');
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('nova-theme');
  } catch (error) {
    // storage not available
  }
  if (savedTheme === 'dark') {
    currentTheme = 'dark';
  } else {
    currentTheme = 'light';
  }
  applyTheme(currentTheme, themeButton);
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      toggleTheme(themeButton);
    });
  }
}

// Task 2: Responsive Navigation & Hamburger Drawer
function initNavigation() {
  const menuButton = document.querySelector('.js-menu-button');
  const navPanel = document.querySelector('.js-nav');
  const navLinks = document.querySelectorAll('.js-nav-link');

  if (menuButton && navPanel) {
    menuButton.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMenu(menuButton, navPanel);
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu(menuButton, navPanel);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navPanel.classList.contains('is-open')) {
        closeMenu(menuButton, navPanel);
        menuButton.focus();
      }
    });

    document.addEventListener('click', (event) => {
      if (navPanel.classList.contains('is-open')) {
        const isInside = navPanel.contains(event.target) || menuButton.contains(event.target);
        if (!isInside) {
          closeMenu(menuButton, navPanel);
        }
      }
    });

    const desktopMedia = window.matchMedia('(min-width: 768px)');
    desktopMedia.addEventListener('change', (event) => {
      if (event.matches) {
        closeMenu(menuButton, navPanel);
      }
    });
  }
}

// Task 3: Featured Project Carousel & Switcher
function initFeaturedProjects() {
  const projectButtons = document.querySelectorAll('.js-featured-button');
  const projectTitle = document.querySelector('.js-featured-title');
  const projectDesc = document.querySelector('.js-featured-description');
  const projectImage = document.querySelector('.js-featured-image');
  const projectMedia = document.querySelector('.js-featured-media');
  const projectContent = document.querySelector('.js-featured-content');

  projectButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      showProject(index, projectTitle, projectDesc, projectImage, projectMedia, projectContent, projectButtons);
    });
  });
}

// Task 4: Contact Form Event Listeners & Validation
function initContactForm() {
  const contactForm = document.querySelector('.js-contact-form');
  const nameInput = document.querySelector('.js-input-name');
  const emailInput = document.querySelector('.js-input-email');
  const messageInput = document.querySelector('.js-input-message');
  const messageEl = document.querySelector('.js-form-message');

  if (contactForm && nameInput && emailInput && messageInput) {
    contactForm.addEventListener('submit', (event) => {
      validateForm(event, contactForm, nameInput, emailInput, messageInput, messageEl);
    });

    const formInputs = [nameInput, emailInput, messageInput];
    formInputs.forEach((input) => {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
      });
    });
  }
}

// Task 5: Secure Registration Form Core Validation (Project 4)
function initSecureRegistrationForm() {
  const secureForm = document.querySelector('.js-secure-form');
  const regNameInput = document.querySelector('.js-reg-name');
  const regEmailInput = document.querySelector('.js-reg-email');
  const regPasswordInput = document.querySelector('.js-reg-password');
  const regConfirmInput = document.querySelector('.js-reg-confirm');

  const errorNameEl = document.querySelector('.js-error-name');
  const errorEmailEl = document.querySelector('.js-error-email');
  const errorPasswordEl = document.querySelector('.js-error-password');
  const errorConfirmEl = document.querySelector('.js-error-confirm');

  const successBannerEl = document.querySelector('.js-success-banner');
  const summaryNameEl = document.querySelector('.js-summary-name');
  const summaryEmailEl = document.querySelector('.js-summary-email');

  const togglePwBtn = document.querySelector('.js-toggle-pw');
  const toggleConfirmPwBtn = document.querySelector('.js-toggle-confirm-pw');

  if (togglePwBtn && regPasswordInput) {
    togglePwBtn.addEventListener('click', () => {
      togglePasswordVisibility(togglePwBtn, regPasswordInput);
    });
  }

  if (toggleConfirmPwBtn && regConfirmInput) {
    toggleConfirmPwBtn.addEventListener('click', () => {
      togglePasswordVisibility(toggleConfirmPwBtn, regConfirmInput);
    });
  }

  if (secureForm && regNameInput && regEmailInput && regPasswordInput && regConfirmInput) {
    // Real-time validation with Worker delegation & synchronous fallback
    regNameInput.addEventListener('input', () => {
      if (validationWorker) {
        validationWorker.postMessage({ id: 'reg-name-error', type: 'name', value: regNameInput.value });
      } else {
        validateRegName(regNameInput, errorNameEl);
      }
    });
    regNameInput.addEventListener('blur', () => {
      validateRegName(regNameInput, errorNameEl);
    });

    regEmailInput.addEventListener('input', () => {
      if (validationWorker) {
        validationWorker.postMessage({ id: 'reg-email-error', type: 'email', value: regEmailInput.value });
      } else {
        validateRegEmail(regEmailInput, errorEmailEl);
      }
    });
    regEmailInput.addEventListener('blur', () => {
      validateRegEmail(regEmailInput, errorEmailEl);
    });

    regPasswordInput.addEventListener('input', () => {
      if (validationWorker) {
        validationWorker.postMessage({ id: 'reg-password-error', type: 'password', value: regPasswordInput.value });
      } else {
        validateRegPassword(regPasswordInput, errorPasswordEl);
      }
      if (regConfirmInput.value.length > 0) {
        validateRegConfirmPassword(regConfirmInput, regPasswordInput, errorConfirmEl);
      }
    });
    regPasswordInput.addEventListener('blur', () => {
      validateRegPassword(regPasswordInput, errorPasswordEl);
    });

    regConfirmInput.addEventListener('input', () => {
      if (validationWorker) {
        validationWorker.postMessage({
          id: 'reg-confirm-error',
          type: 'confirmPassword',
          value: regConfirmInput.value,
          compareValue: regPasswordInput.value
        });
      } else {
        validateRegConfirmPassword(regConfirmInput, regPasswordInput, errorConfirmEl);
      }
    });
    regConfirmInput.addEventListener('blur', () => {
      validateRegConfirmPassword(regConfirmInput, regPasswordInput, errorConfirmEl);
    });

    // Form submission handling
    secureForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const isNameValid = validateRegName(regNameInput, errorNameEl);
      const isEmailValid = validateRegEmail(regEmailInput, errorEmailEl);
      const isPasswordValid = validateRegPassword(regPasswordInput, errorPasswordEl);
      const isConfirmValid = validateRegConfirmPassword(regConfirmInput, regPasswordInput, errorConfirmEl);

      const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmValid;

      if (!isFormValid) {
        if (!isNameValid) {
          regNameInput.focus();
        } else if (!isEmailValid) {
          regEmailInput.focus();
        } else if (!isPasswordValid) {
          regPasswordInput.focus();
        } else if (!isConfirmValid) {
          regConfirmInput.focus();
        }
        return;
      }

      // Success state and summary rendering
      if (successBannerEl && summaryNameEl && summaryEmailEl) {
        summaryNameEl.textContent = regNameInput.value.trim();
        summaryEmailEl.textContent = regEmailInput.value.trim();
        successBannerEl.removeAttribute('hidden');
        successBannerEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form
      secureForm.reset();
      const allFields = [regNameInput, regEmailInput, regPasswordInput, regConfirmInput];
      allFields.forEach((field) => {
        field.classList.remove('is-valid');
        field.classList.remove('is-invalid');
        field.removeAttribute('aria-invalid');
      });
    });
  }
}

// Task 6: Web Worker Validation Engine Initialization
function initValidationWorker() {
  try {
    if (window.Worker) {
      validationWorker = new Worker('js/validator.worker.js');
      validationWorker.onmessage = function(event) {
        const { id, isValid, message } = event.data || {};
        const errorEl = document.getElementById(id);
        if (!errorEl) return;
        const inputEl = errorEl.previousElementSibling;
        if (inputEl) {
          setFieldFeedback(inputEl, errorEl, message, isValid);
        }
      };
    }
  } catch (error) {
    // Workers restricted; fallback remains active
    validationWorker = null;
  }
}

// Task 7: Deferred Secondary Enhancements
function initDeferredEnhancements() {
  const successBannerEl = document.querySelector('.js-success-banner');
  const closeBannerBtn = document.querySelector('.js-close-banner');

  if (closeBannerBtn && successBannerEl) {
    closeBannerBtn.addEventListener('click', () => {
      successBannerEl.setAttribute('hidden', '');
    });
  }

  // Pre-cache next project image during idle time
  if (projects && projects[1] && projects[1].image) {
    const preloader = new Image();
    preloader.src = projects[1].image;
  }
}

// Main initialization: Orchestrates 7 segmented tasks without blocking the main thread
function init() {
  // Task 1: Critical UI theme restoration (immediate)
  initTheme();

  // Tasks 2 - 7: Scheduled across idle frames (eliminates long main-thread tasks)
  scheduleTask(initNavigation, 60);
  scheduleTask(initFeaturedProjects, 80);
  scheduleTask(initContactForm, 100);
  scheduleTask(initSecureRegistrationForm, 120);
  scheduleTask(initValidationWorker, 140);
  scheduleTask(initDeferredEnhancements, 160);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

