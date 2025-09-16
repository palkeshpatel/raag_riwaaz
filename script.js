// DOM Elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const cartIcon = document.querySelector('.cart-icon');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const wishlistBtns = document.querySelectorAll('.wishlist');
const sizeBtns = document.querySelectorAll('.size-btn');
const qtyBtns = document.querySelectorAll('.qty-btn');
const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.product-image-placeholder');
const newsletterForms = document.querySelectorAll('.newsletter-form');

// Cart functionality
let cartCount = 0;
let cartItems = [];

// Update cart display
function updateCartDisplay() {
    cartIcon.textContent = `Cart (${cartCount})`;
}

// Add to cart functionality
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        cartCount++;
        updateCartDisplay();

        // Add visual feedback
        btn.style.backgroundColor = '#D4AF37';
        btn.textContent = 'Added to Cart!';

        setTimeout(() => {
            btn.style.backgroundColor = '';
            btn.textContent = 'Add to Cart';
        }, 2000);

        // Add to cart items array
        const productCard = btn.closest('.product-card') || btn.closest('.product-info');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;

        cartItems.push({
            name: productName,
            price: productPrice,
            quantity: 1
        });
    });
});

// Wishlist functionality
wishlistBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        // Toggle wishlist state
        if (btn.classList.contains('active')) {
            btn.classList.remove('active');
            btn.textContent = 'Add to Wishlist';
        } else {
            btn.classList.add('active');
            btn.textContent = 'Added to Wishlist';
        }
    });
});

// Size selection functionality
sizeBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all size buttons
        sizeBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
    });
});

// Quantity controls
qtyBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const quantitySpan = this.parentElement.querySelector('.quantity');
        let quantity = parseInt(quantitySpan.textContent);

        if (this.textContent === '+' && quantity < 10) {
            quantity++;
        } else if (this.textContent === '-' && quantity > 1) {
            quantity--;
        }

        quantitySpan.textContent = quantity;
    });
});

// Product image gallery functionality
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', function() {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active class to clicked thumbnail
        this.classList.add('active');

        // Get the thumbnail image source
        const thumbnailImg = this.querySelector('.thumbnail-img');
        if (thumbnailImg && mainImage) {
            // Change the main image source to match the clicked thumbnail
            mainImage.src = thumbnailImg.src;
            mainImage.alt = thumbnailImg.alt;
        }
    });
});

// Image zoom functionality for product images
document.querySelectorAll('.product-img').forEach(img => {
    img.addEventListener('click', function() {
        createImageZoomModal(this.src, this.alt);
    });
});

// Enhanced zoom functionality for product detail page
document.querySelectorAll('.product-main-img').forEach(img => {
    img.addEventListener('click', function() {
        createImageZoomModal(this.src, this.alt);
    });
});

if (mainImage) {
    mainImage.addEventListener('click', function() {
        createImageZoomModal(this.src, this.alt);
    });
}

