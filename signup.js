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
let google_Btn = document.getElementById('google-btn');
let github_Btn = document.getElementById('github-btn');

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

form.addEventListener('submit', async (e) => {
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

  submitLabel.textContent = 'Creating account…';

  // Supabase Auth owns the actual account + password.
  const { error: authError } = await client.auth.signUp({
    email,
    password,
    options: {
      data: { first_name: name }
    }
  });

  if (authError) {
    showError(authError.message);
    submitLabel.textContent = 'Create Account';
    return;
  }

  // Mirror the profile into the app's own table — never the password,
  // Auth already stores that securely and this table doesn't need it.
  const { error: dbError } = await client
    .from('quiz-user')
    .insert({ fullName: name, email });

  if (dbError) {
    console.error(dbError.message);
  }

  // Also keep a local copy: other pages (profile display, leaderboard
  // "You" entries, etc.) read from Storage rather than hitting Supabase.
  Storage.saveUser({ name, email });

  submitLabel.textContent = 'Account created!';
  window.location.href = 'dashboard.html';
});

// Social sign-up — relies on Google/GitHub providers being enabled in the
// Supabase project's Auth settings; if they aren't, Supabase returns an error.
async function socialSignUp(provider) {
  const { error } = await client.auth.signInWithOAuth({ provider });
  if (error) {
    showError(error.message || `${provider} sign-in isn't set up yet.`);
  }
}

if (google_Btn) google_Btn.addEventListener('click', () => socialSignUp('google'));
if (github_Btn) github_Btn.addEventListener('click', () => socialSignUp('github'));