/* ========================================
   MAIN JAVASCRIPT
   ======================================== */

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        // Toggle mobile menu open/close
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking outside the nav
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Close menu after tapping a nav link (better mobile UX)
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Hide/show navigation on scroll to save vertical space when scrolling down
    let lastScroll = 0;
    const nav = document.querySelector('.navigation');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                nav.classList.remove('hidden');
                return;
            }
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
            
            lastScroll = currentScroll;
        });
    }

    // Add smooth scrolling to all links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Check if it's an anchor link
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.service-card, .price-item, .contact-card, .feature'
    );
    
    animatedElements.forEach(el => observer.observe(el));

    // Add hover effect for cards
    const cards = document.querySelectorAll('.service-card, .contact-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // Add animation to stats on scroll
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    if (stats.length > 0) {
        statsObserver.observe(stats[0].parentElement.parentElement);
    }

    function animateStats() {
        stats.forEach(stat => {
            const finalValue = stat.textContent;
            const numericValue = parseInt(finalValue.replace(/\D/g, ''));
            const suffix = finalValue.replace(/[\d\s]/g, '');
            
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    stat.textContent = numericValue + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        });
    }

    // Add scroll progress indicator
    const createScrollIndicator = () => {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            height: 3px;
            background: linear-gradient(90deg, #f97316, #3b82f6);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(indicator);

        window.addEventListener('scroll', () => {
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            indicator.style.width = scrollPercentage + '%';
        });
    };

    createScrollIndicator();

    // Performance optimization: Debounce scroll events
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

    // Add parallax effect to background orbs
    const orbs = document.querySelectorAll('.gradient-orb, .pricing-orb');
    
    const handleParallax = debounce(() => {
        const scrolled = window.pageYOffset;
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.1;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }, 10);

    window.addEventListener('scroll', handleParallax);

    // Console welcome message
    console.log('%cPC Repairs Pretoria', 'font-size: 24px; font-weight: bold; color: #f97316;');
    console.log('%c🖥️ Professional Computer & Laptop Repair Services', 'font-size: 14px; color: #3b82f6;');
    console.log('%c📞 Call: 076 797 9720', 'font-size: 12px; color: #22c55e;');
});
