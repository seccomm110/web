document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'seccomm110' && password === 'Sec.Comm110') {
        // Redirect to main.html if credentials are correct
        window.location.href = 'main.html';
    } else {
        // Show error message if credentials are incorrect
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'block';
    }
});
