document.addEventListener('DOMContentLoaded', function() {
    // Retrieve search data from localStorage
    const searchData = JSON.parse(localStorage.getItem('searchData'));
    
    // Display search summary
    const searchSummary = document.getElementById('searchSummary');
    searchSummary.innerHTML = `
        <strong>Search Results for:</strong> ${searchData.from} to ${searchData.to} 
        on ${new Date(searchData.departureDate).toLocaleDateString()} 
        for ${searchData.passengers} passenger(s)
    `;

    // Mock flight data - in a real application, this would come from a server
    const flights = [
        {
            id: 1,
            airline: 'AirBooking Airways',
            from: searchData.from,
            to: searchData.to,
            departureTime: '08:00',
            arrivalTime: '10:00',
            price: 15000,
            seatsAvailable: 10
        },
        {
            id: 2,
            airline: 'AirBooking Express',
            from: searchData.from,
            to: searchData.to,
            departureTime: '12:00',
            arrivalTime: '14:00',
            price: 12000,
            seatsAvailable: 15
        },
        {
            id: 3,
            airline: 'AirBooking Premium',
            from: searchData.from,
            to: searchData.to,
            departureTime: '16:00',
            arrivalTime: '18:00',
            price: 18000,
            seatsAvailable: 5
        }
    ];

    // Display flights
    const flightsContainer = document.getElementById('flights');
    
    if (flights.length > 0) {
        flights.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'col-md-6 mb-4';
            flightCard.innerHTML = `
                <div class="card flight-card">
                    <div class="card-body">
                        <h5 class="card-title">${flight.airline}</h5>
                        <div class="d-flex justify-content-between mb-3">
                            <div>
                                <p class="mb-1"><strong>From:</strong> ${flight.from}</p>
                                <p class="mb-1"><strong>Departure:</strong> ${flight.departureTime}</p>
                            </div>
                            <div>
                                <p class="mb-1"><strong>To:</strong> ${flight.to}</p>
                                <p class="mb-1"><strong>Arrival:</strong> ${flight.arrivalTime}</p>
                            </div>
                        </div>
                        <p class="mb-2"><strong>Price:</strong> Rs. ${flight.price.toLocaleString()}</p>
                        <p class="mb-3"><strong>Available Seats:</strong> ${flight.seatsAvailable}</p>
                        <button onclick="selectFlight(${flight.id})" class="btn btn-primary">Select Flight</button>
                    </div>
                </div>
            `;
            flightsContainer.appendChild(flightCard);
        });
    } else {
        flightsContainer.innerHTML = '<div class="col-12"><div class="alert alert-info">No flights available for the selected criteria.</div></div>';
    }
});

function selectFlight(flightId) {
    // Save selected flight to localStorage
    localStorage.setItem('selectedFlightId', flightId);
    window.location.href = 'booking.html';
}
