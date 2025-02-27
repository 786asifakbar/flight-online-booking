document.addEventListener('DOMContentLoaded', function() {
    // Check if user is already logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updateNavigation(true);
    }

    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.getElementById('rememberMe').checked;

            // Get registered users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store current user in localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    id: user.id,
                    fullName: user.fullName,
                    email: user.email,
                    phone: user.phone
                }));

                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                const loginError = document.getElementById('loginError');
                loginError.textContent = 'Invalid email or password';
                loginError.classList.remove('d-none');
            }
        });
    }

    // Handle registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Validate password
            if (password.length < 8) {
                showRegisterError('Password must be at least 8 characters long');
                return;
            }

            if (password !== confirmPassword) {
                showRegisterError('Passwords do not match');
                return;
            }

            // Get existing users
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if email already exists
            if (users.some(user => user.email === email)) {
                showRegisterError('Email already registered');
                return;
            }

            // Create new user
            const newUser = {
                id: Date.now(), // Simple way to generate unique ID
                fullName,
                email,
                phone,
                password
            };

            // Add user to storage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Auto login after registration
            localStorage.setItem('currentUser', JSON.stringify({
                id: newUser.id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone
            }));

            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
});

// Update navigation based on authentication status
function updateNavigation(isLoggedIn) {
    const navLinks = document.querySelector('.navbar-nav');
    if (isLoggedIn) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        navLinks.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" id="profileLink">${currentUser.fullName}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="logout()">Logout</a>
            </li>
        `;
    }
}

// Show registration error message
function showRegisterError(message) {
    const registerError = document.getElementById('registerError');
    registerError.textContent = message;
    registerError.classList.remove('d-none');
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}
// Function to load bookings and display them
function loadBookings() {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    const bookingList = document.getElementById('booking-items');
    bookingList.innerHTML = ''; // Clear existing items

    bookings.forEach((booking, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>Booking ID: ${booking.paymentId} - Amount: ${booking.amount}</span>
            <button class="btn btn-danger btn-sm" onclick="cancelBooking(${index})">Cancel Ticket</button>
        `;
        bookingList.appendChild(listItem);
    });
}

// Function to cancel a booking
function cancelBooking(index) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    if (confirm('Are you sure you want to cancel this ticket?')) {
        bookings.splice(index, 1); // Remove the booking
        localStorage.setItem('bookings', JSON.stringify(bookings)); // Update local storage
        loadBookings(); // Refresh the booking list
        alert('Your ticket has been canceled.');
    }
}

// Call loadBookings on page load
document.addEventListener('DOMContentLoaded', loadBookings);