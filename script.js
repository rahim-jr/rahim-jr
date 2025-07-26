// Custom Cursor
const cursor = document.querySelector('.custom-cursor');

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

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));





// Fast and smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Fast smooth scrolling
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Fast smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            // Fast smooth scrolling
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add fast smooth scrolling to all buttons and links
document.addEventListener('DOMContentLoaded', function() {
    // Fast smooth scroll for "View Projects" button
    const viewProjectsBtn = document.querySelector('a[href="#projects"]');
    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Custom fast smooth scrolling function
    function fastSmoothScroll(targetElement) {
        const targetPosition = targetElement.offsetTop - 80;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 600; // Faster duration
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    }
    
    // Apply fast smooth scrolling to all navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                fastSmoothScroll(targetSection);
            }
        });
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

// Initialize EmailJS with your actual public key
emailjs.init("fyVt5igh--KWJd0tV");

// Security measures
let lastSubmitTime = 0;
const SUBMIT_COOLDOWN = 5000; // 5 seconds
let submitCount = 0;
const MAX_SUBMITS_PER_HOUR = 10;
const HOUR_IN_MS = 3600000; // 1 hour in milliseconds
let blockedIPs = new Set();
const MAX_FAILED_ATTEMPTS = 3;
let failedAttempts = 0;

// Reset submit count every hour
setInterval(() => {
    submitCount = 0;
    failedAttempts = 0;
}, HOUR_IN_MS);

// Generate simple fingerprint for basic bot detection
function generateFingerprint() {
    return navigator.userAgent + 
           screen.width + 
           screen.height + 
           new Date().getTimezoneOffset();
}

// Track form interactions for security
let formInteractions = 0;
let lastInteractionTime = 0;

// Monitor form field interactions
contactForm.addEventListener('focusin', function() {
    formInteractions++;
    lastInteractionTime = Date.now();
    
    // Set form start time on first interaction
    if (!sessionStorage.getItem('formStartTime')) {
        sessionStorage.setItem('formStartTime', Date.now());
    }
});

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Rate limiting per session
    const now = Date.now();
    if (now - lastSubmitTime < SUBMIT_COOLDOWN) {
        showNotification('Please wait 5 seconds before sending another message.', 'error');
        return;
    }
    
    // Hourly limit
    if (submitCount >= MAX_SUBMITS_PER_HOUR) {
        showNotification('Too many messages sent. Please try again later.', 'error');
        return;
    }
    
    lastSubmitTime = now;
    submitCount++;
    
    // Get form data
    const formData = new FormData(this);
    let name = formData.get('name').trim();
    let email = formData.get('email').trim();
    let message = formData.get('message').trim();
    
    // Input sanitization
    name = sanitizeInput(name);
    email = sanitizeInput(email);
    message = sanitizeInput(message);
    
    // Enhanced validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
    }
    
    if (name.length < 2 || name.length > 50) {
        showNotification('Name must be between 2 and 50 characters.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    if (message.length < 10 || message.length > 1000) {
        showNotification('Message must be between 10 and 1000 characters.', 'error');
        return;
    }
    
    // Check for suspicious content
    if (containsSuspiciousContent(name) || containsSuspiciousContent(email) || containsSuspiciousContent(message)) {
        showNotification('Invalid content detected. Please check your input.', 'error');
        failedAttempts++;
        return;
    }
    
    // Check for repeated failed attempts
    if (failedAttempts >= MAX_FAILED_ATTEMPTS) {
        showNotification('Too many failed attempts. Please try again later.', 'error');
        return;
    }
    
    // Basic bot detection - check if form was filled too quickly
    const formStartTime = sessionStorage.getItem('formStartTime') || Date.now();
    const timeSpent = Date.now() - formStartTime;
    
    if (timeSpent < 2000) { // Less than 2 seconds
        showNotification('Please take your time filling out the form.', 'error');
        failedAttempts++;
        return;
    }
    
    // Check for minimum form interactions (basic human verification)
    if (formInteractions < 3) {
        showNotification('Please interact with the form fields before submitting.', 'error');
        failedAttempts++;
        return;
    }
    
    // Check for reasonable interaction time
    const interactionTime = Date.now() - lastInteractionTime;
    if (interactionTime < 1000) { // Less than 1 second since last interaction
        showNotification('Please take your time with the form.', 'error');
        failedAttempts++;
        return;
    }
    
    // Show sending notification
    showNotification('Sending your message...', 'info');
    
    // EmailJS integration with your actual service
    const combinedMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    
    const templateParams = {
        message: combinedMessage
    };
    
    console.log('Sending email with combined message:', combinedMessage);
    console.log('Template params:', templateParams);
    
    emailjs.send('service_x7ud7rg', 'template_cm2zcyl', templateParams)
        .then(function(response) {
            console.log('Email sent successfully:', response);
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form and security counters
            contactForm.reset();
            formInteractions = 0;
            failedAttempts = 0;
            sessionStorage.removeItem('formStartTime');
            
            // Log successful submission for monitoring
            console.log('Form submitted successfully by:', generateFingerprint());
        }, function(error) {
            console.error('Email send failed:', error);
            showNotification('Failed to send message. Please try again. Error: ' + error.text, 'error');
            failedAttempts++;
        });
});

// Input sanitization function
function sanitizeInput(input) {
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .substring(0, 1000); // Limit length
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Check for suspicious content
function containsSuspiciousContent(text) {
    const suspiciousPatterns = [
        /<script/i,
        /javascript:/i,
        /on\w+=/i,
        /eval\(/i,
        /document\./i,
        /window\./i,
        /alert\(/i,
        /confirm\(/i,
        /prompt\(/i
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(text));
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
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
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skills hover effects
document.querySelectorAll('.skill-item').forEach(skill => {
    skill.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
    });
    
    skill.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Education timeline node hover effects
document.querySelectorAll('.timeline-node').forEach(node => {
    node.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    node.addEventListener('mouseleave', function() {
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

 