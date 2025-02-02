// Get all screens
const welcomeScreen = document.getElementById('welcomeScreen');
const loginScreen = document.getElementById('loginScreen');
const signupScreen = document.getElementById('signupScreen');

// Functions to show different screens
function showWelcome() {
    hideAllScreens();
    welcomeScreen.classList.remove('hidden');
    welcomeScreen.classList.add('fade-in');
}

function showLogin() {
    hideAllScreens();
    loginScreen.classList.remove('hidden');
    loginScreen.classList.add('fade-in');
}

function showSignup() {
    hideAllScreens();
    signupScreen.classList.remove('hidden');
    signupScreen.classList.add('fade-in');
}

// Helper function to hide all screens
function hideAllScreens() {
    welcomeScreen.classList.add('hidden');
    loginScreen.classList.add('hidden');
    signupScreen.classList.add('hidden');
    
    welcomeScreen.classList.remove('fade-in');
    loginScreen.classList.remove('fade-in');
    signupScreen.classList.remove('fade-in');
}

// Form submission handling
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted');
});

document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your signup logic here
    console.log('Signup form submitted');
});

// Initialize with welcome screen
showWelcome();