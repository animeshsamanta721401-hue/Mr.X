document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initWebsite();
});

function initWebsite() {
    // Create particles for hero section
    createParticles();
    
    // Load YouTube videos
    loadVideos();
    
    // Initialize animations
    initAnimations();
    
    // Initialize event listeners
    initEventListeners();
    
    // Start counter animations
    startCounters();
}

function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: var(--red);
            border-radius: 50%;
            animation: floatParticle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
        `;
        
        // Add custom animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: ${Math.random() * 0.5 + 0.1};
                }
                100% {
                    transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
        
        particlesContainer.appendChild(particle);
    }
}

function loadVideos() {
    const videoGrid = document.getElementById('videoGrid');
    const videos = [
        {
            title: "Amazing Tech Trick You Need to Know",
            description: "Discover this incredible technology hack that will save you hours of work.",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/4bhLudiJKaY?si=y2WuGnvTw-2rbBAU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
        },
        {
            title: "Secret Windows Shortcuts Revealed",
            description: "Learn hidden Windows shortcuts that professionals use every day.",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/hL-w2bjtVOo?si=406MaFJyZn8ITDT_" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
        },
        {
            title: "Ultimate Smartphone Optimization Guide",
            description: "Maximize your smartphone's performance with these simple tweaks.",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/LEicyF8qDm4?si=8Rzn3Xc4-fb34RgU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
        }
    ];

    videos.forEach((video, index) => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.style.animationDelay = `${index * 0.2}s`;
        
        videoCard.innerHTML = `
            <div class="video-iframe">
                ${video.embedCode}
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>
        `;
        
        videoGrid.appendChild(videoCard);
    });
}

function initAnimations() {
    // Remove logo animation after it completes
    setTimeout(() => {
        const logoAnimation = document.querySelector('.logo-animation');
        logoAnimation.classList.add('fade-out');
        
        setTimeout(() => {
            logoAnimation.style.display = 'none';
        }, 800);
    }, 2500);

    // Initialize scroll animations
    initScrollAnimations();
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.about-feature, .video-card, .section-header').forEach(el => {
        observer.observe(el);
    });
}

function initEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('messageForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simulate form submission
            showNotification(`Thank you, ${name}! Your message has been sent.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
}

function startCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        // Start counter when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--red);
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translate(0, 0) rotate(0deg);
        }
        100% {
            transform: translate(var(--tx, 100px), var(--ty, 100px)) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);
