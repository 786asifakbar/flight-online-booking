// Initialize Stripe
const stripe = Stripe('pk_test_YOUR_STRIPE_PUBLIC_KEY');
const elements = stripe.elements();

// Create card element
const cardElement = elements.create('card', {
    style: {
        base: {
            fontSize: '16px',
            color: '#32325d',
        }
    }
});

// Mount card element
cardElement.mount('#card-element');

// Handle card errors
cardElement.on('change', function(event) {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
        displayError.textContent = event.error.message;
        displayError.classList.remove('d-none');
    } else {
        displayError.textContent = '';
        displayError.classList.add('d-none');
    }
});

// Handle form submission
const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Disable the submit button to prevent double submission
    const submitButton = form.querySelector('button');
    submitButton.disabled = true;

    try {
        const {paymentMethod, error} = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
            errorElement.classList.remove('d-none');
            submitButton.disabled = false;
            return;
        }

        // Send paymentMethod.id to your server
        // In a real application, you would process the payment on your server
        // For demo purposes, we'll simulate a successful payment
        handlePaymentSuccess(paymentMethod);

    } catch (error) {
        console.error('Error:', error);
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = 'An unexpected error occurred.';
        errorElement.classList.remove('d-none');
        submitButton.disabled = false;
    }
});

// PayPal integration
paypal.Buttons({
    createOrder: function(data, actions) {
        // Get total amount from page
        const amount = document.getElementById('total-amount').textContent.replace('$', '');
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: amount
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            handlePaymentSuccess({ id: details.id, type: 'paypal' });
        });
    }
}).render('#paypal-button-container');

// Handle successful payment
function handlePaymentSuccess(paymentMethod) {
    // Save booking details to localStorage
    const bookingDetails = {
        paymentId: paymentMethod.id,
        paymentType: paymentMethod.type,
        amount: document.getElementById('total-amount').textContent,
        timestamp: new Date().toISOString(),
        status: 'confirmed'
    };

    // Store booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(bookingDetails);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
}

// Load booking details
document.addEventListener('DOMContentLoaded', () => {
    const bookingData = JSON.parse(localStorage.getItem('currentBooking') || '{}');
    if (bookingData.total) {
        document.getElementById('flight-total').textContent = `$${bookingData.total}`;
        document.getElementById('taxes').textContent = `$${(bookingData.total * 0.1).toFixed(2)}`;
        const totalAmount = (parseFloat(bookingData.total) * 1.1).toFixed(2);
        document.getElementById('total-amount').textContent = `$${totalAmount}`;
    }
});