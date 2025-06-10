/**
 * QUARYNOX - Main JavaScript File
 * This file contains all the interactive functionality for the QUARYNOX educational platform
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    initMobileMenu();
    
    // Testimonials Slider
    initTestimonialsSlider();
    
    // FAQ Accordion
    initFaqAccordion();
    
    // Tab Switching
    initTabSwitching();
    
    // Form Validation
    initFormValidation();
    
    // Tool Filters
    initToolFilters();
    
    // Calculator Functionality
    initCalculators();
    
    // Unit Converter Functionality
    initUnitConverters();
    
    // Citation Generator
    initCitationGenerator();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Scroll to Top Button
    initScrollToTop();
});

/**
 * Initialize Mobile Menu Functionality
 */
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const closeMenuBtn = document.querySelector('.close-menu');
    const overlay = document.querySelector('.overlay');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.add('active');
            if (overlay) overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function() {
            navLinks.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close menu when clicking on a link
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            navLinks.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Initialize Testimonials Slider
 */
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    if (!slider) return;
    
    let currentIndex = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    const testimonialCount = testimonials.length;
    
    // Set initial active dot
    if (dots.length > 0) {
        dots[0].classList.add('active');
    }
    
    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex - 1 + testimonialCount) % testimonialCount;
            updateSlider();
        });
    }
    
    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex + 1) % testimonialCount;
            updateSlider();
        });
    }
    
    // Dot navigation
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentIndex = index;
                updateSlider();
            });
        });
    }
    
    // Auto slide every 5 seconds
    let autoSlide = setInterval(function() {
        currentIndex = (currentIndex + 1) % testimonialCount;
        updateSlider();
    }, 5000);
    
    // Pause auto slide on hover
    slider.addEventListener('mouseenter', function() {
        clearInterval(autoSlide);
    });
    
    slider.addEventListener('mouseleave', function() {
        autoSlide = setInterval(function() {
            currentIndex = (currentIndex + 1) % testimonialCount;
            updateSlider();
        }, 5000);
    });
    
    // Update slider position and active dot
    function updateSlider() {
        const scrollPosition = testimonials[currentIndex].offsetLeft - slider.offsetLeft;
        slider.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        if (dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[currentIndex].classList.add('active');
        }
    }
}

/**
 * Initialize FAQ Accordion
 */
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Toggle current item
                item.classList.toggle('active');
                
                // Close other items (uncomment for accordion behavior)
                // faqItems.forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.classList.remove('active');
                //     }
                // });
            });
        }
    });
}

/**
 * Initialize Tab Switching
 */
function initTabSwitching() {
    // Function to handle tab switching
    function setupTabs(tabBtnsSelector, tabsSelector) {
        const tabBtns = document.querySelectorAll(tabBtnsSelector);
        const tabs = document.querySelectorAll(tabsSelector);
        
        if (tabBtns.length === 0 || tabs.length === 0) return;
        
        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons and tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to current button and tab
                btn.classList.add('active');
                tabs[index].classList.add('active');
            });
        });
    }
    
    // Setup different tab systems
    setupTabs('.calculator-tabs .tab-btn', '.calculator-tab');
    setupTabs('.converter-tabs .tab-btn', '.converter-tab');
    setupTabs('.citation-tabs .tab-btn', '.citation-tab');
    setupTabs('.feedback-tabs .tab-btn', '.feedback-tab');
}

/**
 * Initialize Form Validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            let isValid = true;
            
            // Get all required inputs
            const requiredInputs = form.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                // Remove previous error messages
                const existingError = input.parentElement.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                // Check if input is empty
                if (!input.value.trim()) {
                    isValid = false;
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.style.color = 'var(--error-color)';
                    errorMessage.style.fontSize = '0.875rem';
                    errorMessage.style.marginTop = '0.25rem';
                    errorMessage.textContent = 'This field is required';
                    input.parentElement.appendChild(errorMessage);
                }
                
                // Email validation
                if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.style.color = 'var(--error-color)';
                        errorMessage.style.fontSize = '0.875rem';
                        errorMessage.style.marginTop = '0.25rem';
                        errorMessage.textContent = 'Please enter a valid email address';
                        input.parentElement.appendChild(errorMessage);
                    }
                }
            });
            
            // Prevent form submission if validation fails
            if (!isValid) {
                event.preventDefault();
            }
        });
    });
}

/**
 * Initialize Tool Filters
 */
function initToolFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const resultItems = document.querySelectorAll('.result-item');
    
    if (filterBtns.length === 0 || resultItems.length === 0) return;
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = btn.getAttribute('data-filter');
            
            // Toggle active class on button
            btn.classList.toggle('active');
            
            // Get all active filters
            const activeFilters = [];
            filterBtns.forEach(b => {
                if (b.classList.contains('active')) {
                    activeFilters.push(b.getAttribute('data-filter'));
                }
            });
            
            // Filter results
            resultItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (activeFilters.length === 0 || activeFilters.includes(category)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Reset filters
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            resultItems.forEach(item => item.style.display = '');
        });
    }
}

/**
 * Initialize Calculator Functionality
 */
function initCalculators() {
    // GPA Calculator
    const gpaForm = document.getElementById('gpa-calculator-form');
    if (gpaForm) {
        gpaForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const courses = document.querySelectorAll('.course-row');
            let totalCredits = 0;
            let totalGradePoints = 0;
            
            courses.forEach(course => {
                const credits = parseFloat(course.querySelector('.course-credits').value) || 0;
                const grade = parseFloat(course.querySelector('.course-grade').value) || 0;
                
                totalCredits += credits;
                totalGradePoints += credits * grade;
            });
            
            const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
            
            const resultElement = document.getElementById('gpa-result');
            if (resultElement) {
                resultElement.textContent = gpa;
            }
        });
        
        // Add course button
        const addCourseBtn = document.getElementById('add-course-btn');
        if (addCourseBtn) {
            addCourseBtn.addEventListener('click', function() {
                const coursesContainer = document.getElementById('courses-container');
                const courseRow = document.createElement('div');
                courseRow.className = 'course-row form-row';
                courseRow.innerHTML = `
                    <div class="form-group">
                        <input type="text" class="course-name" placeholder="Course Name">
                    </div>
                    <div class="form-group">
                        <input type="number" class="course-credits" placeholder="Credits" min="0" step="0.5">
                    </div>
                    <div class="form-group">
                        <input type="number" class="course-grade" placeholder="Grade" min="0" max="4" step="0.1">
                    </div>
                    <div class="form-group">
                        <button type="button" class="remove-course-btn btn btn-sm outline-btn">Remove</button>
                    </div>
                `;
                coursesContainer.appendChild(courseRow);
                
                // Add event listener to remove button
                const removeBtn = courseRow.querySelector('.remove-course-btn');
                removeBtn.addEventListener('click', function() {
                    courseRow.remove();
                });
            });
        }
    }
    
    // CGPA Calculator
    const cgpaForm = document.getElementById('cgpa-calculator-form');
    if (cgpaForm) {
        cgpaForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const semesters = document.querySelectorAll('.semester-row');
            let totalCredits = 0;
            let totalGradePoints = 0;
            
            semesters.forEach(semester => {
                const credits = parseFloat(semester.querySelector('.semester-credits').value) || 0;
                const gpa = parseFloat(semester.querySelector('.semester-gpa').value) || 0;
                
                totalCredits += credits;
                totalGradePoints += credits * gpa;
            });
            
            const cgpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
            
            const resultElement = document.getElementById('cgpa-result');
            if (resultElement) {
                resultElement.textContent = cgpa;
            }
        });
        
        // Add semester button
        const addSemesterBtn = document.getElementById('add-semester-btn');
        if (addSemesterBtn) {
            addSemesterBtn.addEventListener('click', function() {
                const semestersContainer = document.getElementById('semesters-container');
                const semesterRow = document.createElement('div');
                semesterRow.className = 'semester-row form-row';
                semesterRow.innerHTML = `
                    <div class="form-group">
                        <input type="text" class="semester-name" placeholder="Semester Name">
                    </div>
                    <div class="form-group">
                        <input type="number" class="semester-credits" placeholder="Credits" min="0" step="0.5">
                    </div>
                    <div class="form-group">
                        <input type="number" class="semester-gpa" placeholder="GPA" min="0" max="4" step="0.01">
                    </div>
                    <div class="form-group">
                        <button type="button" class="remove-semester-btn btn btn-sm outline-btn">Remove</button>
                    </div>
                `;
                semestersContainer.appendChild(semesterRow);
                
                // Add event listener to remove button
                const removeBtn = semesterRow.querySelector('.remove-semester-btn');
                removeBtn.addEventListener('click', function() {
                    semesterRow.remove();
                });
            });
        }
    }
    
    // Percentage Calculator
    const percentageForm = document.getElementById('percentage-calculator-form');
    if (percentageForm) {
        percentageForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const obtainedMarks = parseFloat(document.getElementById('obtained-marks').value) || 0;
            const totalMarks = parseFloat(document.getElementById('total-marks').value) || 0;
            
            const percentage = totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100).toFixed(2) : 0;
            
            const resultElement = document.getElementById('percentage-result');
            if (resultElement) {
                resultElement.textContent = percentage + '%';
            }
        });
    }
}

