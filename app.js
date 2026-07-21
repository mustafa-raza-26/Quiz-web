(function () {
    const canvas = document.getElementById('shader-canvas-ANIMATION_3');

    // Sync the WebGL drawing-buffer size with the CSS-driven layout size.
    // This fires on initial layout and whenever the element is resized.
    function syncSize() {
        const w = canvas.clientWidth || 1280;
        const h = canvas.clientHeight || 720;
        if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
        }
    }
    if (typeof ResizeObserver !== 'undefined') {
        new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;
    const vs = `attribute vec2 a_position;
varying vec2 v_texCoord;
void main() {
  v_texCoord = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;
    const fs = `precision highp float;
varying vec2 v_texCoord;
uniform float u_time;
uniform vec2 u_resolution;

void main() {
    vec2 uv = v_texCoord;
    float color = 0.0;
    
    // Create a flowing, ethereal background effect
    vec2 p = uv * 2.0 - 1.0;
    p.x *= u_resolution.x / u_resolution.y;
    
    float t = u_time * 0.3;
    
    for(float i = 1.0; i < 4.0; i++) {
        p.x += 0.3 / i * sin(i * 3.0 * p.y + t + i * 1.5);
        p.y += 0.3 / i * cos(i * 3.0 * p.x + t + i * 1.5);
    }
    
    vec3 color1 = vec3(0.04, 0.08, 0.15); // Deep surface
    vec3 color2 = vec3(0.39, 0.40, 0.95); // Primary Indigo
    vec3 color3 = vec3(0.56, 0.34, 0.91); // Secondary Violet
    
    vec3 finalColor = mix(color1, color2, 0.5 + 0.5 * sin(p.x + p.y + t));
    finalColor = mix(finalColor, color3, 0.3 * cos(p.x * 0.5 - t));
    
    gl_FragColor = vec4(finalColor, 1.0);
}`;
    function cs(type, src) {
        const s = gl.createShader(type);
        gl.shaderSource(s, src);
        gl.compileShader(s);
        return s;
    }
    const prog = gl.createProgram();
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    // u_mouse is in pixel coordinates matching u_resolution (ShaderToy convention).
    // Shaders that need normalized coords should use: u_mouse / u_resolution.
    let mouse = { x: canvas.width / 2, y: canvas.height / 2 };
    window.addEventListener('mousemove', (event) => {
        const rect = canvas.getBoundingClientRect();
        if (rect.width && rect.height) {
            const nx = (event.clientX - rect.left) / rect.width;
            const ny = 1.0 - (event.clientY - rect.top) / rect.height;
            mouse.x = nx * canvas.width;
            mouse.y = ny * canvas.height;
        }
    });

    function render(t) {
        if (typeof ResizeObserver === 'undefined') syncSize();
        gl.viewport(0, 0, canvas.width, canvas.height);
        if (uTime) gl.uniform1f(uTime, t * 0.001);
        if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
        if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(render);
    }
    render(0);
})();
// Mobile/tablet hamburger menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Simple smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive reveal on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card').forEach(card => {
    card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
    observer.observe(card);
});

let logoutBtn = document.getElementById('logoutBtn');
let logoutBtnMobile = document.getElementById('logoutBtnMobile');

window.onload = async () => {
    const { data, error } = await client.auth.getSession();

    if (error) {
        console.log(error.message);
        return;
    }else{
        console.log(data);
        
    }
    
    var userDate = data.session
    console.log(userDate);
    

    if (data.session === null) {
        window.location.href = "/index.html";
    }else{
        logoutBtn.innerHTML = `<i class="fas fa-sign-out-alt text-xl"></i>`
    }

    let profileName = document.getElementById('userName');
    if (profileName && userDate) {
        profileName.innerHTML = `${userDate.user.user_metadata.full_name}`
    }
    let profileNameMobile = document.getElementById('userNameMobile');
    if (profileNameMobile && userDate) {
        profileNameMobile.innerHTML = `${userDate.user.user_metadata.full_name}`
    }
};

async function doLogout() {
    const isConfirmed = confirm("Are you sure you want to log out?");
    if (!isConfirmed) return;

    const { error } = await client.auth.signOut({ scope: 'local' })
    if (error) {
        alert(`Error: ${error.message}`)
        return;
    }else{
        window.location.href = '/index.html'
    }
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', doLogout);
}

if (logoutBtnMobile) {
    logoutBtnMobile.addEventListener('click', doLogout);
}