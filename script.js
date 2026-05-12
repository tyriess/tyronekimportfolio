/* ============================================
   VIRTUAL ASSISTANT PORTFOLIO - JAVASCRIPT
   Interactive Features & Smooth Animations
   ============================================ */

// ============ DOM ELEMENTS ============
const loader = document.getElementById('loader');
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const particles = document.getElementById('particles');
const typingText = document.getElementById('typingText');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// ============ INITIALIZATION ============
document.addEventListener('DOMContentLoaded', () => {
    hideLoader();
    generateParticles();
    startTypingAnimation();
    setupEventListeners();
    observeElements();
    animateStats();
});

// ============ LOADING ANIMATION ============
function hideLoader() {
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
}

// ============ PARTICLE GENERATION ============
function generateParticles() {
    const particleCount = window.innerWidth > 768 ? 50 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 5;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        
        particles.appendChild(particle);
    }
}

// ============ TYPING ANIMATION ============
function startTypingAnimation() {
    const texts = [
        'Creative Virtual Assistant',
        'Design & Video Expert',
        'Your Business Partner'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500);
            return;
        }
        
        setTimeout(type, isDeleting ? 50 : 100);
    }
    
    type();
}

// ============ EVENT LISTENERS ============
function setupEventListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                scrollToSection(href.substring(1));
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        updateNavbarOnScroll();
        updateBackToTopButton();
    });
    
    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Contact form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Portfolio filtering
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => filterPortfolio(btn.dataset.filter));
    });
    
    // Back to top button
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============ NAVBAR SCROLL EFFECT ============
function updateNavbarOnScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ============ BACK TO TOP BUTTON ============
function updateBackToTopButton() {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

// ============ SMOOTH SCROLL TO SECTION ============
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// ============ PORTFOLIO FILTERING ============
function filterPortfolio(category) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter portfolio items
    const items = document.querySelectorAll('.portfolio-item');
    items.forEach(item => {
        item.classList.remove('hidden');
        
        if (category !== 'all' && !item.dataset.category.includes(category)) {
            item.classList.add('hidden');
        }
        
        // Add animation
        if (!item.classList.contains('hidden')) {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = 'fadeInUp 0.6s ease forwards';
            }, 10);
        }
    });
}

// ============ STATS COUNTER ANIMATION ============
function animateStats() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.animated) {
                entry.target.animated = true;
                const target = parseInt(entry.target.dataset.target);
                const duration = 2000;
                const start = 0;
                const startTime = Date.now();
                
                function updateCount() {
                    const elapsed = Date.now() - startTime;
                    const progress = elapsed / duration;
                    
                    if (progress < 1) {
                        const current = Math.floor(start + (target - start) * progress);
                        entry.target.textContent = current;
                        requestAnimationFrame(updateCount);
                    } else {
                        entry.target.textContent = target;
                    }
                }
                
                updateCount();
            }
        });
    });
    
    document.querySelectorAll('[data-target]').forEach(el => {
        observer.observe(el);
    });
}

// ============ CONTACT FORM HANDLING ============
// Configure this to your Formspree endpoint or other form handler
const FORM_ENDPOINT = 'https://formspree.io/f/xojrnovv'; // <-- replace with your endpoint

async function handleFormSubmit(e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    if (FORM_ENDPOINT.includes('yourFormID')) {
        alert('Please replace FORM_ENDPOINT in script.js with your Formspree endpoint (or another handler).');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        return;
    }

    try {
        const res = await fetch(FORM_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (res.ok) {
            submitBtn.textContent = '✓ Message Sent!';
            contactForm.reset();
        } else {
            const json = await res.json();
            throw new Error(json.error || 'Submission failed');
        }
    } catch (err) {
        console.error('Form submission error:', err);
        alert('There was a problem sending your message. Please try again later.');
    } finally {
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2500);
    }
}

