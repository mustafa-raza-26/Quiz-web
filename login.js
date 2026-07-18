// login.js - Sign-in form behavior for index.html (the login page)

// Micro-interactions: highlight label while its input is focused
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.parentElement.querySelector('label').classList.add('text-primary');
    });
    input.addEventListener('blur', () => {
        input.parentElement.parentElement.querySelector('label').classList.remove('text-primary');
    });
});

// Button press feedback
const btn = document.querySelector('.gradient-btn');
btn.addEventListener('mousedown', function () {
    this.style.transform = 'scale(0.98) translateY(0px)';
});
btn.addEventListener('mouseup', function () {
    this.style.transform = 'translateY(-2px)';
});
btn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0px)';
});

const loginEmail = document.getElementById('email');
const loginPassword = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        if (loginEmail.value.trim() === '' || loginPassword.value === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Missing details',
                text: 'Please enter both your email and password.',
                confirmButtonColor: '#8083ff'
            });
            return;
        }

        const { error } = await client.auth.signInWithPassword({
            email: loginEmail.value.trim(),
            password: loginPassword.value
        });

        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.message || 'Invalid email or password.',
                confirmButtonColor: '#d33'
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome back 🎉',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true
            }).then(() => {
                window.location.href = 'dashboard.html';
            });
        }
    });
}

// Social sign-in — relies on Google/GitHub providers being enabled in the
// Supabase project's Auth settings; if they aren't, Supabase returns an error.
async function socialSignIn(provider) {
    const { error } = await client.auth.signInWithOAuth({ provider });
    if (error) {
        Swal.fire({
            icon: 'error',
            title: 'Sign-in unavailable',
            text: error.message || `${provider} sign-in isn't set up yet.`,
            confirmButtonColor: '#d33'
        });
    }
}

const googleBtn = document.getElementById('google-login-btn');
const githubBtn = document.getElementById('github-login-btn');
if (googleBtn) googleBtn.addEventListener('click', () => socialSignIn('google'));
if (githubBtn) githubBtn.addEventListener('click', () => socialSignIn('github'));

// If already logged in, skip the login screen entirely.
window.onload = async () => {
    const { data, error } = await client.auth.getSession();
    if (error) {
        console.error(error.message);
        return;
    }else{
        console.log(data);
        
    }

    if (data.session) {
        window.location.href = '/dashboard.html';
    }
};
