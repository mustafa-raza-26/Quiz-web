// settings.js - Settings page behavior & Supabase Auth integration

const SETTINGS_KEY = 'quizflow_settings';
const DEFAULT_SETTINGS = { sound: true, difficulty: 'medium' };

// Local storage helper functions
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

// ---------- Mobile navigation menu toggle ----------
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// ---------- Mobile sidebar toggle ----------
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarNav = document.querySelector('.sidebar-nav');

if (sidebarToggle && sidebarNav) {
    sidebarToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebarNav.classList.toggle('mobile-open');
        document.querySelector('.page')?.classList.toggle('sidebar-open');
    });

    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!sidebarNav.contains(target) && target !== sidebarToggle && sidebarNav.classList.contains('mobile-open')) {
            sidebarNav.classList.remove('mobile-open');
            document.querySelector('.page')?.classList.remove('sidebar-open');
        }
    });
}

// ---------- Preferences: sound toggle ----------
const soundToggle = document.getElementById('soundToggle');
function renderSound(settings) {
    if (!soundToggle) return;
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
        if (clearModal) {
            clearModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    });
}

if (cancelClearBtn) {
    cancelClearBtn.addEventListener('click', () => {
        if (clearModal) {
            clearModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

if (confirmClearBtn) {
    confirmClearBtn.addEventListener('click', () => {
        localStorage.removeItem('quizflow_leaderboard');
        if (clearModal) {
            clearModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// ---------- Profile: apply name to header/DOM ----------
function applyName(name) {
    const ids = ['userName', 'userNameMobile', 'settingsUserName'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = name;
    });

    const avatarInitial = document.getElementById('avatarInitial');
    if (avatarInitial && name) {
        avatarInitial.textContent = name.charAt(0).toUpperCase();
    }
}

// ---------- Profile: save name ----------
const saveProfileBtn = document.getElementById('saveProfileBtn');
const profileSavedMsg = document.getElementById('profileSavedMsg');
const nameInput = document.getElementById('nameInput');

if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', async () => {
        const newName = nameInput ? nameInput.value.trim() : '';
        if (!newName) return;

        if (typeof client !== 'undefined' && client.auth) {
            const { error } = await client.auth.updateUser({
                data: { full_name: newName }
            });

            if (error) {
                alert(`Error: ${error.message}`);
                return;
            }
        }

        applyName(newName);
        if (profileSavedMsg) {
            profileSavedMsg.classList.remove('hidden');
            setTimeout(() => profileSavedMsg.classList.add('hidden'), 2000);
        }
    });
}

// ---------- Session, profile display & logout ----------
const logoutBtn = document.getElementById('logoutBtn');
const logoutBtnMobile = document.getElementById('logoutBtnMobile');
const logoutBtnSettings = document.getElementById('logoutBtnSettings');

async function doLogout() {
    const isConfirmed = confirm("Are you sure you want to log out?");
    if (!isConfirmed) return;

    if (typeof client !== 'undefined' && client.auth) {
        const { error } = await client.auth.signOut({ scope: 'local' });
        if (error) {
            alert(`Error: ${error.message}`);
            return;
        }
    }
    window.location.href = '/index.html';
}

if (logoutBtn) logoutBtn.addEventListener('click', doLogout);
if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', doLogout);
if (logoutBtnSettings) logoutBtnSettings.addEventListener('click', doLogout);
let accountDetail = document.getElementById('accountDetails');
let id

window.onload = async () => {
    if (typeof client === 'undefined' || !client.auth) return;

    const { data, error } = await client.auth.getSession();

    if (error) {
        console.log(error.message);
        return;
    }

    const userData = data.session;
    id = userData.user.id;
    let fullName = userData.user.user_metadata.full_name || 'Alex Rivera';
    let email = userData.user.email || '';


    if (userData === null) {
        window.location.href = "/index.html";
    } else {
        if (accountDetail) {
            accountDetail.innerHTML = `
                <h3>${fullName}</h3>
                <h5>${email}</h5>
            `
        }
    }
    applyName(fullName);
};

let deleteAccount = document.getElementById('deleteAccount');
if (deleteAccount) {
    deleteAccount.addEventListener('click', async () => {
        const isConfirmed = confirm("Are you sure you want to deactivate/delete your account? This action cannot be undone.");
        if (!isConfirmed) return;
    });
}