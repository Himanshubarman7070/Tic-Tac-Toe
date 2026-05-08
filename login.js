// Generate background floating particles
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 15; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 4 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    p.style.animationDuration = `${Math.random() * 10 + 10}s`;
    particlesContainer.appendChild(p);
}

// Password Visibility Toggle
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', () => {
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    togglePassword.textContent = type === 'password' ? '👁️' : '🔒';
});

// Login Validation and Redirect
const loginForm = document.getElementById('loginForm');
const loginBtn = document.getElementById('loginBtn');
const loader = document.getElementById('loader');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 1. UI Feedback - Start Animation
    const btnText = loginBtn.querySelector('span');
    btnText.textContent = "VERIFYING...";
    loader.style.display = "inline-block";
    loginBtn.style.pointerEvents = "none"; // Prevent double-clicking
    
    // 2. Simulate Server/Ritual Validation
    setTimeout(() => {
        const username = document.getElementById('username').value;
        
        if (username.length < 3) {
            alert("Warrior name must be at least 3 characters!");
            btnText.textContent = "LOGIN";
            loader.style.display = "none";
            loginBtn.style.pointerEvents = "all";
        } else {
            // 3. Success State
            btnText.textContent = "ACCESS GRANTED";
            loginBtn.style.background = "linear-gradient(to bottom, #39ff14, #28b80e)";
            loginBtn.style.boxShadow = "0 0 20px rgba(57, 255, 20, 0.5)";
            loader.style.display = "none";

            // 4. Redirect to index.html after a short "success" delay
            setTimeout(() => {
                window.location.href = 'index.html'; 
            }, 800);
        }
    }, 1500);
});

// Guest Play Redirect
document.querySelector('.btn-guest').addEventListener('click', () => {
    window.location.href = 'index.html';
});