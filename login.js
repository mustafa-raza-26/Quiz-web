// Micro-interactions
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.parentElement.querySelector('label').classList.add('text-primary');
    });
    input.addEventListener('blur', () => {
        input.parentElement.parentElement.querySelector('label').classList.remove('text-primary');
    });
});

// Form submission ripple simulation
const btn = document.querySelector('.gradient-btn');
btn.addEventListener('mousedown', function (e) {
    this.style.transform = 'scale(0.98) translateY(0px)';
});
btn.addEventListener('mouseup', function (e) {
    this.style.transform = 'translateY(-2px)';
});
btn.addEventListener('mouseleave', function (e) {
    this.style.transform = 'translateY(0px)';
});

