document.addEventListener('DOMContentLoaded', function() {
    // Retrieve flight and search data
    const selectedFlightId = parseInt(localStorage.getItem('selectedFlightId'));
    const searchData = JSON.parse(localStorage.getItem('searchData'));

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

    const selectedFlight = flights.find(f => f.id === selectedFlightId);

    // Display flight details
    const flightDetails = document.getElementById('flightDetails');
    flightDetails.innerHTML = `
        <h4>${selectedFlight.airline}</h4>
        <p><strong>From:</strong> ${selectedFlight.from} at ${selectedFlight.departureTime}</p>
        <p><strong>To:</strong> ${selectedFlight.to} at ${selectedFlight.arrivalTime}</p>
        <p><strong>Price:</strong> Rs. ${selectedFlight.price.toLocaleString()}</p>
        <p><strong>Passengers:</strong> ${searchData.passengers}</p>
        <p><strong>Total Price:</strong> Rs. ${(selectedFlight.price * parseInt(searchData.passengers)).toLocaleString()}</p>
    `;

    // Generate seat options
    const seatSelect = document.getElementById('seatNumber');
    for (let i = 1; i <= selectedFlight.seatsAvailable; i++) {
        const option = document.createElement('option');
        option.value = `${i}A`;
        option.textContent = `Seat ${i}A`;
        seatSelect.appendChild(option);
    }

    // Handle booking form submission
    const bookingForm = document.getElementById('bookingForm');
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const bookingDetails = {
            flightId: selectedFlightId,
            flight: selectedFlight,
            passengers: searchData.passengers,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            seatNumber: document.getElementById('seatNumber').value,
            totalPrice: selectedFlight.price * parseInt(searchData.passengers)
        };

        // Save booking details to localStorage
        localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

        // Redirect to confirmation page
        window.location.href = 'confirmation.html';
    });
});
