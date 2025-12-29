// Enhanced JavaScript with scroll progress and animations

// Scroll Progress Indicator
function updateScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// Enhanced Intersection Observer for smooth animations
const enhancedObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const enhancedObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, enhancedObserverOptions);

// Observe sections for animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section');
        enhancedObserver.observe(section);
    });

    // Initialize scroll progress
    updateScrollProgress();
});

// Enhanced mobile navigation with smooth transitions
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Enhanced smooth scrolling with easing
function smoothScrollTo(target, duration = 800) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    requestAnimationFrame(animation);
}

// Apply enhanced smooth scrolling to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            smoothScrollTo(targetSection);
        }
    });
});

// Enhanced navbar background change on scroll
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollTop = window.pageYOffset;

    if (scrollTop > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }

    // Hide/show navbar on scroll (mobile)
    if (window.innerWidth <= 768) {
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
    }

    lastScrollTop = scrollTop;
});

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
        this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.25)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    });

    // Touch interactions for mobile
    card.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.98)';
    });

    card.addEventListener('touchend', function () {
        this.style.transform = 'scale(1)';
    });
});

// Enhanced skill item interactions
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-12px) scale(1.02)';
        this.style.boxShadow = '0 25px 50px rgba(52, 152, 219, 0.2)';
    });

    skill.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
    });

    // Touch interactions for mobile
    skill.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.95)';
    });

    skill.addEventListener('touchend', function () {
        this.style.transform = 'scale(1)';
    });
});

// Enhanced button interactions
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
    });

    btn.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
    });

    // Touch interactions for mobile
    btn.addEventListener('touchstart', function () {
        this.style.transform = 'scale(0.98)';
    });

    btn.addEventListener('touchend', function () {
        this.style.transform = 'scale(1)';
    });
});

// Enhanced form interactions
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'translateY(-2px)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.skill-item, .project-card').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
        });
    }, 500);
});

// Back to Top Button functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;

            if (scrollPosition > 300) { // Show after 300px of scrolling
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        // Smooth scroll to top when clicked
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Enhanced touch interactions for mobile
        backToTopButton.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.95)';
        });

        backToTopButton.addEventListener('touchend', function () {
            this.style.transform = 'scale(1)';
        });

        // Keyboard accessibility
        backToTopButton.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(updateScrollProgress, 16)); // 60fps

// Custom Cursor - Only for non-touch devices
const cursor = document.querySelector('.custom-cursor');

// Check if device supports touch
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice && cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Add hover effects for interactive elements
    document.addEventListener('mouseover', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('.btn') || e.target.closest('.skill-item') || e.target.closest('.project-card') || e.target.closest('.timeline-node')) {
            cursor.classList.add('hover');
        }
    });

    document.addEventListener('mouseout', (e) => {
        cursor.classList.remove('hover');
    });

    // Add click effect
    document.addEventListener('mousedown', () => {
        cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
        cursor.classList.remove('click');
    });
}

// Enhanced contact form with better error handling
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // Simulate form submission (replace with actual EmailJS or backend)
                await new Promise(resolve => setTimeout(resolve, 2000));

                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();

            } catch (error) {
                showNotification('Failed to send message. Please try again or contact me directly.', 'error');
                console.error('Form submission error:', error);

            } finally {
                // Restore button state
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-item, .project-card, .timeline-node');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Project card hover effects enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skills hover effects
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });

    skill.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Education timeline node hover effects
document.querySelectorAll('.timeline-node').forEach(node => {
    node.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    node.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize other features
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('section');
        enhancedObserver.observe(section);
    });


    // Initialize scroll progress
    updateScrollProgress();
});


/* =========================================
   IMMERSIVE GALLERY SLIDER LOGIC
   ========================================= */

// Wrapper to avoid global scope pollution (optional, but good practice, 
// though we need 'prevSlide' and 'nextSlide' accessible mostly via UI if inline, but here we attach listeners).

