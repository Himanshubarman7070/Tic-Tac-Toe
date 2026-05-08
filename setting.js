// Floating Background Particles
const createParticles = () => {
    const container = document.getElementById('particles');
    for (let i = 0; i < 15; i++) {
        const p = document.createElement('div');
        p.style.position = 'absolute';
        p.style.background = 'rgba(255, 204, 51, 0.2)';
        p.style.borderRadius = '50%';
        const size = Math.random() * 4 + 2;
        p.style.width = p.style.height = `${size}px`;
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${Math.random() * 100}%`;
        
        // Simple float animation
        p.animate([
            { transform: 'translateY(0)', opacity: 0 },
            { transform: 'translateY(-100px)', opacity: 0.3 },
            { transform: 'translateY(-200px)', opacity: 0 }
        ], {
            duration: Math.random() * 5000 + 5000,
            iterations: Infinity
        });
        container.appendChild(p);
    }
};

// Save Settings Logic
const saveBtn = document.getElementById('saveBtn');
const toast = document.getElementById('toast');

saveBtn.addEventListener('click', () => {
    // Play "Stone Shifting" sound logic here
    console.log("Settings Saved to Local Storage");
    
    // Show Toast
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
});

// Click sounds for interactive elements
document.querySelectorAll('button, input, select').forEach(el => {
    el.addEventListener('click', () => {
        // playClickSound();
        console.log("UI Click");
    });
});

createParticles();