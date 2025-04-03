document.addEventListener('DOMContentLoaded', function() {
    // Typing Effect
    const typingText = document.getElementById('typing-text');
    const words = ["Godwin Mokua","Software Developer", "Full-Stack Developer", "Tech Enthusiast","GeeTech Company Founder"];
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

    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
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

    // Cart System
    let cart = [];
    const cartCountElements = document.querySelectorAll('#cart-count, #mobile-cart-count');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartTax = document.getElementById('cart-tax');
    const cartTotal = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    const continueShoppingBtn = document.getElementById('continue-shopping');
    const closeCartBtn = document.getElementById('close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const price = parseFloat(this.getAttribute('data-price'));
            
            // Check if item already exists in cart
            const existingItem = cart.find(item => item.service === service);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    service: service,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCart();
            
            // Show cart modal
            cartModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // Update cart UI
    function updateCart() {
        // Update cart count
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElements.forEach(el => el.textContent = totalItems);
        
        // Update cart items list
        cartItemsContainer.innerHTML = '';
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-shopping-cart text-4xl mb-2"></i>
                    <p>Your cart is empty</p>
                </div>
            `;
            checkoutBtn.disabled = true;
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'flex justify-between items-center py-4 border-b';
                cartItem.innerHTML = `
                    <div>
                        <h4 class="font-medium">${item.service}</h4>
                        <p class="text-gray-600 text-sm">$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="flex items-center">
                        <span class="font-medium mr-4">$${(item.price * item.quantity).toFixed(2)}</span>
                        <button class="remove-from-cart text-red-500 hover:text-red-700" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
            
            checkoutBtn.disabled = false;
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-from-cart').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart.splice(index, 1);
                    updateCart();
                });
            });
        }
        
        // Calculate totals
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + tax;
        
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTax.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    // Cart Modal Controls
    function openCartModal() {
        cartModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeCartModal() {
        cartModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Navigation cart link
    document.querySelectorAll('a[href="#cart"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openCartModal();
        });
    });

    closeCartBtn.addEventListener('click', closeCartModal);
    continueShoppingBtn.addEventListener('click', closeCartModal);

    // Checkout Modal
    const checkoutModal = document.getElementById('checkout-modal');
    const closeCheckoutBtn = document.getElementById('close-checkout');
    const checkoutTotal = document.getElementById('checkout-total');
    const checkoutForm = document.getElementById('checkout-form');

    checkoutBtn.addEventListener('click', function() {
        // Calculate total for checkout
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const tax = subtotal * 0.1;
        const total = subtotal + tax;
        
        checkoutTotal.textContent = `$${total.toFixed(2)}`;
        
        // Show checkout modal
        cartModal.classList.add('hidden');
        checkoutModal.classList.remove('hidden');
    });

    closeCheckoutBtn.addEventListener('click', function() {
        checkoutModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Checkout Form Submission
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send this data to your server
        const formData = new FormData(this);
        const orderData = {
            customer: {
                firstName: formData.get('first-name'),
                lastName: formData.get('last-name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                address: formData.get('address'),
                city: formData.get('city'),
                zip: formData.get('zip')
            },
            paymentMethod: formData.get('payment'),
            items: cart,
            subtotal: parseFloat(cartSubtotal.textContent.replace('$', '')),
            tax: parseFloat(cartTax.textContent.replace('$', '')),
            total: parseFloat(cartTotal.textContent.replace('$', ''))
        };
        
        // Send order to server (simulated with setTimeout)
        console.log('Order Data:', orderData);
        
        // Simulate API call
        setTimeout(() => {
            checkoutModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            
            // Show success message
            document.getElementById('success-message').textContent = 'Your order has been placed successfully!';
            document.getElementById('success-modal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Clear cart
            cart = [];
            updateCart();
        }, 1000);
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const messageData = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Send message to server (simulated with setTimeout)
        console.log('Message Data:', messageData);
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            document.getElementById('success-message').textContent = 'Your message has been sent successfully!';
            successModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            
            // Reset form
            contactForm.reset();
        }, 1000);
    });

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