// Create advanced image zoom modal function
function createImageZoomModal(imageSrc, imageAlt) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-zoom-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.95);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        backdrop-filter: blur(5px);
    `;

    // Create zoom container with fixed dimensions
    const zoomContainer = document.createElement('div');
    zoomContainer.style.cssText = `
        position: relative;
        width: 80vw;
        height: 80vh;
        max-width: 1000px;
        max-height: 800px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(255, 255, 255, 0.05);
        border-radius: 15px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        overflow: hidden;
    `;

    // Create image container for zoom functionality
    const imageContainer = document.createElement('div');
    imageContainer.style.cssText = `
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        cursor: grab;
    `;

    // Create zoomed image
    const zoomedImage = document.createElement('img');
    zoomedImage.src = imageSrc;
    zoomedImage.alt = imageAlt;
    zoomedImage.style.cssText = `
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 10px;
        transition: transform 0.3s ease;
        user-select: none;
        pointer-events: none;
    `;

    // Create close button
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: 20px;
        right: 20px;
        color: white;
        font-size: 2.5rem;
        cursor: pointer;
        z-index: 10001;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        transition: all 0.3s ease;
        border: 2px solid rgba(255, 255, 255, 0.2);
    `;

    // Create zoom controls panel
    const zoomPanel = document.createElement('div');
    zoomPanel.style.cssText = `
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 0.5rem;
        z-index: 10001;
        background-color: rgba(0, 0, 0, 0.8);
        padding: 10px 15px;
        border-radius: 25px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
    `;

    const zoomInBtn = document.createElement('button');
    zoomInBtn.innerHTML = '+';
    zoomInBtn.style.cssText = `
        background-color: var(--deep-maroon);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;

    const zoomOutBtn = document.createElement('button');
    zoomOutBtn.innerHTML = '−';
    zoomOutBtn.style.cssText = `
        background-color: var(--deep-maroon);
        color: white;
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    `;

    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = '⌂';
    resetBtn.style.cssText = `
        background-color: var(--gold);
        color: var(--deep-maroon);
        border: none;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        font-weight: bold;
    `;

    // Create zoom level indicator
    const zoomLevel = document.createElement('div');
    zoomLevel.style.cssText = `
        color: white;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        padding: 0 10px;
        font-family: var(--font-body);
    `;

    // Assemble modal
    imageContainer.appendChild(zoomedImage);
    zoomPanel.appendChild(zoomOutBtn);
    zoomPanel.appendChild(zoomLevel);
    zoomPanel.appendChild(zoomInBtn);
    zoomPanel.appendChild(resetBtn);
    zoomContainer.appendChild(imageContainer);
    zoomContainer.appendChild(closeBtn);
    zoomContainer.appendChild(zoomPanel);
    modal.appendChild(zoomContainer);
    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        zoomContainer.style.transform = 'scale(1)';
    }, 10);

    // Zoom and pan functionality
    let currentZoom = 1;
    let currentPanX = 0;
    let currentPanY = 0;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    const maxZoom = 4;
    const minZoom = 0.5;

    function updateImageTransform() {
        zoomedImage.style.transform = `translate(${currentPanX}px, ${currentPanY}px) scale(${currentZoom})`;
        zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
    }

    function resetPan() {
        currentPanX = 0;
        currentPanY = 0;
        updateImageTransform();
    }

    // Zoom controls
    zoomInBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentZoom < maxZoom) {
            currentZoom += 0.25;
            updateImageTransform();
        }
    });

    zoomOutBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentZoom > minZoom) {
            currentZoom -= 0.25;
            updateImageTransform();
        }
    });

    resetBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentZoom = 1;
        resetPan();
    });

    // Drag functionality
    imageContainer.addEventListener('mousedown', (e) => {
        if (currentZoom > 1) {
            isDragging = true;
            dragStartX = e.clientX - currentPanX;
            dragStartY = e.clientY - currentPanY;
            imageContainer.style.cursor = 'grabbing';
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            currentPanX = e.clientX - dragStartX;
            currentPanY = e.clientY - dragStartY;
            updateImageTransform();
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        imageContainer.style.cursor = currentZoom > 1 ? 'grab' : 'default';
    });

    // Touch support for mobile
    let lastTouchDistance = 0;

    imageContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            dragStartX = e.touches[0].clientX - currentPanX;
            dragStartY = e.touches[0].clientY - currentPanY;
        } else if (e.touches.length === 2) {
            const distance = Math.sqrt(
                Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
                Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
            );
            lastTouchDistance = distance;
        }
    });

    imageContainer.addEventListener('touchmove', (e) => {
        e.preventDefault();
        if (e.touches.length === 1 && isDragging) {
            currentPanX = e.touches[0].clientX - dragStartX;
            currentPanY = e.touches[0].clientY - dragStartY;
            updateImageTransform();
        } else if (e.touches.length === 2) {
            const distance = Math.sqrt(
                Math.pow(e.touches[0].clientX - e.touches[1].clientX, 2) +
                Math.pow(e.touches[0].clientY - e.touches[1].clientY, 2)
            );
            const scale = distance / lastTouchDistance;
            currentZoom = Math.min(maxZoom, Math.max(minZoom, currentZoom * scale));
            lastTouchDistance = distance;
            updateImageTransform();
        }
    });

    imageContainer.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Button hover effects
    [zoomInBtn, zoomOutBtn, resetBtn].forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'scale(1.1)';
            btn.style.backgroundColor = 'var(--gold)';
            btn.style.color = 'var(--deep-maroon)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'scale(1)';
            if (btn === resetBtn) {
                btn.style.backgroundColor = 'var(--gold)';
                btn.style.color = 'var(--deep-maroon)';
            } else {
                btn.style.backgroundColor = 'var(--deep-maroon)';
                btn.style.color = 'white';
            }
        });
    });

    closeBtn.addEventListener('mouseenter', () => {
        closeBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        closeBtn.style.transform = 'scale(1.1)';
    });

    closeBtn.addEventListener('mouseleave', () => {
        closeBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        closeBtn.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        closeBtn.style.transform = 'scale(1)';
    });

    // Close modal functionality
    const closeModal = () => {
        modal.style.opacity = '0';
        zoomContainer.style.transform = 'scale(0.8)';
        setTimeout(() => {
            if (document.body.contains(modal)) {
                document.body.removeChild(modal);
            }
        }, 300);
    };

    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard controls
    const handleKeydown = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleKeydown);
        } else if (e.key === '+' || e.key === '=') {
            if (currentZoom < maxZoom) {
                currentZoom += 0.25;
                updateImageTransform();
            }
        } else if (e.key === '-') {
            if (currentZoom > minZoom) {
                currentZoom -= 0.25;
                updateImageTransform();
            }
        } else if (e.key === '0') {
            currentZoom = 1;
            resetPan();
        } else if (e.key === 'ArrowLeft') {
            currentPanX += 20;
            updateImageTransform();
        } else if (e.key === 'ArrowRight') {
            currentPanX -= 20;
            updateImageTransform();
        } else if (e.key === 'ArrowUp') {
            currentPanY += 20;
            updateImageTransform();
        } else if (e.key === 'ArrowDown') {
            currentPanY -= 20;
            updateImageTransform();
        }
    };

    document.addEventListener('keydown', handleKeydown);

    // Initialize
    updateImageTransform();
}

// Newsletter form functionality
newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;

        if (email) {
            // Simulate successful subscription
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Subscribed!';
            submitBtn.style.backgroundColor = '#D4AF37';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '';
                this.reset();
            }, 3000);
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backgroundColor = '#FFFFFF';
        navbar.style.backdropFilter = 'none';
    }
});

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    });
});

// Feature card animations
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

// Observe feature cards for animation
document.querySelectorAll('.feature-card, .craft-item, .value-item, .team-member').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Mobile menu toggle functionality
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', function() {
        // Toggle active class on button
        this.classList.toggle('active');

        // Toggle active class on mobile menu
        mobileMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize cart display
updateCartDisplay();

// Add loading animation for images
document.querySelectorAll('.product-placeholder, .story-placeholder, .craft-placeholder').forEach(placeholder => {
    placeholder.style.opacity = '0';
    placeholder.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        placeholder.style.opacity = '1';
    }, Math.random() * 500);
});

// Add subtle animations to buttons
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Form validation
document.querySelectorAll('input[type="email"]').forEach(input => {
    input.addEventListener('blur', function() {
        const email = this.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            this.style.borderColor = '#C1440E';
            this.style.backgroundColor = '#FFF5F5';
        } else {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modals
        const modals = document.querySelectorAll('[style*="position: fixed"]');
        modals.forEach(modal => {
            if (modal.style.zIndex === '10000') {
                document.body.removeChild(modal);
            }
        });
    }
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '1';
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('.product-placeholder').forEach(img => {
        imageObserver.observe(img);
    });
}

// Cart Page Specific Functionality
const checkoutModal = document.getElementById('checkout-modal');
const closeModal = document.querySelector('.close-modal');
const checkoutBtn = document.querySelector('.checkout-btn');
const placeOrderBtn = document.querySelector('.place-order');
const backToCartBtn = document.querySelector('.back-to-cart');

// Open checkout modal
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        checkoutModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// Close modal functionality
if (closeModal) {
    closeModal.addEventListener('click', closeCheckoutModal);
}

if (backToCartBtn) {
    backToCartBtn.addEventListener('click', closeCheckoutModal);
}

// Close modal when clicking outside
if (checkoutModal) {
    checkoutModal.addEventListener('click', function(e) {
        if (e.target === checkoutModal) {
            closeCheckoutModal();
        }
    });
}

function closeCheckoutModal() {
    checkoutModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Place order functionality
if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // Simulate order processing
        placeOrderBtn.textContent = 'Processing...';
        placeOrderBtn.disabled = true;

        setTimeout(() => {
            placeOrderBtn.textContent = 'Order Placed!';
            placeOrderBtn.style.backgroundColor = '#D4AF37';

            setTimeout(() => {
                closeCheckoutModal();
                // Reset button
                placeOrderBtn.textContent = 'Place Order';
                placeOrderBtn.disabled = false;
                placeOrderBtn.style.backgroundColor = '';

                // Clear cart
                cartCount = 0;
                cartItems = [];
                updateCartDisplay();

                // Show success message
                alert('Order placed successfully! You will receive a confirmation email shortly.');
            }, 2000);
        }, 3000);
    });
}

// Cart item controls
document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
        const cartItem = this.closest('.cart-item');
        cartItem.style.opacity = '0';
        cartItem.style.transform = 'translateX(-100%)';

        setTimeout(() => {
            cartItem.remove();
            updateCartCount();
        }, 300);
    });
});

// Update cart count display
function updateCartCount() {
    const itemCount = document.querySelector('.item-count');
    const cartItems = document.querySelectorAll('.cart-item');
    if (itemCount) {
        itemCount.textContent = `${cartItems.length} items`;
    }
}

// Continue shopping button
const continueShoppingBtn = document.querySelector('.continue-shopping');
if (continueShoppingBtn) {
    continueShoppingBtn.addEventListener('click', function() {
        window.location.href = 'shop.html';
    });
}

// Shop Page Functionality
const categoryFilter = document.getElementById('category-filter');
const sizeFilter = document.getElementById('size-filter');
const priceFilter = document.getElementById('price-filter');
const sortFilter = document.getElementById('sort-filter');
const viewBtns = document.querySelectorAll('.view-btn');
const productsContainer = document.getElementById('products-container');
const loadMoreBtn = document.querySelector('.load-more');

// Filter functionality
if (categoryFilter) {
    categoryFilter.addEventListener('change', filterProducts);
}

if (sizeFilter) {
    sizeFilter.addEventListener('change', filterProducts);
}

if (priceFilter) {
    priceFilter.addEventListener('change', filterProducts);
}

if (sortFilter) {
    sortFilter.addEventListener('change', sortProducts);
}

function filterProducts() {
    const category = categoryFilter.value;
    const size = sizeFilter.value;
    const price = priceFilter.value;

    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        let show = true;

        // Category filter
        if (category !== 'all' && product.dataset.category !== category) {
            show = false;
        }

        // Size filter
        if (size !== 'all' && product.dataset.size !== size) {
            show = false;
        }

        // Price filter
        if (price !== 'all') {
            const productPrice = parseInt(product.dataset.price);
            const [min, max] = price.split('-').map(p => p.replace(/[^\d]/g, '')).map(Number);

            if (price.endsWith('+')) {
                if (productPrice < min) show = false;
            } else if (max) {
                if (productPrice < min || productPrice > max) show = false;
            }
        }

        product.style.display = show ? 'block' : 'none';
    });
}

function sortProducts() {
    const sortBy = sortFilter.value;
    const container = productsContainer;
    const products = Array.from(container.querySelectorAll('.product-card'));

    products.sort((a, b) => {
        switch (sortBy) {
            case 'price-low':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-high':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'newest':
                return Math.random() - 0.5; // Simulate newest first
            case 'popular':
                return Math.random() - 0.5; // Simulate popularity
            default:
                return 0;
        }
    });

    products.forEach(product => container.appendChild(product));
}

// View toggle functionality
viewBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        viewBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const view = this.dataset.view;
        const products = document.querySelectorAll('.product-card');

        products.forEach(product => {
            if (view === 'list') {
                product.style.display = 'flex';
                product.style.flexDirection = 'row';
                product.style.alignItems = 'center';
                product.querySelector('.product-image').style.width = '200px';
                product.querySelector('.product-image').style.height = '150px';
            } else {
                product.style.display = 'block';
                product.style.flexDirection = 'column';
                product.querySelector('.product-image').style.width = '100%';
                product.querySelector('.product-image').style.height = '300px';
            }
        });
    });
});

// Load more functionality
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // Simulate loading more products
        this.textContent = 'Loading...';
        this.disabled = true;

        setTimeout(() => {
            this.textContent = 'Load More Products';
            this.disabled = false;

            // Add more products (simulated)
            const newProducts = document.createElement('div');
            newProducts.innerHTML = `
                <div class="product-card" data-category="kurtas" data-price="3800" data-size="l">
                    <div class="product-image">
                        <div class="product-placeholder heritage-pattern">
                            <div class="product-badge">New</div>
                            <div class="product-overlay">
                                <span>Heritage Kurta</span>
                                <p>Emerald Collection</p>
                            </div>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>Heritage Kurta - Emerald</h3>
                        <p class="product-category">Premium Kurta</p>
                        <p class="product-price">₹3,800</p>
                        <div class="product-actions">
                            <a href="products.html" class="btn-outline">View Details</a>
                            <button class="btn-primary add-to-cart">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;

            productsContainer.appendChild(newProducts.firstElementChild);
        }, 1500);
    });
}

