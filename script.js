function checkPassword() {
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    // Replace 'your_password' with the actual password stored in your JSON file.
    const storedPassword = 'Doorhandle';

    if (passwordInput.value === storedPassword) {
        window.location.href = 'homework.html'; // Redirect to the authenticated content page
    } else {
        errorMessage.textContent = 'Incorrect password. Please try again.';
    }
}
