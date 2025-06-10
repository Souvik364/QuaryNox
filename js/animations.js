/**
 * QUARYNOX - Animations JavaScript File
 * This file contains animation functionality for the QUARYNOX educational platform
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll reveal animations
    initScrollReveal();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize counter animations
    initCounters();
    
    // Initialize typing effect
    initTypingEffect();
    
    // Initialize hover animations
    initHoverAnimations();
    
    // Initialize preloader
    initPreloader();
});

/**
 * Initialize Scroll Reveal Animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Check on initial load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
}

/**
 * Initialize Parallax Effects
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(window.scrollY * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
    
    window.addEventListener('scroll', updateParallax);
}

/**
 * Initialize Counter Animations
 */
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    function startCounting() {
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.target);
            const duration = parseInt(counter.dataset.duration) || 2000;
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Start counting when elements are in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (counters.length > 0) {
        observer.observe(document.querySelector('.counters-section'));
    }
}

/**
 * Initialize Typing Effect
 */
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.dataset.text;
        const typingSpeed = parseInt(element.dataset.speed) || 100;
        const delay = parseInt(element.dataset.delay) || 1000;
        
        let charIndex = 0;
        element.textContent = '';
        
        setTimeout(() => {
            const typeInterval = setInterval(() => {
                if (charIndex < text.length) {
                    element.textContent += text.charAt(charIndex);
                    charIndex++;
                } else {
                    clearInterval(typeInterval);
                }
            }, typingSpeed);
        }, delay);
    });
}

/**
 * Initialize Hover Animations
 */
function initHoverAnimations() {
    // Tool cards hover effect
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
    
    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
        });
    });
}

/**
 * Initialize Preloader
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    
    if (preloader) {
        window.addEventListener('load', function() {
            preloader.classList.add('fade-out');
            
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000);
        });
    }
}

/**
 * Add Particle Background Effect
 */
function initParticleBackground() {
    const particleContainer = document.querySelector('.particle-background');
    
    if (!particleContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random size
        const size = Math.random() * 5 + 2;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Apply styles
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.opacity = opacity;
        
        particleContainer.appendChild(particle);
    }
}