/**
 * Initialize Unit Converters
 */
function initUnitConverters() {
    // Length Converter
    const lengthForm = document.getElementById('length-converter-form');
    if (lengthForm) {
        lengthForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const value = parseFloat(document.getElementById('length-value').value) || 0;
            const fromUnit = document.getElementById('length-from').value;
            const toUnit = document.getElementById('length-to').value;
            
            // Convert to meters first (base unit)
            let meters = 0;
            switch (fromUnit) {
                case 'mm': meters = value / 1000; break;
                case 'cm': meters = value / 100; break;
                case 'm': meters = value; break;
                case 'km': meters = value * 1000; break;
                case 'in': meters = value * 0.0254; break;
                case 'ft': meters = value * 0.3048; break;
                case 'yd': meters = value * 0.9144; break;
                case 'mi': meters = value * 1609.34; break;
            }
            
            // Convert from meters to target unit
            let result = 0;
            switch (toUnit) {
                case 'mm': result = meters * 1000; break;
                case 'cm': result = meters * 100; break;
                case 'm': result = meters; break;
                case 'km': result = meters / 1000; break;
                case 'in': result = meters / 0.0254; break;
                case 'ft': result = meters / 0.3048; break;
                case 'yd': result = meters / 0.9144; break;
                case 'mi': result = meters / 1609.34; break;
            }
            
            const resultElement = document.getElementById('length-result');
            if (resultElement) {
                resultElement.textContent = result.toFixed(4) + ' ' + toUnit;
            }
        });
    }
    
    // Weight Converter
    const weightForm = document.getElementById('weight-converter-form');
    if (weightForm) {
        weightForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const value = parseFloat(document.getElementById('weight-value').value) || 0;
            const fromUnit = document.getElementById('weight-from').value;
            const toUnit = document.getElementById('weight-to').value;
            
            // Convert to grams first (base unit)
            let grams = 0;
            switch (fromUnit) {
                case 'mg': grams = value / 1000; break;
                case 'g': grams = value; break;
                case 'kg': grams = value * 1000; break;
                case 'oz': grams = value * 28.3495; break;
                case 'lb': grams = value * 453.592; break;
                case 'st': grams = value * 6350.29; break;
            }
            
            // Convert from grams to target unit
            let result = 0;
            switch (toUnit) {
                case 'mg': result = grams * 1000; break;
                case 'g': result = grams; break;
                case 'kg': result = grams / 1000; break;
                case 'oz': result = grams / 28.3495; break;
                case 'lb': result = grams / 453.592; break;
                case 'st': result = grams / 6350.29; break;
            }
            
            const resultElement = document.getElementById('weight-result');
            if (resultElement) {
                resultElement.textContent = result.toFixed(4) + ' ' + toUnit;
            }
        });
    }
    
    // Temperature Converter
    const tempForm = document.getElementById('temperature-converter-form');
    if (tempForm) {
        tempForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const value = parseFloat(document.getElementById('temp-value').value) || 0;
            const fromUnit = document.getElementById('temp-from').value;
            const toUnit = document.getElementById('temp-to').value;
            
            // Convert to Celsius first (base unit)
            let celsius = 0;
            switch (fromUnit) {
                case 'c': celsius = value; break;
                case 'f': celsius = (value - 32) * 5/9; break;
                case 'k': celsius = value - 273.15; break;
            }
            
            // Convert from Celsius to target unit
            let result = 0;
            switch (toUnit) {
                case 'c': result = celsius; break;
                case 'f': result = celsius * 9/5 + 32; break;
                case 'k': result = celsius + 273.15; break;
            }
            
            const resultElement = document.getElementById('temp-result');
            if (resultElement) {
                resultElement.textContent = result.toFixed(2) + ' ' + toUnit.toUpperCase();
            }
        });
    }
}

