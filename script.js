// 1. Smooth Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 2. Navigation "Book Now" Button (Scrolls down to the form instead of alerting)
document.querySelectorAll('.btn-nav, .hero .btn-gold').forEach(button => {
    button.addEventListener('click', (e) => {
        const bookingSection = document.querySelector('.booking-section');
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 3. Formspree AJAX Submission & Success Page Trigger
const appointmentForm = document.getElementById('appointmentForm');
const successModal = document.getElementById('successModal');
const closeSuccessBtn = document.getElementById('closeSuccessBtn');

if (appointmentForm && successModal) {
    appointmentForm.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        const submitButton = appointmentForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.innerText;
        
        submitButton.innerText = "PROCESSING...";
        submitButton.disabled = true;

        const formData = new FormData(appointmentForm);

        try {
            const response = await fetch(appointmentForm.action, {
                method: appointmentForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // SUCCESS: Open the sleek success display page
                successModal.classList.add('active');
                appointmentForm.reset();
            } else {
                const data = await response.json();
                if (Object.hasOwn(data, 'errors')) {
                    alert(data.errors.map(error => error.message).join(", "));
                } else {
                    alert("Oops! There was a problem submitting your form. Please try again.");
                }
            }
        } catch (error) {
            alert("Network error. Please check your internet connection and try again.");
        } finally {
            submitButton.innerText = originalButtonText;
            submitButton.disabled = false;
        }
    });

    // Close the success screen when clicking the button
    closeSuccessBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });
}



// Mobile Hamburger Navigation Overlay Logic
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.nav-links-mobile a, .btn-nav-mobile');

if (hamburgerBtn && mobileMenu) {
    // Open/Close menu overlay when clicking the hamburger button
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        
        // Prevent body from scrolling behind menu when active
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : 'initial';
    });

    // Close menu drawer instantly when any link inside is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerBtn.classList.remove('open');
            mobileMenu.classList.remove('remove');
            mobileMenu.classList.remove('open');
            document.body.style.overflow = 'initial';

            // Smooth scroll anchor targeting logic
            if(link.getAttribute('href')) {
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if(targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else if (link.classList.contains('btn-nav-mobile')) {
                // If it's the Mobile Book Now button, route directly to the form
                const bookingSection = document.querySelector('.booking-section');
                if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}


// Interactive Gallery Lightbox Logic
function openLightbox(imageSrc) {
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (lightbox && lightboxImg) {
        lightboxImg.src = imageSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Lock background scrolling
        
        // Minor delay to let scale animation play cleanly
        setTimeout(() => {
            lightboxImg.style.transform = 'scale(1)';
        }, 10);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (lightbox && lightboxImg) {
        lightboxImg.style.transform = 'scale(0.9)';
        lightbox.style.display = 'none';
        document.body.style.overflow = 'initial'; // Re-enable background scrolling
    }
}