document.addEventListener('DOMContentLoaded', function() {
    // Retrieve booking details from localStorage
    const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
    
    // Display confirmation details
    const confirmationDetails = document.getElementById('confirmationDetails');
    confirmationDetails.innerHTML = `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">Flight Details</h5>
                <p><strong>Airline:</strong> ${bookingDetails.flight.airline}</p>
                <p><strong>From:</strong> ${bookingDetails.flight.from} at ${bookingDetails.flight.departureTime}</p>
                <p><strong>To:</strong> ${bookingDetails.flight.to} at ${bookingDetails.flight.arrivalTime}</p>
                <p><strong>Date:</strong> ${new Date(JSON.parse(localStorage.getItem('searchData')).departureDate).toLocaleDateString()}</p>
            </div>
        </div>

        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">Passenger Details</h5>
                <p><strong>Name:</strong> ${bookingDetails.name}</p>
                <p><strong>Email:</strong> ${bookingDetails.email}</p>
                <p><strong>Phone:</strong> ${bookingDetails.phone}</p>
                <p><strong>Seat Number:</strong> ${bookingDetails.seatNumber}</p>
            </div>
        </div>

        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Payment Details</h5>
                <p><strong>Number of Passengers:</strong> ${bookingDetails.passengers}</p>
                <p><strong>Price per Passenger:</strong> Rs. ${bookingDetails.flight.price.toLocaleString()}</p>
                <p><strong>Total Amount Paid:</strong> Rs. ${bookingDetails.totalPrice.toLocaleString()}</p>
            </div>
        </div>
    `;

    // Clear localStorage data except user authentication
    localStorage.removeItem('searchData');
    localStorage.removeItem('selectedFlightId');
    localStorage.removeItem('bookingDetails');
});
