document.addEventListener('DOMContentLoaded', function() {
    // Set minimum date for departure date input
    const departureDateInput = document.getElementById('departureDate');
    const today = new Date().toISOString().split('T')[0];
    departureDateInput.setAttribute('min', today);
    departureDateInput.value = today;

    // Initialize search form
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', handleSearch);
    }

    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initialize popular destinations
    initializeDestinations();
});

// Handle search form submission
function handleSearch(e) {
    e.preventDefault();
    
    // Show loading state
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<div class="loading d-inline-block"></div> Searching...';
    submitButton.disabled = true;

    // Get form values
    const searchData = {
        from: document.getElementById('from').value,
        to: document.getElementById('to').value,
        date: document.getElementById('departureDate').value,
        passengers: document.getElementById('passengers').value
    };

    // Store search data
    localStorage.setItem('searchData', JSON.stringify(searchData));

    // Simulate loading (remove in production)
    setTimeout(() => {
        window.location.href = 'results.html';
    }, 1000);
}

// Passenger count handlers
function incrementPassengers() {
    const input = document.getElementById('passengers');
    input.value = parseInt(input.value) + 1;
    updatePassengerCount();
}

function decrementPassengers() {
    const input = document.getElementById('passengers');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
        updatePassengerCount();
    }
}

function updatePassengerCount() {
    const input = document.getElementById('passengers');
    // Ensure value is within bounds
    if (parseInt(input.value) < 1) input.value = 1;
    if (parseInt(input.value) > 9) input.value = 9;
}

// Initialize popular destinations with hover effects
function initializeDestinations() {
    const destinations = document.querySelectorAll('.destination-card');
    
    destinations.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });

        // Add click handler
        card.addEventListener('click', function() {
            const city = this.querySelector('.card-title').textContent;
            document.getElementById('to').value = city;
            document.getElementById('searchForm').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Theme toggle (if implemented)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Check for saved theme preference
const savedTheme = localStorage.getItem('darkMode');
if (savedTheme === 'true') {
    document.body.classList.add('dark-mode');
}

// Auto-complete for city inputs (mock implementation)
const popularCities = [
    'New York', 'London', 'Dubai', 'Paris', 'Tokyo', 
    'Singapore', 'Hong Kong', 'Sydney', 'Mumbai', 'Toronto'
];

function initializeAutocomplete() {
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');

    [fromInput, toInput].forEach(input => {
        input.addEventListener('input', function() {
            const value = this.value.toLowerCase();
            const matches = popularCities.filter(city => 
                city.toLowerCase().includes(value)
            );

            // Show suggestions (implement your own UI for this)
            console.log('Suggestions:', matches);
        });
    });
}
