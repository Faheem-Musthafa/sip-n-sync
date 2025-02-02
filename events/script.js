//Sample events data
const events = [
    {
        id: 1,
        title: "Be Mine..To Myself",
        about: "A playful twist on Valantine's Day",
        venue: "Orraice - Vengara",
        date: "14 Feb · 04:00 PM - 05:00 PM",
        seats: 10,
        applied: 0,
        attended: 0,
        isOpen: true
    },
    {
        id: 2,
        title: "Solo Synergy",
        about: "Unite with like-hearted individuals",
        venue: "Club Sulaimani - Kottakkal",
        date: "22 Feb · 02:30 AM - 04:00 PM",
        seats: 10,
        applied: 0,
        attended: 0,
        isOpen: true
    },
    {
        id: 3,
        title: "Pulse",
        about: "Elevate your brand,expand your reach",
        venue: "Noor Lake - Tirur",
        date: "28 Feb · 09:30 AM - 12:00 PM",
        seats: 15,
        applied: 4,
        attended: 0,
        isOpen: true
    }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const searchInput = document.getElementById('searchInput');
    const eventsList = document.getElementById('eventsList');
    const eventTemplate = document.getElementById('eventCardTemplate');

    // Render all events initially
    renderEvents(events);

    // Add search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredEvents = events.filter(event => 
            event.title.toLowerCase().includes(searchTerm) ||
            event.venue.toLowerCase().includes(searchTerm)
        );
        renderEvents(filteredEvents);
    });

    // Function to render events
    function renderEvents(eventsToRender) {
        eventsList.innerHTML = '';
        
        eventsToRender.forEach(event => {
            const eventCard = eventTemplate.content.cloneNode(true);
            
            // Fill in the event details
            if (!event.isOpen) {
                eventCard.querySelector('.registration-status').textContent = 'REGISTRATION CLOSED';
            } else {
                eventCard.querySelector('.registration-status').remove();
            }

            eventCard.querySelector('.event-title').textContent = event.title;
            eventCard.querySelector('.event-venue').textContent = event.venue;
            eventCard.querySelector('.event-date').textContent = event.date;
            eventCard.querySelector('.event-about').textContent= event.about;
            eventCard.querySelector('.event-stats').textContent = 
                `${event.seats} seats · ${event.applied} applied · ${event.attended} attended`;

            const registerButton = eventCard.querySelector('.register-button');
            if (!event.isOpen) {
                registerButton.remove();
            } else {
                registerButton.addEventListener('click', () => handleRegistration(event.id));
            }

            eventsList.appendChild(eventCard);
        });
    }

    // Handle registration
    function handleRegistration(eventId) {
        const event = events.find(e => e.id === eventId);
        if (event && event.isOpen && event.applied < event.seats) {
            event.applied++;
            renderEvents(events);
            alert('Registration successful!');
        } else {
            alert('Sorry, this event is full or registration is closed.');
        }
    }
});

// Back button functionality
document.querySelector('.back-button').addEventListener('click', () => {
    window.history.back();
});