/**
 * Feedback Page Script
 * This script handles the functionality for the feedback page including tab switching,
 * form validation, star rating system, and form submission.
 */

document.addEventListener('DOMContentLoaded', function() {
    initFeedbackPage();
});

/**
 * Initialize the Feedback page functionality
 */
function initFeedbackPage() {
    // Set up tab switching
    setupFeedbackTabs();
    
    // Set up star rating system
    setupStarRating();
    
    // Set up form validation and submission
    setupFeedbackForms();
    
    // Set up FAQ accordion
    setupFaqAccordion();
}

/**
 * Set up the feedback form tabs (General, Bug, Feature, Content)
 */
function setupFeedbackTabs() {
    const tabButtons = document.querySelectorAll('.feedback-tabs .tab-btn');
    const tabPanes = document.querySelectorAll('.feedback-tab');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab') + '-feedback';
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Set up the star rating system
 */
function setupStarRating() {
    const stars = document.querySelectorAll('.rating-stars i');
    const ratingText = document.querySelector('.rating-text');
    let selectedRating = 0;
    
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', function() {
            highlightStars(selectedRating);
        });
        
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-rating'));
            highlightStars(selectedRating);
            ratingText.textContent = `${selectedRating}/5`;
            
            // Add a hidden input with the rating value
            const ratingInput = document.getElementById('rating-value') || document.createElement('input');
            ratingInput.type = 'hidden';
            ratingInput.id = 'rating-value';
            ratingInput.name = 'rating';
            ratingInput.value = selectedRating;
            
            if (!document.getElementById('rating-value')) {
                document.querySelector('.rating-stars').appendChild(ratingInput);
            }
        });
    });
    
    function highlightStars(count) {
        stars.forEach(star => {
            const rating = parseInt(star.getAttribute('data-rating'));
            if (rating <= count) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }
}

/**
 * Set up form validation and submission for all feedback forms
 */
function setupFeedbackForms() {
    const forms = document.querySelectorAll('.feedback-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form
            if (validateForm(this)) {
                // Show success message
                submitForm(this);
            }
        });
    });
    
    // Set up file input validation
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            validateFileInput(this);
        });
    });
}

/**
 * Validate a feedback form
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
    let isValid = true;
    const requiredInputs = form.querySelectorAll('[required]');
    
    // Remove any existing error messages
    const existingErrors = form.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());
    
    // Check required fields
    requiredInputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        }
    });
    
    // Validate email fields
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        if (input.value.trim() && !validateEmail(input.value)) {
            showError(input, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    // Check if rating is selected (for general feedback)
    const ratingInput = document.getElementById('rating-value');
    const ratingStars = form.querySelector('.rating-stars');
    if (ratingStars && !ratingInput) {
        const ratingError = document.createElement('div');
        ratingError.className = 'error-message';
        ratingError.textContent = 'Please select a rating';
        ratingStars.parentNode.appendChild(ratingError);
        isValid = false;
    }
    
    return isValid;
}

/**
 * Show an error message for an input
 * @param {HTMLElement} input - The input with an error
 * @param {string} message - The error message
 */
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    formGroup.appendChild(error);
    input.classList.add('error');
    
    // Remove error when input changes
    input.addEventListener('input', function() {
        const errorElement = formGroup.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
            input.classList.remove('error');
        }
    }, { once: true });
}

/**
 * Validate an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate a file input
 * @param {HTMLInputElement} input - The file input to validate
 * @returns {boolean} - Whether the file is valid
 */
function validateFileInput(input) {
    const files = input.files;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/gif'];
    let isValid = true;
    
    // Remove any existing error messages
    const formGroup = input.closest('.form-group');
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // Check file size
            if (file.size > maxSize) {
                showError(input, `File "${file.name}" exceeds the maximum size of 5MB`);
                isValid = false;
                break;
            }
            
            // Check file type
            if (!allowedTypes.includes(file.type)) {
                showError(input, `File "${file.name}" is not a supported file type`);
                isValid = false;
                break;
            }
        }
    }
    
    return isValid;
}

/**
 * Submit a feedback form
 * @param {HTMLFormElement} form - The form to submit
 */
function submitForm(form) {
    // In a real application, this would send the form data to a server
    // For this demo, we'll just show a success message
    
    // Hide the form
    form.style.display = 'none';
    
    // Create and show success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div class="success-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h3>Thank You for Your Feedback!</h3>
        <p>We appreciate you taking the time to share your thoughts with us. Your feedback has been submitted successfully.</p>
        <p>A confirmation email has been sent to your email address.</p>
        <button class="btn primary-btn reset-form-btn">Submit Another Response</button>
    `;
    
    form.parentNode.appendChild(successMessage);
    
    // Add event listener to the reset button
    const resetButton = successMessage.querySelector('.reset-form-btn');
    resetButton.addEventListener('click', function() {
        // Remove success message
        successMessage.remove();
        
        // Reset and show the form
        form.reset();
        form.style.display = 'block';
        
        // Reset star rating if present
        const stars = form.querySelectorAll('.rating-stars i');
        if (stars.length > 0) {
            stars.forEach(star => {
                star.classList.remove('fas');
                star.classList.add('far');
            });
            
            const ratingText = form.querySelector('.rating-text');
            if (ratingText) {
                ratingText.textContent = '0/5';
            }
            
            const ratingInput = document.getElementById('rating-value');
            if (ratingInput) {
                ratingInput.remove();
            }
        }
    });
}

/**
 * Set up the FAQ accordion
 */
function setupFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon i');
        
        question.addEventListener('click', function() {
            // Toggle active class
            item.classList.toggle('active');
            
            // Toggle icon
            if (icon) {
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            }
            
            // Toggle answer visibility
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    });
}