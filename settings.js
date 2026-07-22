// settings.js - Settings page behavior.
// Plain (non-module) script, like categories.js/app.js, so it keeps working
// even if this file is opened directly from disk. Reads/writes the same
// localStorage keys storage.js uses, without needing an ES import.

const SETTINGS_KEY = 'quizflow_settings';
const DEFAULT_SETTINGS = { sound: true, difficulty: 'medium' };

function getSettings() {
    try {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
    } catch {
        return { ...DEFAULT_SETTINGS };
    }
}

function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

// ---------- Mobile/tablet hamburger menu ----------
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ---------- Preferences: sound toggle ----------
const soundToggle = document.getElementById('soundToggle');
function renderSound(settings) {
    if (settings.sound) {
        soundToggle.classList.add('on');
        soundToggle.setAttribute('aria-pressed', 'true');
    } else {
        soundToggle.classList.remove('on');
        soundToggle.setAttribute('aria-pressed', 'false');
    }
}
if (soundToggle) {
    soundToggle.addEventListener('click', () => {
        const settings = getSettings();
        settings.sound = !settings.sound;
        saveSettings(settings);
        renderSound(settings);
    });
}

// ---------- Preferences: default difficulty ----------
const difficultyPills = document.querySelectorAll('.difficulty-pill');
function renderDifficulty(settings) {
    difficultyPills.forEach(pill => {
        pill.classList.toggle('active', pill.dataset.difficulty === settings.difficulty);
    });
}
difficultyPills.forEach(pill => {
    pill.addEventListener('click', () => {
        const settings = getSettings();
        settings.difficulty = pill.dataset.difficulty;
        saveSettings(settings);
        renderDifficulty(settings);
    });
});

// Apply saved preferences on load
(function initPreferences() {
    const settings = getSettings();
    renderSound(settings);
    renderDifficulty(settings);
})();

// ---------- Clear quiz history ----------
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const clearModal = document.getElementById('clear-modal');
const cancelClearBtn = document.getElementById('cancel-clear');
const confirmClearBtn = document.getElementById('confirm-clear');

if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener('click', () => {
        clearModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
}
if (cancelClearBtn) {
    cancelClearBtn.addEventListener('click', () => {
        clearModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
}
if (confirmClearBtn) {
    confirmClearBtn.addEventListener('click', () => {
        localStorage.removeItem('quizflow_leaderboard');
        clearModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
}

// ---------- Profile: save name ----------
const saveProfileBtn = document.getElementById('saveProfileBtn');
const profileSavedMsg = document.getElementById('profileSavedMsg');
const nameInput = document.getElementById('nameInput');

if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', async () => {
        const newName = nameInput.value.trim();
        if (!newName) return;

        const { error } = await client.auth.updateUser({
            data: { full_name: newName }
        });

        if (error) {
            alert(`Error: ${error.message}`);
            return;
        }

        applyName(newName);
        profileSavedMsg.classList.remove('hidden');
        setTimeout(() => profileSavedMsg.classList.add('hidden'), 2000);
    });
}

function applyName(name) {
    const ids = ['userName', 'userNameMobile', 'settingsUserName'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = name;
    });
    const avatarInitial = document.getElementById('avatarInitial');
    if (avatarInitial && name) avatarInitial.textContent = name.charAt(0).toUpperCase();
}

// ---------- Session, profile display, logout ----------
let logoutBtn = document.getElementById('logoutBtn');
let logoutBtnMobile = document.getElementById('logoutBtnMobile');
let logoutBtnSettings = document.getElementById('logoutBtnSettings');

window.onload = async () => {
    const { data, error } = await client.auth.getSession();

    if (error) {
        console.log(error.message);
        return;
    }

    const userDate = data.session;

    if (userDate === null) {
        window.location.href = "/index.html";
        return;
    }

    const fullName = userDate.user.user_metadata.full_name || '';
    const email = userDate.user.email || '';

    applyName(fullName);

    const settingsUserEmail = document.getElementById('settingsUserEmail');
    if (settingsUserEmail) settingsUserEmail.textContent = email;

    if (nameInput) nameInput.value = fullName;
    const emailInput = document.getElementById('emailInput');
    if (emailInput) emailInput.value = email;
};

async function doLogout() {
    const isConfirmed = confirm("Are you sure you want to log out?");
    if (!isConfirmed) return;

    const { error } = await client.auth.signOut({ scope: 'local' });
    if (error) {
        alert(`Error: ${error.message}`);
        return;
    } else {
        window.location.href = '/index.html';
    }
}

if (logoutBtn) logoutBtn.addEventListener('click', doLogout);
if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', doLogout);
if (logoutBtnSettings) logoutBtnSettings.addEventListener('click', doLogout);