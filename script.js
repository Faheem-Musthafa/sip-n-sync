// Populate events in the events grid
function populateEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    if (!eventsGrid) return;

    events.forEach(event => {
        const eventDate = new Date(event.date);
        const formattedDate = eventDate.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h3>${event.title}</h3>
                <p><i class="far fa-calendar"></i> ${formattedDate}</p>
                <p><i class="far fa-clock"></i> ${event.time}</p>
                <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
                <p>${event.description}</p>
                <p class="spots-left"><strong>${event.spots} spots available</strong></p>
                <button class="cta-button register-btn" onclick="registerForEvent('${event.title}')">Register Now</button>
            </div>
        `;
        
        eventsGrid.appendChild(eventCard);
    });
}

// Populate testimonials
function populateTestimonials() {
    const testimonialsContainer = document.getElementById('testimonials');
    if (!testimonialsContainer) return;

    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <img src="${testimonial.image}" alt="${testimonial.name}">
            <h3>${testimonial.name}</h3>
            <p class="testimonial-text">${testimonial.text}</p>
            <p class="testimonial-date">${testimonial.date}</p>
        `;
        
        testimonialsContainer.appendChild(testimonialCard);
    });
}

// Handle event registration
function registerForEvent(eventTitle) {
    const event = events.find(e => e.title === eventTitle);
    if (event && event.spots > 0) {
        event.spots--;
        updateEventSpots(eventTitle, event.spots);
        showNotification(`Successfully registered for ${eventTitle}!`);
    } else {
        showNotification('Sorry, this event is fully booked.', 'error');
    }
}

// Update available spots display
function updateEventSpots(eventTitle, spots) {
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        if (card.querySelector('h3').textContent === eventTitle) {
            card.querySelector('.spots-left').innerHTML = 
                `<strong>${spots} spots available</strong>`;
            
            if (spots === 0) {
                card.querySelector('.register-btn').disabled = true;
                card.querySelector('.register-btn').textContent = 'Fully Booked';
            }
        }
    });
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Handle newsletter subscription
function handleNewsletterSubmit(event) {
    event.preventDefault();
    const emailInput = event.target.querySelector('input[type="email"]');
    const email = emailInput.value;

    if (validateEmail(email)) {
        showNotification('Successfully subscribed to newsletter!');
        emailInput.value = '';
    } else {
        showNotification('Please enter a valid email address.', 'error');
    }
}

// Validate email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mobile navigation toggle
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    populateEvents();
    populateTestimonials();

    // Add event listeners
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    const hamburger = document.querySelector('.hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileNav);
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        if (navLinks && hamburger && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
});