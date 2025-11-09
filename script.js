// Add these new functions to your existing script.js

function initVideoGallery() {
    const videoGrid = document.querySelector('.video-grid');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const thumbnailItems = document.querySelectorAll('.video-thumbnail-item');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.querySelector('.close-modal');

    // Video data for additional content
    const videoData = [
        {
            id: 1,
            title: "10 Windows Shortcuts You Need to Know",
            description: "Boost your productivity with these essential Windows keyboard shortcuts that will save you time every day.",
            thumbnail: "Windows Tips",
            duration: "8:15"
        },
        {
            id: 2,
            title: "Smartphone Battery Saving Tips",
            description: "Extend your phone's battery life with these simple settings adjustments and usage habits.",
            thumbnail: "Battery Life",
            duration: "12:30"
        },
        {
            id: 3,
            title: "Secure Your Online Accounts",
            description: "Learn how to protect your digital identity with strong security practices and tools.",
            thumbnail: "Security",
            duration: "15:45"
        },
        {
            id: 4,
            title: "Hidden Google Search Features",
            description: "Discover powerful Google search tricks that most people don't know about.",
            thumbnail: "Google Tricks",
            duration: "10:20"
        }
    ];

    let displayedVideos = 2;
    let animationDelay = 0;

    // Initialize thumbnail click events
    thumbnailItems.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            openVideoModal(videoId);
        });
    });

    // Modal functionality
    function openVideoModal(videoId) {
        const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        modalVideo.src = videoUrl;
        videoModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    function closeVideoModal() {
        videoModal.classList.remove('show');
        modalVideo.src = '';
        document.body.style.overflow = 'auto';
    }

    // Close modal events
    closeModal.addEventListener('click', closeVideoModal);
    
    videoModal.addEventListener('click', function(e) {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('show')) {
            closeVideoModal();
        }
    });

    // Function to create additional video cards
    function createVideoCard(video, index) {
        const card = document.createElement('div');
        card.className = 'video-card';
        card.style.animationDelay = `${animationDelay}s`;
        animationDelay += 0.1;
        
        card.innerHTML = `
            <div class="video-thumbnail">
                ${video.thumbnail}
                <div class="video-duration">${video.duration}</div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.description}</p>
            </div>
        `;
        
        card.addEventListener('click', function() {
            // For demo purposes, show an alert
            // In production, you might want to link to YouTube or use modal
            alert(`Playing: ${video.title}\n\nThis would play the video in a real implementation.`);
        });
        
        return card;
    }

    // Function to display additional videos
    function displayVideos() {
        // Clear existing videos
        videoGrid.innerHTML = '';
        animationDelay = 0;
        
        // Display videos up to the current limit
        for (let i = 0; i < Math.min(displayedVideos, videoData.length); i++) {
            const videoCard = createVideoCard(videoData[i], i);
            videoGrid.appendChild(videoCard);
        }
        
        // Hide load more button if all videos are displayed
        if (displayedVideos >= videoData.length) {
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        } else {
            if (loadMoreBtn) {
                loadMoreBtn.style.display = 'inline-block';
            }
        }
    }

    // Load more videos function
    function loadMoreVideos() {
        displayedVideos += 2;
        displayVideos();
        
        // Smooth scroll to new videos
        setTimeout(() => {
            videoGrid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    }

    // Initialize the video gallery
    if (videoGrid) {
        displayVideos();
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreVideos);
    }
}

// Update the initWebsite function to include the new video gallery
function initWebsite() {
    // Handle logo animation
    handleLogoAnimation();
    
    // Initialize video gallery (now with YouTube integration)
    initVideoGallery();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize scroll animations
    initScrollAnimations();
}

// Rest of your existing functions (handleLogoAnimation, initContactForm, etc.) remain the same
// ... [Keep all your existing functions from the previous implementation]
