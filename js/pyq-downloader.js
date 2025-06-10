/**
 * QUARYNOX - PYQ Downloader Script
 * This file contains the functionality for the Previous Year Question Papers Downloader
 */

document.addEventListener('DOMContentLoaded', function() {
    initPYQDownloader();
});

/**
 * Initialize PYQ Downloader Functionality
 */
function initPYQDownloader() {
    // Get form elements
    const pyqForm = document.getElementById('pyq-form');
    const universitySelect = document.getElementById('university');
    const courseSelect = document.getElementById('course');
    const yearSelect = document.getElementById('year');
    const semesterSelect = document.getElementById('semester');
    const subjectSelect = document.getElementById('subject');
    const searchBtn = document.getElementById('search-pyq-btn');
    const resultsContainer = document.getElementById('pyq-results');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    
    // If the form doesn't exist, return
    if (!pyqForm) return;
    
    // Sample data for demonstration
    const universities = [
        { id: 1, name: 'Delhi University' },
        { id: 2, name: 'Mumbai University' },
        { id: 3, name: 'Bangalore University' },
        { id: 4, name: 'Calcutta University' },
        { id: 5, name: 'Madras University' },
        { id: 6, name: 'Pune University' },
        { id: 7, name: 'Osmania University' },
        { id: 8, name: 'Aligarh Muslim University' },
        { id: 9, name: 'Banaras Hindu University' },
        { id: 10, name: 'Jawaharlal Nehru University' }
    ];
    
    // Populate universities dropdown
    if (universitySelect) {
        universities.forEach(university => {
            const option = document.createElement('option');
            option.value = university.id;
            option.textContent = university.name;
            universitySelect.appendChild(option);
        });
    }
    
    // Handle university change
    if (universitySelect) {
        universitySelect.addEventListener('change', function() {
            // Clear existing options
            clearOptions(courseSelect);
            clearOptions(yearSelect);
            clearOptions(semesterSelect);
            clearOptions(subjectSelect);
            
            // Get selected university
            const selectedUniversity = universitySelect.value;
            
            if (selectedUniversity) {
                // Fetch courses for selected university
                fetchCourses(selectedUniversity);
            }
        });
    }
    
    // Handle course change
    if (courseSelect) {
        courseSelect.addEventListener('change', function() {
            // Clear existing options
            clearOptions(yearSelect);
            clearOptions(semesterSelect);
            clearOptions(subjectSelect);
            
            // Get selected university and course
            const selectedUniversity = universitySelect.value;
            const selectedCourse = courseSelect.value;
            
            if (selectedUniversity && selectedCourse) {
                // Fetch years for selected university and course
                fetchYears(selectedUniversity, selectedCourse);
            }
        });
    }
    
    // Handle year change
    if (yearSelect) {
        yearSelect.addEventListener('change', function() {
            // Clear existing options
            clearOptions(semesterSelect);
            clearOptions(subjectSelect);
            
            // Get selected university, course, and year
            const selectedUniversity = universitySelect.value;
            const selectedCourse = courseSelect.value;
            const selectedYear = yearSelect.value;
            
            if (selectedUniversity && selectedCourse && selectedYear) {
                // Fetch semesters for selected university, course, and year
                fetchSemesters(selectedUniversity, selectedCourse, selectedYear);
            }
        });
    }
    
    // Handle semester change
    if (semesterSelect) {
        semesterSelect.addEventListener('change', function() {
            // Clear existing options
            clearOptions(subjectSelect);
            
            // Get selected university, course, year, and semester
            const selectedUniversity = universitySelect.value;
            const selectedCourse = courseSelect.value;
            const selectedYear = yearSelect.value;
            const selectedSemester = semesterSelect.value;
            
            if (selectedUniversity && selectedCourse && selectedYear && selectedSemester) {
                // Fetch subjects for selected university, course, year, and semester
                fetchSubjects(selectedUniversity, selectedCourse, selectedYear, selectedSemester);
            }
        });
    }
    
    // Handle form submission
    if (pyqForm) {
        pyqForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get selected values
            const selectedUniversity = universitySelect.value;
            const selectedCourse = courseSelect.value;
            const selectedYear = yearSelect.value;
            const selectedSemester = semesterSelect.value;
            const selectedSubject = subjectSelect.value;
            
            // Validate form
            if (!selectedUniversity || !selectedCourse || !selectedYear || !selectedSemester) {
                showError('Please select all required fields');
                return;
            }
            
            // Show loading indicator
            if (loadingIndicator) {
                loadingIndicator.style.display = 'block';
            }
            
            // Hide error message
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }
            
            // Clear previous results
            if (resultsContainer) {
                resultsContainer.innerHTML = '';
            }
            
            // Simulate API call to fetch PYQs
            setTimeout(function() {
                // Hide loading indicator
                if (loadingIndicator) {
                    loadingIndicator.style.display = 'none';
                }
                
                // Display results
                displayResults(selectedUniversity, selectedCourse, selectedYear, selectedSemester, selectedSubject);
            }, 1500);
        });
    }
    
    // Helper function to clear dropdown options
    function clearOptions(selectElement) {
        if (!selectElement) return;
        
        // Keep the first option (placeholder)
        while (selectElement.options.length > 1) {
            selectElement.remove(1);
        }
        
        // Reset to first option
        selectElement.selectedIndex = 0;
        
        // Disable select if it's not the university select
        if (selectElement !== universitySelect) {
            selectElement.disabled = true;
        }
    }
    
    // Helper function to show error message
    function showError(message) {
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
        
        // Hide loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'none';
        }
    }
    
    // Function to fetch courses for selected university
    function fetchCourses(universityId) {
        // Simulate API call
        setTimeout(function() {
            // Sample courses data
            const courses = [
                { id: 1, name: 'B.Tech Computer Science' },
                { id: 2, name: 'B.Tech Electronics' },
                { id: 3, name: 'B.Tech Mechanical' },
                { id: 4, name: 'B.Com' },
                { id: 5, name: 'BBA' },
                { id: 6, name: 'MBA' },
                { id: 7, name: 'MCA' },
                { id: 8, name: 'B.Sc Physics' },
                { id: 9, name: 'B.Sc Chemistry' },
                { id: 10, name: 'B.A. English' }
            ];
            
            // Enable course select
            if (courseSelect) {
                courseSelect.disabled = false;
                
                // Populate courses dropdown
                courses.forEach(course => {
                    const option = document.createElement('option');
                    option.value = course.id;
                    option.textContent = course.name;
                    courseSelect.appendChild(option);
                });
            }
        }, 500);
    }
    
    // Function to fetch years for selected university and course
    function fetchYears(universityId, courseId) {
        // Simulate API call
        setTimeout(function() {
            // Sample years data
            const years = [
                { id: 1, name: '2023' },
                { id: 2, name: '2022' },
                { id: 3, name: '2021' },
                { id: 4, name: '2020' },
                { id: 5, name: '2019' }
            ];
            
            // Enable year select
            if (yearSelect) {
                yearSelect.disabled = false;
                
                // Populate years dropdown
                years.forEach(year => {
                    const option = document.createElement('option');
                    option.value = year.id;
                    option.textContent = year.name;
                    yearSelect.appendChild(option);
                });
            }
        }, 500);
    }
    
    // Function to fetch semesters for selected university, course, and year
    function fetchSemesters(universityId, courseId, yearId) {
        // Simulate API call
        setTimeout(function() {
            // Sample semesters data
            const semesters = [
                { id: 1, name: 'Semester 1' },
                { id: 2, name: 'Semester 2' },
                { id: 3, name: 'Semester 3' },
                { id: 4, name: 'Semester 4' },
                { id: 5, name: 'Semester 5' },
                { id: 6, name: 'Semester 6' },
                { id: 7, name: 'Semester 7' },
                { id: 8, name: 'Semester 8' }
            ];
            
            // Enable semester select
            if (semesterSelect) {
                semesterSelect.disabled = false;
                
                // Populate semesters dropdown
                semesters.forEach(semester => {
                    const option = document.createElement('option');
                    option.value = semester.id;
                    option.textContent = semester.name;
                    semesterSelect.appendChild(option);
                });
            }
        }, 500);
    }
    
    // Function to fetch subjects for selected university, course, year, and semester
    function fetchSubjects(universityId, courseId, yearId, semesterId) {
        // Simulate API call
        setTimeout(function() {
            // Sample subjects data
            const subjects = [
                { id: 1, name: 'Data Structures' },
                { id: 2, name: 'Algorithms' },
                { id: 3, name: 'Database Management' },
                { id: 4, name: 'Operating Systems' },
                { id: 5, name: 'Computer Networks' },
                { id: 6, name: 'Software Engineering' },
                { id: 7, name: 'Artificial Intelligence' },
                { id: 8, name: 'Machine Learning' },
                { id: 9, name: 'Web Development' },
                { id: 10, name: 'Mobile App Development' }
            ];
            
            // Enable subject select
            if (subjectSelect) {
                subjectSelect.disabled = false;
                
                // Populate subjects dropdown
                subjects.forEach(subject => {
                    const option = document.createElement('option');
                    option.value = subject.id;
                    option.textContent = subject.name;
                    subjectSelect.appendChild(option);
                });
            }
        }, 500);
    }
    
    // Function to display PYQ results
    function displayResults(universityId, courseId, yearId, semesterId, subjectId) {
        if (!resultsContainer) return;
        
        // Get university, course, year, semester, and subject names
        const universityName = universitySelect.options[universitySelect.selectedIndex].text;
        const courseName = courseSelect.options[courseSelect.selectedIndex].text;
        const yearName = yearSelect.options[yearSelect.selectedIndex].text;
        const semesterName = semesterSelect.options[semesterSelect.selectedIndex].text;
        const subjectName = subjectId ? subjectSelect.options[subjectSelect.selectedIndex].text : 'All Subjects';
        
        // Sample PYQ data
        const pyqs = [
            {
                id: 1,
                title: `${subjectName} - ${semesterName} - ${yearName}`,
                university: universityName,
                course: courseName,
                year: yearName,
                semester: semesterName,
                subject: subjectName,
                fileSize: '2.5 MB',
                fileType: 'PDF',
                downloadUrl: '#'
            },
            {
                id: 2,
                title: `${subjectName} - ${semesterName} - ${yearName} (Supplementary)`,
                university: universityName,
                course: courseName,
                year: yearName,
                semester: semesterName,
                subject: subjectName,
                fileSize: '1.8 MB',
                fileType: 'PDF',
                downloadUrl: '#'
            },
            {
                id: 3,
                title: `${subjectName} - ${semesterName} - ${parseInt(yearName) - 1}`,
                university: universityName,
                course: courseName,
                year: (parseInt(yearName) - 1).toString(),
                semester: semesterName,
                subject: subjectName,
                fileSize: '2.2 MB',
                fileType: 'PDF',
                downloadUrl: '#'
            }
        ];
        
        // Create results header
        const resultsHeader = document.createElement('div');
        resultsHeader.className = 'results-header';
        resultsHeader.innerHTML = `
            <h3>Found ${pyqs.length} Previous Year Question Papers</h3>
            <p>University: ${universityName} | Course: ${courseName} | Year: ${yearName} | Semester: ${semesterName} ${subjectId ? '| Subject: ' + subjectName : ''}</p>
        `;
        resultsContainer.appendChild(resultsHeader);
        
        // Create results list
        const resultsList = document.createElement('div');
        resultsList.className = 'results-list';
        
        // Add PYQ items to results list
        pyqs.forEach(pyq => {
            const pyqItem = document.createElement('div');
            pyqItem.className = 'pyq-item';
            pyqItem.innerHTML = `
                <div class="pyq-info">
                    <h4>${pyq.title}</h4>
                    <p>University: ${pyq.university} | Course: ${pyq.course} | Year: ${pyq.year} | Semester: ${pyq.semester}</p>
                    <p>File Size: ${pyq.fileSize} | File Type: ${pyq.fileType}</p>
                </div>
                <div class="pyq-actions">
                    <a href="${pyq.downloadUrl}" class="btn primary-btn download-btn" download>
                        <i class="fas fa-download"></i> Download
                    </a>
                    <button class="btn outline-btn preview-btn">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            resultsList.appendChild(pyqItem);
            
            // Add event listener to preview button
            const previewBtn = pyqItem.querySelector('.preview-btn');
            previewBtn.addEventListener('click', function() {
                // Show preview modal
                showPreviewModal(pyq);
            });
        });
        
        resultsContainer.appendChild(resultsList);
    }
    
    // Function to show preview modal
    function showPreviewModal(pyq) {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        modalContainer.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${pyq.title}</h3>
                    <button class="close-modal-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="preview-placeholder">
                        <i class="fas fa-file-pdf fa-5x"></i>
                        <p>Preview not available. Please download the file to view.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="${pyq.downloadUrl}" class="btn primary-btn download-btn" download>
                        <i class="fas fa-download"></i> Download
                    </a>
                    <button class="btn outline-btn close-btn">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modalContainer);
        
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        
        // Add event listeners to close modal
        const closeModalBtn = modalContainer.querySelector('.close-modal-btn');
        const closeBtn = modalContainer.querySelector('.close-btn');
        const modalOverlay = modalContainer.querySelector('.modal-overlay');
        
        closeModalBtn.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        
        function closeModal() {
            document.body.removeChild(modalContainer);
            document.body.style.overflow = '';
        }
    }
}