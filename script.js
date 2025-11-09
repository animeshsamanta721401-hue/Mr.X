// Sample video data
const videoData = [
    {
        title: "10 Windows Shortcuts You Need to Know",
        description: "Learn these essential Windows shortcuts to boost your productivity.",
        thumbnail: "windows-shortcuts",
        views: "45K",
        date: "2 weeks ago"
    },
    {
        title: "How to Speed Up Your Computer",
        description: "Simple tips to make your computer run faster and smoother.",
        thumbnail: "speed-up-computer",
        views: "38K",
        date: "3 weeks ago"
    },
    {
        title: "Android Hidden Features You Didn't Know",
        description: "Discover these hidden Android features that will change how you use your phone.",
        thumbnail: "android-features",
        views: "52K",
        date: "1 month ago"
    },
    {
        title: "iPhone Tips and Tricks 2023",
        description: "Master your iPhone with these amazing tips and tricks.",
        thumbnail: "iphone-tips",
        views: "41K",
        date: "1 month ago"
    },
    {
        title: "How to Protect Your Online Privacy",
        description: "Essential steps to protect your privacy online.",
        thumbnail: "online-privacy",
        views: "67K",
        date: "2 months ago"
    },
    {
        title: "Top 5 Free Software You Should Install",
        description: "These free software programs will enhance your computing experience.",
        thumbnail: "free-software",
        views: "29K",
        date: "2 months ago"
    }
];

// DOM Elements
const videoGrid = document.querySelector('#videos .video-grid');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const contactForm = document.getElementById('contactForm');
const scrollElements = document.querySelectorAll('.scroll-animate');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load initial videos
    loadVideos(0, 3);
    
    // Set up scroll animation
    setupScrollAnimation();
    
    // Set up form submission
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Set up load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', handleLoadMore);
    }
    
    // Set up smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to latest videos section
    animateLatestVideos();
});

// Load videos function
function loadVideos(startIndex, count) {
    const endIndex = Math.min(startIndex + count, videoData.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const video = videoData[i];
        const videoCard = createVideoCard(video, i);
        videoGrid.appendChild(videoCard);
        
        // Add animation delay for staggered effect
        setTimeout(() => {
            videoCard.style.animationDelay = `${i * 0.1}s`;
            videoCard.classList.add('animate');
        }, 100);
    }
    
    // Hide load more button if all videos are loaded
    if (endIndex >= videoData.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Create video card element
function createVideoCard(video, index) {
    const card = document.createElement('div');
    card.className = 'video-card scroll-animate';
    
    card.innerHTML = `
        <div class="video-thumbnail">
            ${video.thumbnail}
        </div>
        <div class="video-info">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <div class="video-meta">
                <span class="views">${video.views} views</span>
                <span class="date">${video.date}</span>
            </div>
        </div>
    `;
    
    return card;
}

// Handle load more button click
function handleLoadMore() {
    const currentVideoCount = document.querySelectorAll('#videos .video-card').length;
    loadVideos(currentVideoCount, 3);
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
    contactForm.reset();
}

// Show notification
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #00b09b, #96c93d)' : 'linear-gradient(135deg, #ff416c, #ff4b2b)'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Scroll animation setup
function setupScrollAnimation() {
    // Add scroll-animate class to elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll('.video-card, .about-content, .disclaimer-content, .contact-content');
    elementsToAnimate.forEach(el => {
        el.classList.add('scroll-animate');
    });
    
    // Check initial position
    checkScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
}

// Check if elements are in viewport for animation
function checkScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    
    scrollElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        
        if (elementTop < triggerBottom) {
            el.classList.add('animate');
        }
    });
}

// Animate latest videos
function animateLatestVideos() {
    const featuredCards = document.querySelectorAll('.featured-card');
    
    featuredCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('scroll-animate');
    });
    
    // Trigger animation for featured cards
    setTimeout(() => {
        featuredCards.forEach(card => {
            card.classList.add('animate');
        });
    }, 500);
}

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add typing effect to hero text (optional)
    const heroText = document.querySelector('.hero-content h2');
    if (heroText) {
        const text = heroText.innerHTML;
        heroText.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 3500);
    }
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});