// ============ SCROLL REVEAL ANIMATION ============
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered animation delay to grid items
                if (entry.target.classList.contains('service-card') ||
                    entry.target.classList.contains('benefit-card') ||
                    entry.target.classList.contains('portfolio-item')) {
                    
                    const parent = entry.target.parentElement;
                    const children = Array.from(parent.children);
                    const index = children.indexOf(entry.target);
                    
                    entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                } else {
                    entry.target.classList.add('scroll-reveal');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.section-header, .service-card, .benefit-card, .portfolio-item').forEach(el => {
        observer.observe(el);
    });
}

// ============ MOBILE MENU CLOSE ON LINK CLICK ============
window.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// Note: demo prevention removed — real handler is `handleFormSubmit` wired in setupEventListeners()

// ============ OPTIMIZE ANIMATIONS FOR MOBILE ============
if (window.innerWidth <= 768) {
    // Reduce particle count on mobile
    while (particles.firstChild) {
        particles.removeChild(particles.firstChild);
    }
    generateParticles();
}

// ============ REFRESH ANIMATIONS ON RESIZE ============
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth <= 768) {
        while (particles.firstChild) {
            particles.removeChild(particles.firstChild);
        }
        generateParticles();
    }
}, 250));

// ============ UTILITY FUNCTIONS ============
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// ============ KEYBOARD NAVIGATION ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============ LAZY LOAD IMAGES ============
function setupLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

setupLazyLoading();

// ============ ACCESSIBILITY ENHANCEMENTS ============
// Ensure focus management for keyboard navigation
document.querySelectorAll('a[href^=""], button, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid var(--accent-primary)';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// ============ PERFORMANCE OPTIMIZATION ============
// Throttle scroll events
let ticking = false;

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNavbarOnScroll();
            updateBackToTopButton();
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', onScroll, { passive: true });

// ============ SOUND EFFECTS (OPTIONAL) ============
function playClickSound() {
    // Optional: Add a subtle click sound on button clicks
    // You can uncomment this if you want to add audio feedback
    // const audio = new Audio('data:audio/wav;base64,...');
    // audio.play();
}

document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', playClickSound);
});

// ============ CONSENT/ANALYTICS (OPTIONAL) ============
// Add your analytics code here
// Example: Google Analytics
// gtag('config', 'GA_MEASUREMENT_ID');

// ============ PRINT STYLES ============
window.addEventListener('beforeprint', () => {
    // Hide non-essential elements for printing
    backToTop.style.display = 'none';
    particles.style.display = 'none';
});

window.addEventListener('afterprint', () => {
    // Restore hidden elements
    backToTop.style.display = 'flex';
    particles.style.display = 'block';
});

// ============ CONSOLE WELCOME MESSAGE ============
console.log(
    '%cWelcome to Premium VA Portfolio!',
    'font-size: 20px; color: #00d4ff; font-weight: bold; text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);'
);
console.log(
    '%cThis portfolio showcases the power of modern web design with smooth animations and interactive features.',
    'font-size: 14px; color: #b0b8d4;'
);

// ============ SERVICE WORKER REGISTRATION (Optional PWA) ============
if ('serviceWorker' in navigator) {
    // Uncomment below to enable PWA functionality
    // navigator.serviceWorker.register('sw.js').catch(err => console.log('SW registration failed'));
}

console.log('✓ Portfolio loaded successfully with all interactive features!');

// Disable Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === "PrintScreen" || e.key === "F12" || (e.window && (e.key === "PrintScreen")) || (e.ctrlKey && (e.key === "u" || e.key === "i" || e.key === "j" || e.key === "s")) || (e.metaKey && (e.key === "u" || e.key === "i" || e.key === "j" || e.key === "s" || e.key === "r"))
     || e.key === "F5" || (e.ctrlKey && e.key === "r") || (e.metaKey && e.key === "r") || (e.shiftKey && e.key === "I") || (e.shiftKey && e.key === "S")) {
        e.preventDefault();
    }
});
//Context Menu Disable
document.addEventListener('contextmenu', event => event.preventDefault());

