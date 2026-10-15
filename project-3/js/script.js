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

// initialization
function init() {
  // 1. theme setup
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

  // 2. hamburger menu setup
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

  // 3. featured project switcher setup
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

  // 4. contact form setup
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

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