// Policies Page Functionality
const policyLinks = document.querySelectorAll('.policy-link');

policyLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Remove active class from all links
        policyLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');

        // Scroll to section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Discount code functionality
const applyDiscountBtn = document.querySelector('.apply-discount');
const discountCodeInput = document.querySelector('.discount-code');

if (applyDiscountBtn && discountCodeInput) {
    applyDiscountBtn.addEventListener('click', function() {
        const code = discountCodeInput.value.trim();

        if (code === 'WELCOME10') {
            // Apply 10% discount
            const subtotalElement = document.querySelector('.summary-line:nth-child(2) span:last-child');
            const totalElement = document.querySelector('.summary-line.total span:last-child');

            if (subtotalElement && totalElement) {
                const subtotal = parseInt(subtotalElement.textContent.replace(/[^\d]/g, ''));
                const discount = Math.round(subtotal * 0.1);
                const newTotal = subtotal - discount + 2640; // Add tax back

                // Add discount line
                const discountLine = document.createElement('div');
                discountLine.className = 'summary-line';
                discountLine.innerHTML = `
                    <span>Discount (WELCOME10)</span>
                    <span style="color: var(--olive-green);">-₹${discount.toLocaleString()}</span>
                `;

                const totalLine = document.querySelector('.summary-line.total');
                totalLine.parentNode.insertBefore(discountLine, totalLine);

                totalElement.textContent = `₹${newTotal.toLocaleString()}`;

                discountCodeInput.style.borderColor = 'var(--olive-green)';
                this.textContent = 'Applied!';
                this.style.backgroundColor = 'var(--olive-green)';
            }
        } else {
            discountCodeInput.style.borderColor = 'var(--rust)';
            discountCodeInput.style.backgroundColor = '#FFF5F5';
            this.textContent = 'Invalid Code';
            this.style.backgroundColor = 'var(--rust)';

            setTimeout(() => {
                discountCodeInput.style.borderColor = '';
                discountCodeInput.style.backgroundColor = '';
                this.textContent = 'Apply';
                this.style.backgroundColor = '';
            }, 3000);
        }
    });
}