// Modal Functionality
const modal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");
const closeBtn = document.querySelector(".close-modal");

function openVideoModal(videoSrc) {
    modal.style.display = "flex";
    modalVideo.src = videoSrc;
    modalVideo.play();
}

closeBtn.onclick = function() {
    modal.style.display = "none";
    modalVideo.pause();
    modalVideo.src = ""; // Clear source to stop loading
}

// Click outside modal to close
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        modalVideo.pause();
    }
}

// NEW: This brings back normal scrolling
    document.body.style.overflow = "auto";

// Teaser effect (Hover to play muted preview)
const previewVideos = document.querySelectorAll('.portfolio-video-preview');

previewVideos.forEach(v => {
    v.addEventListener('mouseenter', () => v.play());
    v.addEventListener('mouseleave', () => {
        v.pause();
        v.currentTime = 0;
    });
});
function openImageModal(imgSrc, caption) {
    const modal = document.getElementById("imageModal");
    const fullImg = document.getElementById("fullSizeImage");
    const captionText = document.getElementById("imageCaption");

    modal.style.display = "flex";
    fullImg.src = imgSrc;
    captionText.innerHTML = caption;

    // Lock scroll to prevent testimonials from bleeding through
    document.body.style.overflow = "hidden";
}

function closeImageModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
    
    // Unlock scroll
    document.body.style.overflow = "auto";
}

// Close if user clicks outside the image
window.onclick = function(event) {
    const imgModal = document.getElementById("imageModal");
    const vidModal = document.getElementById("videoModal");
    if (event.target == imgModal) closeImageModal();
    if (event.target == vidModal) closeModal(); // Reusing your existing video close
}

// ============ INTRO VIDEO SECTION JAVASCRIPT ============

document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.getElementById('videoContainer');
    const playButton = document.getElementById('playButton');
    const videoModal = document.getElementById('videoModal');
    const modalBackdrop = document.getElementById('modalBackdrop');
    const closeButton = document.getElementById('closeButton');
    const shareButton = document.getElementById('shareButton');
    const shareMenu = document.getElementById('shareMenu');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const shareLinks = document.querySelectorAll('.share-link');

    // Open video modal
    function openVideoModal() {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close video modal
    function closeVideoModal() {
        videoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Play button click
    playButton.addEventListener('click', openVideoModal);
    videoContainer.addEventListener('click', openVideoModal);

    // Close modal
    closeButton.addEventListener('click', closeVideoModal);
    modalBackdrop.addEventListener('click', closeVideoModal);

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });

    // Share button toggle
    shareButton.addEventListener('click', function(e) {
        e.stopPropagation();
        shareMenu.classList.toggle('active');
    });

    // Close share menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!shareButton.contains(e.target) && !shareMenu.contains(e.target)) {
            shareMenu.classList.remove('active');
        }
    });

    // Share links handler
    shareLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.getAttribute('data-platform');
            handleShare(platform);
            shareMenu.classList.remove('active');
        });
    });

    // Copy link functionality
    copyLinkBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Link copied to clipboard!');
            shareMenu.classList.remove('active');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    });

    // Share handler
    function handleShare(platform) {
        const videoUrl = 'https://www.youtube.com/watch?v=9n8sXo7l5j0';
        const currentUrl = window.location.href;
        const title = 'Check out my introduction video!';
        let shareUrl = '';

        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                break;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(135deg, #00d4ff 0%, #8338ec 100%);
            color: white;
            padding: 14px 24px;
            border-radius: 8px;
            font-weight: 600;
            z-index: 2000;
            animation: slideInUp 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
        `;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideDown 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Add slideDown animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            to {
                transform: translateY(100px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe animated elements
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        observer.observe(el);
    });

    // Performance optimization - lazy load thumbnail
    const thumbnail = document.querySelector('.video-thumbnail img');
    if ('loading' in HTMLImageElement.prototype) {
        thumbnail.loading = 'lazy';
    }

    console.log('✅ Intro Video Section initialized');
});

