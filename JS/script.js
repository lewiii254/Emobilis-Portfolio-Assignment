document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year Display in Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 2. Simple DOM Manipulation on Form Submission
    const contactForm = document.getElementById('contactForm');
    const introText = document.getElementById('intro-text');
    
    if (contactForm && introText) {
        contactForm.addEventListener('submit', function(event) {
            // Prevent the default form submission (page reload)
            event.preventDefault();
            
            // Get the button element
            const submitButton = document.getElementById('submitButton');
            
            // **DOM Manipulation Example:**
            // Change the text of the "Submit" button
            submitButton.textContent = 'Message Sent! (Check Console)';
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-success');
            
            // **DOM Manipulation Example 2:**
            // Change the text in the Hero section to confirm action
            introText.textContent = 'Thanks for reaching out! I will be in touch shortly.';

            // Log the form data to the console (as a real submission isn't set up)
            console.log('Form Submitted:');
            console.log('Name:', document.getElementById('name').value);
            console.log('Email:', document.getElementById('email').value);
            console.log('Message:', document.getElementById('message').value);

            // In a real application, you would send this data to a server here.
        });
    }

    // 3. Navigation Bar Shrink Effect (Using Bootstrap and JS for class toggling)
    const navbar = document.getElementById('mainNav');
    if (navbar) {
        const shrinkNav = () => {
            if (window.scrollY > 100) {
                // Add a class when scrolled down
                navbar.classList.add('navbar-shrink');
            } else {
                // Remove the class when at the top
                navbar.classList.remove('navbar-shrink');
            }
        };

        // Add the initial check
        shrinkNav();
        // Add the listener for scroll
        document.addEventListener('scroll', shrinkNav);
    }

    // 4. Smooth scroll for internal anchor links (enhanced UX for CTA buttons)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // If it's just a hash and target exists on page, let browser smooth scroll handle
            if (href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // close responsive nav (if open) by triggering bootstrap collapse
                    const navCollapse = document.querySelector('.navbar-collapse');
                    if (navCollapse && navCollapse.classList.contains('show')) {
                        // Use Bootstrap's collapse via a button click fallback
                        const toggler = document.querySelector('.navbar-toggler');
                        if (toggler) toggler.click();
                    }
                }
            }
        });
    });

    // 5. Reveal-on-scroll using IntersectionObserver for elements with .reveal
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length) {
        const obs = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach(el => obs.observe(el));
    } else {
        // Fallback: make all visible
        reveals.forEach(el => el.classList.add('visible'));
    }
});