/**
 * Initialize Citation Generator
 */
function initCitationGenerator() {
    const citationForm = document.getElementById('citation-form');
    if (citationForm) {
        citationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const citationType = document.querySelector('.citation-tab.active').getAttribute('data-citation-type');
            const resultElement = document.getElementById('citation-result');
            
            if (!resultElement) return;
            
            let citation = '';
            
            if (citationType === 'book') {
                const author = document.getElementById('book-author').value.trim();
                const year = document.getElementById('book-year').value.trim();
                const title = document.getElementById('book-title').value.trim();
                const publisher = document.getElementById('book-publisher').value.trim();
                const location = document.getElementById('book-location').value.trim();
                
                // Generate APA citation for book
                citation = `${author}. (${year}). <em>${title}</em>. ${location}: ${publisher}.`;
            } else if (citationType === 'journal') {
                const author = document.getElementById('journal-author').value.trim();
                const year = document.getElementById('journal-year').value.trim();
                const title = document.getElementById('journal-title').value.trim();
                const journal = document.getElementById('journal-name').value.trim();
                const volume = document.getElementById('journal-volume').value.trim();
                const issue = document.getElementById('journal-issue').value.trim();
                const pages = document.getElementById('journal-pages').value.trim();
                
                // Generate APA citation for journal
                citation = `${author}. (${year}). ${title}. <em>${journal}</em>, ${volume}(${issue}), ${pages}.`;
            } else if (citationType === 'website') {
                const author = document.getElementById('website-author').value.trim();
                const year = document.getElementById('website-year').value.trim();
                const title = document.getElementById('website-title').value.trim();
                const website = document.getElementById('website-name').value.trim();
                const url = document.getElementById('website-url').value.trim();
                const accessed = document.getElementById('website-accessed').value.trim();
                
                // Generate APA citation for website
                citation = `${author}. (${year}). ${title}. <em>${website}</em>. Retrieved ${accessed}, from ${url}`;
            }
            
            resultElement.innerHTML = citation;
            
            // Show copy button
            const copyBtn = document.getElementById('copy-citation-btn');
            if (copyBtn) {
                copyBtn.style.display = 'block';
                copyBtn.addEventListener('click', function() {
                    const tempTextarea = document.createElement('textarea');
                    tempTextarea.value = resultElement.textContent;
                    document.body.appendChild(tempTextarea);
                    tempTextarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(tempTextarea);
                    
                    // Show copied message
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(function() {
                        copyBtn.textContent = originalText;
                    }, 2000);
                });
            }
        });
    }
}

/**
 * Initialize Smooth Scrolling
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Initialize Scroll to Top Button
 */
function initScrollToTop() {
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.width = '40px';
    scrollTopBtn.style.height = '40px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.backgroundColor = 'var(--primary-color)';
    scrollTopBtn.style.color = 'var(--white-color)';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.boxShadow = 'var(--shadow-md)';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.zIndex = '999';
    scrollTopBtn.style.transition = 'all var(--transition-normal)';
    
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
}