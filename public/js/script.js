document.addEventListener('DOMContentLoaded', function() {
    // Typing Effect
    const typingText = document.getElementById('typing-text');
    const words = ["a Software Developer", "a Full-Stack Developer", "a Tech Enthusiast","Orbix Technologies Founder"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;

    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        typingText.textContent = currentChar;

        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(type, 50);
        } else {
            // Change word
            isDeleting = !isDeleting;
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            setTimeout(type, 1000);
        }
    }

    // Start typing effect
    setTimeout(type, 1000);

// Mobile Menu Toggle with Animation
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', function() {
    // Toggle the show class for animation
    mobileMenu.classList.toggle('show');
    
    // Toggle aria-expanded for accessibility
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    
    // Change icon between hamburger and close
    const icon = this.querySelector('i');
    if (mobileMenu.classList.contains('show')) {
        icon.classList.replace('fa-bars', 'fa-times');
    } else {
        icon.classList.replace('fa-times', 'fa-bars');
    }
});

// Close menu when clicking on a link (for single-page navigation)
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('show');
        mobileMenuButton.querySelector('i').classList.replace('fa-times', 'fa-bars');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
});

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Portfolio Filter
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            portfolioFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide portfolio items based on filter
            portfolioItems.forEach(item => {
                item.classList.remove('show');
                
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 100);
                }
            });
        });
    });

    // Initialize - show all items
    portfolioFilters[0].classList.add('active');
    portfolioItems.forEach(item => item.classList.add('show'));



   // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success');

    contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const messageData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };

    try {
        // 🔥 Send the data to your backend (update URL if hosted)
        const response = await fetch("https://portfolio-website-w0cf.onrender.com/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
        });

        const result = await response.json();

        if (response.ok) {
        document.getElementById('success-message').textContent =
            result.success || 'Your message has been sent successfully!';
        successModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        contactForm.reset();
        } else {
        alert(result.error || "Something went wrong. Please try again later.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Network error. Please check your connection and try again.");
    }
    });

    // Optional: Close success modal
    if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
        successModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    }


    closeSuccessBtn.addEventListener('click', function() {
        successModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-fadeIn');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});