document.addEventListener('DOMContentLoaded', () => {

    const canvas = document.getElementById('galleryCanvas');
    if (!canvas) return; // Exit if element not found (e.g. on other pages)

    const ctx = canvas.getContext('2d');
    const loader = document.getElementById('loader');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    // --- 1. CONFIGURATION & DATA ---
    const projects = [
        {
            title: "React Weather App",
            category: "Web Application",
            description: "Real-time weather forecasting with 5-day data and dynamic icons.",
            image: "", // No image provided, will use fallback
            color: "#3498db", // Blue
            github: "https://github.com/rahim-jr/react-weather-app",
            link: "#" // Live demo placeholder
        },
        {
            title: "Digit Recognition",
            category: "Machine Learning",
            description: "Deep learning model for recognizing handwritten digits (MNIST) with high accuracy.",
            image: "",
            color: "#e74c3c", // Red
            github: "https://github.com/rahim-jr/Digit-Recongntion-Kaggle",
            link: "#"
        },
        {
            title: "Broadcast Server",
            category: "Backend / Real-time",
            description: "WebSocket-based real-time chat and message broadcasting system.",
            image: "",
            color: "#9b59b6", // Purple
            github: "https://github.com/rahim-jr/Broadcast-Server",
            link: "#"
        },
        {
            title: "Job Scraper Platform",
            category: "Full Stack / Automation",
            description: "Automated scraping platform for job listings using FastAPI and React.",
            image: "",
            color: "#2ecc71", // Green
            github: "https://github.com/rahim-jr/Automated-Job-Scrapper",
            link: "#"
        },
        {
            title: "E-commerce API",
            category: "Backend API",
            description: "Secure Node.js/TypeScript API for e-commerce with JWT auth and MongoDB.",
            image: "",
            color: "#f39c12", // Orange
            github: "https://github.com/rahim-jr/Amazon-lite-ecommerce-lite",
            link: "#"
        }
    ];

    // --- 2. STATE MANAGEMENT ---
    let currentIndex = 0;
    let nextIndex = 0;

    // Animation States
    let isTransitioning = false;
    let transitionProgress = 0; // 0 to 1
    let transitionDirection = 1; // 1 (next) or -1 (prev)

    // Hover States
    let isHovering = false;
    let hoverProgress = 0; // 0 to 1

    // Mouse Position
    let mouseX = 0;
    let mouseY = 0;

    // Assets
    const loadedImages = [];
    let imagesLoadedCount = 0;

    // --- 3. SETUP ---
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Load Images (handling fallbacks)
    projects.forEach((proj, index) => {
        if (!proj.image) {
            // No image URL provided, mark as null immediately
            loadedImages[index] = null;
            imagesLoadedCount++;
            checkAllLoaded();
        } else {
            const img = new Image();
            img.src = proj.image;
            img.onload = () => {
                loadedImages[index] = img;
                imagesLoadedCount++;
                checkAllLoaded();
            };
            img.onerror = () => {
                loadedImages[index] = null; // Fallback
                imagesLoadedCount++;
                checkAllLoaded();
            };
        }
    });

    function checkAllLoaded() {
        if (imagesLoadedCount === projects.length) {
            if (loader) loader.style.display = 'none';
        }
    }

    // --- 4. INTERACTION ---
    canvas.addEventListener('mouseenter', () => isHovering = true);
    canvas.addEventListener('mouseleave', () => isHovering = false);
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Check click on buttons
    canvas.addEventListener('click', () => {
        if (!isTransitioning && isHovering && hoverProgress > 0.8) {
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const btnW = 140;
            const btnH = 40;
            const yOffset = 0; // consistent with drawOverlay

            // Calc precise button positions (matching drawOverlay)
            const demoBtnX = cx - btnW - 10;
            const githubBtnX = cx + 10;
            const btnY = cy + 80 + yOffset;

            // Check Demo Button
            if (isInside(mouseX, mouseY, demoBtnX, btnY, btnW, btnH)) {
                // Navigate to demo
                if (projects[currentIndex].link && projects[currentIndex].link !== '#') {
                    window.open(projects[currentIndex].link, '_blank');
                } else {
                    alert("Demo link currently not available.");
                }
            }

            // Check GitHub Button
            if (isInside(mouseX, mouseY, githubBtnX, btnY, btnW, btnH)) {
                if (projects[currentIndex].github && projects[currentIndex].github !== '#') {
                    window.open(projects[currentIndex].github, '_blank');
                } else {
                    alert("GitHub link currently not available.");
                }
            }
        }
    });

    function isInside(mx, my, x, y, w, h) {
        return mx >= x && mx <= x + w && my >= y && my <= y + h;
    }

    // Nav Bindings
    if (prevBtn) prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        nextIndex = (currentIndex - 1 + projects.length) % projects.length;
        startTransition(-1);
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        nextIndex = (currentIndex + 1) % projects.length;
        startTransition(1);
    });

    function startTransition(dir) {
        isTransitioning = true;
        transitionDirection = dir;
        transitionProgress = 0;
    }

    // --- 5. DRAWING ---

    function draw() {
        // Clear background
        ctx.fillStyle = '#121212';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (isTransitioning) {
            drawTransition();
        } else {
            drawStatic();
        }

        requestAnimationFrame(draw);
        updateLogic();
    }

    function updateLogic() {
        // Smooth Hover
        const targetHover = isHovering ? 1 : 0;
        hoverProgress += (targetHover - hoverProgress) * 0.1;

        // Transition
        if (isTransitioning) {
            transitionProgress += 0.04;
            if (transitionProgress >= 1) {
                currentIndex = nextIndex;
                isTransitioning = false;
                transitionProgress = 0;
            }
        }
    }

    function drawStatic() {
        const img = loadedImages[currentIndex];
        const proj = projects[currentIndex];

        ctx.save();
        if (img) {
            // Draw Image with effects
            const scale = 1 + (hoverProgress * 0.05);
            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.scale(scale, scale);
            ctx.translate(-canvas.width / 2, -canvas.height / 2);

            const blurAmount = hoverProgress * 12;
            const brightAmount = 100 - (hoverProgress * 40);

            if (hoverProgress > 0.01) {
                ctx.filter = `blur(${blurAmount}px) brightness(${brightAmount}%)`;
            }
            drawImageProp(ctx, img, 0, 0, canvas.width, canvas.height);
        } else {
            // Fallback: Geometric Pattern or Solid Color
            drawFallbackBackground(proj.color, hoverProgress);
        }
        ctx.restore();

        // Text Layers
        if (hoverProgress < 1) {
            drawHint(proj, 1 - hoverProgress);
        }
        if (hoverProgress > 0) {
            drawOverlay(proj, hoverProgress);
        }
    }

    function drawFallbackBackground(color, hoverAmt) {
        // Use a dark gradient based on the project color
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        grad.addColorStop(0, '#1a1a1a');
        grad.addColorStop(1, color); // Project color at bottom right

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add some noise or lines if you want, but simple gradient is clean
        ctx.fillStyle = "rgba(255,255,255,0.05)";
        const gridSize = 50;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.fillRect(x, 0, 1, canvas.height);
        }

        // Apply dimming on hover
        if (hoverAmt > 0) {
            ctx.fillStyle = `rgba(0,0,0,${hoverAmt * 0.6})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    function drawHint(project, opacity) {
        ctx.save();
        ctx.globalAlpha = opacity;

        const gradientHeight = 150;
        const grad = ctx.createLinearGradient(0, canvas.height - gradientHeight, 0, canvas.height);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(1, "rgba(0,0,0,0.9)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, canvas.height - gradientHeight, canvas.width, gradientHeight);

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";

        ctx.font = "bold 28px 'Inter', sans-serif";
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 4;
        ctx.fillText(project.title, canvas.width / 2, canvas.height - 40);

        ctx.font = "12px 'Inter', sans-serif";
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.fillText("HOVER FOR DETAILS", canvas.width / 2, canvas.height - 20);

        ctx.restore();
    }

    function drawOverlay(project, opacity) {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const cx = canvas.width / 2;
        const cy = canvas.height / 2;
        const yOffset = (1 - opacity) * 20;

        // Category
        ctx.font = "bold 14px 'Inter', sans-serif";
        ctx.fillStyle = project.color;
        ctx.fillText(project.category.toUpperCase(), cx, cy - 80 + yOffset);

        // Title
        ctx.font = "bold 48px 'Inter', sans-serif";
        ctx.fillStyle = "white";
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 10;
        ctx.fillText(project.title, cx, cy - 10 + yOffset);

        // Description - Split into lines if too long
        ctx.font = "16px 'Inter', sans-serif";
        ctx.fillStyle = "#ddd";
        ctx.shadowBlur = 0;

        const maxWidth = 600;
        const words = project.description.split(' ');
        let line = '';
        let lines = [];

        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                lines.push(line);
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }
        lines.push(line);

        lines.forEach((l, i) => {
            ctx.fillText(l, cx, cy + 35 + (i * 25) + yOffset);
        });

        // --- BUTTONS ---
        const btnW = 140;
        const btnH = 40;
        const btnY = cy + 80 + yOffset;

        // 1. Live Demo Button (Left)
        drawButton(cx - btnW - 10, btnY, btnW, btnH, "LIVE DEMO", mouseX, mouseY);

        // 2. GitHub Button (Right)
        drawButton(cx + 10, btnY, btnW, btnH, "GITHUB", mouseX, mouseY);

        ctx.restore();
    }

    function drawButton(x, y, w, h, text, mx, my) {
        const r = h / 2; // Full rounded corners (pill shape)

        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.lineTo(x + w, y + h - r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.lineTo(x + r, y + h);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.lineTo(x, y + r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();

        ctx.strokeStyle = "white";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Hover fill
        if (isInside(mx, my, x, y, w, h)) {
            ctx.fillStyle = "rgba(255,255,255,0.2)";
            ctx.fill();
            document.body.style.cursor = "pointer";
        }

        ctx.fillStyle = "white";
        ctx.font = "bold 14px 'Inter', sans-serif";
        ctx.fillText(text, x + w / 2, y + h / 2);
    }

    function drawTransition() {
        // Draw current moving out
        const offset = transitionProgress * canvas.width * transitionDirection;
        const currentImg = loadedImages[currentIndex];

        ctx.save();
        ctx.translate(-offset, 0);
        if (currentImg) {
            drawImageProp(ctx, currentImg, 0, 0, canvas.width, canvas.height);
        } else {
            drawFallbackBackground(projects[currentIndex].color, 0);
        }
        drawHint(projects[currentIndex], 1 - transitionProgress);
        ctx.restore();

        // Draw next moving in
        const nextImg = loadedImages[nextIndex];
        const startX = (transitionDirection === 1) ? canvas.width : -canvas.width;

        ctx.save();
        ctx.translate(startX - offset, 0);
        if (nextImg) {
            drawImageProp(ctx, nextImg, 0, 0, canvas.width, canvas.height);
        } else {
            drawFallbackBackground(projects[nextIndex].color, 0);
        }
        drawHint(projects[nextIndex], transitionProgress);
        ctx.restore();
    }

    // Helper: object-fit: cover for Canvas
    function drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {
        // (Standard crop logic)
        if (arguments.length === 2) { x = y = 0; w = ctx.canvas.width; h = ctx.canvas.height; }
        offsetX = typeof offsetX === 'number' ? offsetX : 0.5;
        offsetY = typeof offsetY === 'number' ? offsetY : 0.5;

        // keep bounds [0,1]
        if (offsetX < 0) offsetX = 0; if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1; if (offsetY > 1) offsetY = 1;

        var iw = img.width, ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r, nh = ih * r,
            cx, cy, cw, ch, ar = 1;

        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;
        nw *= ar; nh *= ar;

        cw = iw / (nw / w); ch = ih / (nh / h);
        cx = (iw - cw) * offsetX; cy = (ih - ch) * offsetY;

        if (cx < 0) cx = 0; if (cy < 0) cy = 0;
        if (cw > iw) cw = iw; if (ch > ih) ch = ih;

        ctx.drawImage(img, cx, cy, cw, ch, x, y, w, h);
    }

    // START
    requestAnimationFrame(draw);
});


