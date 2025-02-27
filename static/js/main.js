// Set minimum date for departure date input
document.addEventListener('DOMContentLoaded', function() {
    const departureDateInput = document.getElementById('departureDate');
    if (departureDateInput) {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format date as YYYY-MM-DD
        const formattedDate = tomorrow.toISOString().split('T')[0];
        departureDateInput.setAttribute('min', formattedDate);
    }

    // Handle search form submission
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const searchData = {
                from: document.getElementById('from').value,
                to: document.getElementById('to').value,
                departureDate: document.getElementById('departureDate').value,
                passengers: document.getElementById('passengers').value
            };

            // Save search data to localStorage
            localStorage.setItem('searchData', JSON.stringify(searchData));

            // Redirect to results page
            window.location.href = 'results.html';
        });
    }
});
