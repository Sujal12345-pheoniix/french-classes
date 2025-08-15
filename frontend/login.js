// Login page functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');

    // Password toggle functionality
    passwordToggle.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = passwordToggle.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });

    // Form validation
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;
        
        // Email validation
        if (!email) {
            showError(emailInput, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        } else {
            removeError(emailInput);
        }
        
        // Password validation
        if (!password) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
            isValid = false;
        } else {
            removeError(passwordInput);
        }
        
        if (isValid) {
            // Simulate login process
            const loginBtn = loginForm.querySelector('.login-btn');
            const originalText = loginBtn.innerHTML;
            
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
            loginBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // For demo purposes, redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 2000);
        }
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Show error message
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';
        
        input.style.borderColor = '#e74c3c';
    }

    // Remove error message
    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '#e9ecef';
    }

    // Real-time validation
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();
        if (email && !isValidEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
        } else if (email) {
            removeError(emailInput);
        }
    });

    passwordInput.addEventListener('blur', () => {
        const password = passwordInput.value.trim();
        if (password && password.length < 6) {
            showError(passwordInput, 'Password must be at least 6 characters');
        } else if (password) {
            removeError(passwordInput);
        }
    });

    // Social login buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const buttonText = button.querySelector('span').textContent;
            const loginBtn = button;
            const originalText = loginBtn.innerHTML;
            
            loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            loginBtn.disabled = true;
            
            // Simulate social login
            setTimeout(() => {
                alert(`${buttonText} login is not implemented in this demo. Please use the regular login form.`);
                loginBtn.innerHTML = originalText;
                loginBtn.disabled = false;
            }, 1500);
        });
    });

    // Forgot password functionality
    const forgotPasswordLink = document.querySelector('.forgot-password');
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        
        const email = prompt('Please enter your email address to reset your password:');
        if (email) {
            if (isValidEmail(email)) {
                alert('Password reset link has been sent to your email address.');
            } else {
                alert('Please enter a valid email address.');
            }
        }
    });

    // Remember me functionality
    const rememberCheckbox = document.getElementById('remember');
    rememberCheckbox.addEventListener('change', () => {
        if (rememberCheckbox.checked) {
            // Store user preference
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('rememberMe');
        }
    });

    // Check if user previously selected "Remember me"
    if (localStorage.getItem('rememberMe') === 'true') {
        rememberCheckbox.checked = true;
    }

    // Input focus effects
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            const formGroup = input.closest('.form-group');
            formGroup.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', () => {
            const formGroup = input.closest('.form-group');
            formGroup.style.transform = 'translateY(0)';
        });
    });

    // Form animation on load
    const formContainer = document.querySelector('.login-form-container');
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        formContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        formContainer.style.opacity = '1';
        formContainer.style.transform = 'translateY(0)';
    }, 100);

    // Login card animation
    const loginCard = document.querySelector('.login-card');
    loginCard.style.opacity = '0';
    loginCard.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        loginCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        loginCard.style.opacity = '1';
        loginCard.style.transform = 'translateY(0)';
    }, 300);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            loginForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            loginForm.reset();
            removeError(emailInput);
            removeError(passwordInput);
        }
    });

    // Auto-fill detection
    const observer = new MutationObserver(() => {
        if (emailInput.value && passwordInput.value) {
            // Form is auto-filled
            removeError(emailInput);
            removeError(passwordInput);
        }
    });

    observer.observe(loginForm, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['value']
    });
});
