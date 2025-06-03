// Main JavaScript for Dr. Mujeeb ur Rehman Jamali Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initSkillBars();
    initResumeViewer();
    initScrollReveal();
    initSmoothScrolling();
    initParticles();
    initProfileImage();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll effects and animations
function initScrollEffects() {
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            }
        });
    };

    // Initial check
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Resume viewer functionality
function initResumeViewer() {
    const viewResumeBtn = document.getElementById('view-resume');
    const resumePreview = document.getElementById('resume-preview');
    const printCvBtn = document.getElementById('print-cv');

    if (viewResumeBtn && resumePreview) {
        viewResumeBtn.addEventListener('click', function() {
            resumePreview.classList.toggle('active');

            if (resumePreview.classList.contains('active')) {
                viewResumeBtn.innerHTML = '<i class="fas fa-eye-slash"></i> Hide CV';
                resumePreview.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                viewResumeBtn.innerHTML = '<i class="fas fa-eye"></i> View CV';
            }
        });
    }

    if (printCvBtn) {
        printCvBtn.addEventListener('click', function() {
            // Open CV in new window for printing
            const cvWindow = window.open('assets/resume/Dr_Mujeeb_ur_Rehman_Jamali_CV.html', '_blank');
            cvWindow.onload = function() {
                cvWindow.print();
            };
        });
    }
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('revealed');
            }
        });
    };

    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Particle animation for hero section
function initParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    // Create particles container
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    hero.appendChild(particlesContainer);

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Intersection Observer for better performance
function createIntersectionObserver(callback, options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    return new IntersectionObserver(callback, observerOptions);
}

// Enhanced scroll reveal with Intersection Observer
function initEnhancedScrollReveal() {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    };
    
    const revealObserver = createIntersectionObserver(revealCallback, {
        threshold: 0.15
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Loading state management
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Error handling
function handleError(error, context = '') {
    console.error(`Error in ${context}:`, error);
    // You could add user-friendly error notifications here
}

// Performance optimization
const optimizedScrollHandler = throttle(() => {
    // Handle scroll events here
}, 16); // ~60fps

const optimizedResizeHandler = debounce(() => {
    // Handle resize events here
}, 250);

window.addEventListener('scroll', optimizedScrollHandler);
window.addEventListener('resize', optimizedResizeHandler);

// Profile image loading with fallbacks
function initProfileImage() {
    const profileImg = document.querySelector('.profile-photo');
    if (!profileImg) return;

    // Array of image URLs to try in order
    const imageUrls = [
        'https://scholar.googleusercontent.com/citations?view_op=medium_photo&user=5APZ-gEAAAAJ&citpid=1',
        'https://scholar.googleusercontent.com/citations?view_op=view_photo&user=5APZ-gEAAAAJ&citpid=1',
        'https://scholar.google.com/citations?view_op=medium_photo&user=5APZ-gEAAAAJ',
        'https://via.placeholder.com/400x400/667eea/ffffff?text=Dr.+Mujeeb+ur+Rehman+Jamali'
    ];

    let currentIndex = 0;

    function tryLoadImage() {
        if (currentIndex >= imageUrls.length) {
            console.error('All image URLs failed to load');
            return;
        }

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = function() {
            profileImg.src = imageUrls[currentIndex];
            profileImg.style.opacity = '1';
            console.log(`Profile image loaded successfully from: ${imageUrls[currentIndex]}`);
        };

        img.onerror = function() {
            console.warn(`Failed to load image from: ${imageUrls[currentIndex]}`);
            currentIndex++;
            tryLoadImage();
        };

        img.src = imageUrls[currentIndex];
    }

    // Start loading process
    tryLoadImage();

    // Add loading indicator
    profileImg.style.opacity = '0.5';
    profileImg.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
}

// Export functions for potential external use
window.PortfolioJS = {
    initNavigation,
    initScrollEffects,
    initSkillBars,
    initResumeViewer,
    initScrollReveal,
    initProfileImage,
    showLoading,
    hideLoading,
    debounce,
    throttle
};