// Shipping option updates
const shippingOptions = document.querySelectorAll('input[name="shipping"]');
const totalElement = document.querySelector('.summary-line.total span:last-child');

shippingOptions.forEach(option => {
    option.addEventListener('change', function() {
        const shippingPrice = parseInt(this.nextElementSibling.querySelector('.shipping-price').textContent.replace(/[^\d]/g, '')) || 0;
        const subtotal = parseInt(document.querySelector('.summary-line:nth-child(2) span:last-child').textContent.replace(/[^\d]/g, ''));
        const tax = 2640; // Fixed tax amount
        const newTotal = subtotal + shippingPrice + tax;

        if (totalElement) {
            totalElement.textContent = `₹${newTotal.toLocaleString()}`;
        }
    });
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes modals
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal[style*="block"]');
        if (openModal) {
            closeCheckoutModal();
        }
    }

    // Enter key submits forms
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        const form = e.target.closest('form');
        if (form) {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.click();
            }
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;

        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#D4AF37';

            // Reset form
            setTimeout(() => {
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';

                // Show success message
                showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
            }, 2000);
        }, 1500);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--olive-green)' : type === 'error' ? 'var(--rust)' : 'var(--deep-maroon)'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Map functionality for contact page
function openInMaps() {
    // Open Google Maps with the studio address
    const address = "123 Heritage Lane, Connaught Place, New Delhi, 110001, India";
    const encodedAddress = encodeURIComponent(address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
}

function getDirections() {
    // Open Google Maps with directions to the studio
    const address = "123 Heritage Lane, Connaught Place, New Delhi, 110001, India";
    const encodedAddress = encodeURIComponent(address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(directionsUrl, '_blank');
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart count
    updateCartCount();

    // Add loading states to buttons
    document.querySelectorAll('button').forEach(btn => {
        if (!btn.disabled) {
            btn.addEventListener('click', function() {
                if (this.classList.contains('btn-primary') || this.classList.contains('btn-secondary')) {
                    this.style.transform = 'scale(0.98)';
                    setTimeout(() => {
                        this.style.transform = '';
                    }, 150);
                }
            });
        }
    });
});
