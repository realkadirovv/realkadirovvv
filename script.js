document.addEventListener('DOMContentLoaded', () => {
    // Reveal On Scroll logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Animate hamburger icon (optional flair)
            mobileMenuBtn.classList.toggle('is-active'); 
        });
    }

    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('is-active');
        });
    });

    // Mouse Follower & 3D Portrait Tilt (Only active on non-touch devices)
    const glow = document.querySelector('.cursor-glow');
    const portrait = document.querySelector('.portrait-container');

    // Simple touch detection
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        window.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            
            window.requestAnimationFrame(() => {
                // Move Cursor Glow
                if (glow) {
                    glow.style.left = `${clientX}px`;
                    glow.style.top = `${clientY}px`;
                }
                
                // 3D Tilt for Hero Portrait
                if (portrait) {
                    const xRotation = (clientY - window.innerHeight / 2) / 100;
                    const yRotation = (clientX - window.innerWidth / 2) / 100;
                    portrait.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
                }
            });
        });
    }
});