// signup.js - Sign-up form behavior for signup.html
import { Storage } from './storage.js';

// Micro-interaction: highlight the label while its input is focused
document.querySelectorAll('input').forEach(input => {
  input.addEventListener('focus', () => {
    const label = input.closest('.space-y-2')?.querySelector('label');
    if (label) label.classList.add('text-primary', 'font-bold');
  });
  input.addEventListener('blur', () => {
    const label = input.closest('.space-y-2')?.querySelector('label');
    if (label) label.classList.remove('text-primary', 'font-bold');
  });
});

// Subtle parallax on the card
document.addEventListener('mousemove', (e) => {
  const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
  const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
  document.querySelectorAll('.glass-panel').forEach(card => {
    card.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});

// Form handling
const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name-input');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const confirmInput = document.getElementById('confirm-input');
const tosCheckbox = document.getElementById('tos');
const formError = document.getElementById('form-error');
const submitLabel = document.getElementById('submit-label');

function showError(message) {
  formError.textContent = message;
  formError.classList.remove('hidden');
}

function clearError() {
  formError.textContent = '';
  formError.classList.add('hidden');
}

function clearFieldErrors() {
  [nameInput, emailInput, passwordInput, confirmInput].forEach(el => el.classList.remove('input-error'));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  clearError();
  clearFieldErrors();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  if (!name) {
    nameInput.classList.add('input-error');
    showError('Please enter your full name.');
    nameInput.focus();
    return;
  }
  if (!email || !emailInput.checkValidity()) {
    emailInput.classList.add('input-error');
    showError('Please enter a valid email address.');
    emailInput.focus();
    return;
  }
  if (password.length < 6) {
    passwordInput.classList.add('input-error');
    showError('Password must be at least 6 characters.');
    passwordInput.focus();
    return;
  }
  if (password !== confirm) {
    passwordInput.classList.add('input-error');
    confirmInput.classList.add('input-error');
    showError('Passwords do not match.');
    confirmInput.focus();
    return;
  }
  if (!tosCheckbox.checked) {
    showError('Please agree to the Terms of Service and Privacy Policy.');
    return;
  }

  // No backend here — store the account locally so the rest of the app
  // (profile display, leaderboard "You" entries, etc.) has something to read.
  Storage.saveUser({ name, email });

  submitLabel.textContent = 'Account created!';
  setTimeout(() => {
    window.location.href = 'categories.html';
  }, 600);
});

// Social buttons aren't backed by real OAuth in this local build — surface
// that clearly instead of doing nothing when clicked.
const socialNote = document.getElementById('social-note');
['google-btn', 'github-btn'].forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    socialNote.classList.remove('hidden');
  });
});


if (submitLabel) {
  submitLabel.addEventListener('click', async () => {

    const { error } = await client
    .from('quiz-user')
    .insert({
      fullName: nameInput.value,
      emailInput: nameInput.value,
      passwordInput: nameInput.value,
    })

    if (error) {
      console.log(error.message);
    }
    
  })
}