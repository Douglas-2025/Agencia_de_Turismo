// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    initNavbarScroll();
    initFormValidation();
    initLoadingAnimations();
    
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Scroll reveal animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal classes
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// Form validation
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('mensagem');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset validation states
        clearValidation();
        
        let isValid = true;
        
        // Validate name
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Por favor, informe seu nome completo.');
            isValid = false;
        }
        
        // Validate email
        if (!isValidEmail(emailInput.value.trim())) {
            showError(emailInput, 'Por favor, informe um e-mail válido.');
            isValid = false;
        }
        
        // Validate message
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Por favor, escreva uma mensagem com pelo menos 10 caracteres.');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            submitForm();
        }
    });
    
    // Real-time validation
    nameInput.addEventListener('blur', function() {
        if (this.value.trim().length >= 2) {
            showSuccess(this);
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (isValidEmail(this.value.trim())) {
            showSuccess(this);
        }
    });
    
    messageInput.addEventListener('blur', function() {
        if (this.value.trim().length >= 10) {
            showSuccess(this);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(input, message) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    
    const feedback = input.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
        feedback.textContent = message;
    }
}

function showSuccess(input) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
}

function clearValidation() {
    const inputs = document.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.classList.remove('is-invalid', 'is-valid');
    });
}

function submitForm() {
    const submitBtn = document.querySelector('#contactForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Show success state
        submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Enviado com Sucesso!';
        submitBtn.classList.remove('btn-cta');
        submitBtn.classList.add('btn', 'btn-success');
        
        // Show success message
        showSuccessMessage();
        
        // Reset form and button after delay
        setTimeout(() => {
            document.getElementById('contactForm').reset();
            clearValidation();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn', 'btn-success');
            submitBtn.classList.add('btn-cta');
        }, 3000);
    }, 2000);
}

function showSuccessMessage() {
    const alert = document.createElement('div');
    alert.className = 'alert alert-success alert-dismissible fade show mt-3';
    alert.innerHTML = `
        <i class="bi bi-check-circle-fill me-2"></i>
        <strong>Obrigado!</strong> Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alert, form.nextSibling);
    
    // Auto remove alert after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.remove();
        }
    }, 5000);
}

// Loading animations
function initLoadingAnimations() {
    const elements = document.querySelectorAll('.loading');
    
    setTimeout(() => {
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('loaded');
            }, index * 100);
        });
    }, 300);
}

// Active navigation highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Enhanced card interactions
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.destination-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection && scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mobile menu auto-close
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
});

// Form input animations
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.form-control, .form-select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentNode.classList.remove('input-focused');
        });
    });
});

// Intersection Observer for counter animation
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current).toLocaleString('pt-BR') + '+';
        
        if (current >= target) {
            element.textContent = target.toLocaleString('pt-BR') + '+';
            clearInterval(timer);
        }
    }, 20);
}

// Initialize counter animations
const counterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = counter.textContent.includes('50k') ? 50000 : 200;
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const aboutSection = document.querySelector('#sobre');
    if (aboutSection) {
        counterObserver.observe(aboutSection);
    }
});