// Trial page functionality
document.addEventListener('DOMContentLoaded', () => {
    const trialForm = document.getElementById('trialForm');
    const faqItems = document.querySelectorAll('.faq-item');

    // Form validation
    trialForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(trialForm);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        let isValid = true;
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'age', 'level', 'course', 'schedule'];
        
        requiredFields.forEach(field => {
            const input = trialForm.querySelector(`[name="${field}"]`);
            if (!data[field] || data[field].trim() === '') {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else {
                removeFieldError(input);
            }
        });
        
        // Email validation
        const emailInput = trialForm.querySelector('[name="email"]');
        if (data.email && !isValidEmail(data.email)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Phone validation
        const phoneInput = trialForm.querySelector('[name="phone"]');
        if (data.phone && !isValidPhone(data.phone)) {
            showFieldError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Terms agreement validation
        const termsCheckbox = trialForm.querySelector('[name="terms"]');
        if (!data.terms) {
            showFieldError(termsCheckbox, 'You must agree to the terms and conditions');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = trialForm.querySelector('.trial-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking Trial...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showSuccessMessage();
                trialForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    });

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Phone validation function
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }

    // Show field error
    function showFieldError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.field-error');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';
        
        input.style.borderColor = '#e74c3c';
    }

    // Remove field error
    function removeFieldError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        input.style.borderColor = '#e9ecef';
    }

    // Show success message
    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            text-align: center;
            z-index: 1000;
            max-width: 400px;
        `;
        
        successMessage.innerHTML = `
            <div style="color: #4CAF50; font-size: 3rem; margin-bottom: 1rem;">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3 style="color: #2c3e50; margin-bottom: 1rem;">Trial Class Booked!</h3>
            <p style="color: #6c757d; margin-bottom: 1.5rem;">
                Thank you for booking your free trial class. We'll contact you within 24 hours to confirm your schedule.
            </p>
            <button onclick="this.parentElement.remove()" style="
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 600;
            ">Close</button>
        `;
        
        document.body.appendChild(successMessage);
    }

    // Real-time validation
    const inputs = trialForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            const fieldName = input.name;
            
            if (fieldName === 'email' && value && !isValidEmail(value)) {
                showFieldError(input, 'Please enter a valid email address');
            } else if (fieldName === 'phone' && value && !isValidPhone(value)) {
                showFieldError(input, 'Please enter a valid phone number');
            } else if (value) {
                removeFieldError(input);
            }
        });
    });

    // FAQ Accordion functionality
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('open');
                const faqAnswer = faq.querySelector('.faq-answer');
                faqAnswer.style.maxHeight = '0';
            });
            
            // Open clicked item if it wasn't open
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Form animations
    const formContainer = document.querySelector('.trial-form-container');
    const trialCard = document.querySelector('.trial-card');
    
    if (formContainer) {
        formContainer.style.opacity = '0';
        formContainer.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            formContainer.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            formContainer.style.opacity = '1';
            formContainer.style.transform = 'translateY(0)';
        }, 200);
    }
    
    if (trialCard) {
        trialCard.style.opacity = '0';
        trialCard.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            trialCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            trialCard.style.opacity = '1';
            trialCard.style.transform = 'translateY(0)';
        }, 400);
    }

    // Course selection enhancement
    const courseSelect = trialForm.querySelector('[name="course"]');
    const levelSelect = trialForm.querySelector('[name="level"]');
    const ageSelect = trialForm.querySelector('[name="age"]');
    
    function updateCourseOptions() {
        const selectedAge = ageSelect.value;
        const selectedLevel = levelSelect.value;
        
        // Reset course options
        courseSelect.innerHTML = '<option value="">Select Course</option>';
        
        if (selectedAge && selectedLevel) {
            const courses = getCourseOptions(selectedAge, selectedLevel);
            courses.forEach(course => {
                const option = document.createElement('option');
                option.value = course.value;
                option.textContent = course.label;
                courseSelect.appendChild(option);
            });
        }
    }
    
    function getCourseOptions(age, level) {
        const courseMap = {
            '3-5': {
                'beginner': [
                    { value: 'kids-basic', label: 'Kids Basic French (Ages 3-5)' }
                ]
            },
            '6-8': {
                'beginner': [
                    { value: 'kids-basic', label: 'Kids Basic French (Ages 6-8)' }
                ],
                'elementary': [
                    { value: 'kids-intermediate', label: 'Kids Intermediate French (Ages 6-8)' }
                ]
            },
            '9-12': {
                'beginner': [
                    { value: 'kids-basic', label: 'Kids Basic French (Ages 9-12)' }
                ],
                'elementary': [
                    { value: 'kids-intermediate', label: 'Kids Intermediate French (Ages 9-12)' }
                ],
                'intermediate': [
                    { value: 'kids-advanced', label: 'Kids Advanced French (Ages 9-12)' }
                ]
            },
            '13-17': {
                'beginner': [
                    { value: 'teens-beginner', label: 'Teens Beginner French' }
                ],
                'elementary': [
                    { value: 'teens-intermediate', label: 'Teens Intermediate French' }
                ],
                'intermediate': [
                    { value: 'teens-advanced', label: 'Teens Advanced French' }
                ]
            },
            '18+': {
                'beginner': [
                    { value: 'adults-beginner', label: 'Adults Beginner French' }
                ],
                'elementary': [
                    { value: 'adults-intermediate', label: 'Adults Intermediate French' }
                ],
                'intermediate': [
                    { value: 'adults-business', label: 'Adults Business French' }
                ],
                'advanced': [
                    { value: 'adults-advanced', label: 'Adults Advanced French' }
                ]
            }
        };
        
        return courseMap[age]?.[level] || [];
    }
    
    ageSelect.addEventListener('change', updateCourseOptions);
    levelSelect.addEventListener('change', updateCourseOptions);

    // Character counter for message field
    const messageTextarea = trialForm.querySelector('[name="message"]');
    if (messageTextarea) {
        const charCounter = document.createElement('div');
        charCounter.className = 'char-counter';
        charCounter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #6c757d;
            margin-top: 0.25rem;
        `;
        messageTextarea.parentNode.appendChild(charCounter);
        
        function updateCharCounter() {
            const length = messageTextarea.value.length;
            const maxLength = 500;
            charCounter.textContent = `${length}/${maxLength} characters`;
            
            if (length > maxLength * 0.9) {
                charCounter.style.color = '#e74c3c';
            } else {
                charCounter.style.color = '#6c757d';
            }
        }
        
        messageTextarea.addEventListener('input', updateCharCounter);
        updateCharCounter();
    }

    // Smooth scroll to form
    const ctaButtons = document.querySelectorAll('a[href="#trialForm"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            trialForm.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to submit form
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            trialForm.dispatchEvent(new Event('submit'));
        }
        
        // Escape to clear form
        if (e.key === 'Escape') {
            trialForm.reset();
            const errorElements = trialForm.querySelectorAll('.field-error');
            errorElements.forEach(error => error.remove());
            
            const inputs = trialForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.style.borderColor = '#e9ecef';
            });
        }
    });

    // Form field focus effects
    const formFields = trialForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', () => {
            const formGroup = field.closest('.form-group');
            formGroup.style.transform = 'translateY(-2px)';
        });
        
        field.addEventListener('blur', () => {
            const formGroup = field.closest('.form-group');
            formGroup.style.transform = 'translateY(0)';
        });
    });

    // Testimonials animation
    const testimonialCards = document.querySelectorAll('.trial-testimonials .testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + (index * 200));
    });

    // FAQ animation
    const faqItemsAnimated = document.querySelectorAll('.trial-faq .faq-item');
    faqItemsAnimated.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 800 + (index * 100));
    });
});
