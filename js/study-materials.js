/**
 * QUARYNOX - Study Materials Script
 * This file contains the functionality for the Study Materials/Notes section
 */

document.addEventListener('DOMContentLoaded', function() {
    initStudyMaterials();
});

/**
 * Initialize Study Materials Functionality
 */
function initStudyMaterials() {
    // Get elements
    const studyMaterialsContainer = document.getElementById('study-materials-container');
    const searchForm = document.getElementById('study-materials-search-form');
    const searchInput = document.getElementById('study-materials-search');
    const categoryFilter = document.getElementById('category-filter');
    const sortFilter = document.getElementById('sort-filter');
    const paginationContainer = document.getElementById('pagination-container');
    
    // If the container doesn't exist, return
    if (!studyMaterialsContainer) return;
    
    // Sample study materials data
    const studyMaterials = [
        {
            id: 1,
            title: 'Data Structures and Algorithms Notes',
            description: 'Comprehensive notes covering all major data structures and algorithms with examples and time complexity analysis.',
            category: 'Computer Science',
            subject: 'Data Structures',
            author: 'Prof. Sharma',
            rating: 4.8,
            downloads: 1250,
            fileSize: '3.2 MB',
            fileType: 'PDF',
            uploadDate: '2023-05-15',
            thumbnailUrl: 'images/thumbnails/dsa-notes.jpg',
            downloadUrl: '#'
        },
        {
            id: 2,
            title: 'Organic Chemistry Reaction Mechanisms',
            description: 'Detailed notes on organic chemistry reaction mechanisms with step-by-step explanations and practice problems.',
            category: 'Chemistry',
            subject: 'Organic Chemistry',
            author: 'Dr. Patel',
            rating: 4.6,
            downloads: 980,
            fileSize: '4.5 MB',
            fileType: 'PDF',
            uploadDate: '2023-04-22',
            thumbnailUrl: 'images/thumbnails/organic-chemistry.jpg',
            downloadUrl: '#'
        },
        {
            id: 3,
            title: 'Calculus Made Easy',
            description: 'Simplified approach to calculus with practical examples and solved problems for beginners.',
            category: 'Mathematics',
            subject: 'Calculus',
            author: 'Prof. Gupta',
            rating: 4.9,
            downloads: 1560,
            fileSize: '2.8 MB',
            fileType: 'PDF',
            uploadDate: '2023-06-10',
            thumbnailUrl: 'images/thumbnails/calculus.jpg',
            downloadUrl: '#'
        },
        {
            id: 4,
            title: 'Introduction to Machine Learning',
            description: 'Beginner-friendly notes on machine learning concepts, algorithms, and implementation examples.',
            category: 'Computer Science',
            subject: 'Machine Learning',
            author: 'Dr. Singh',
            rating: 4.7,
            downloads: 1120,
            fileSize: '5.1 MB',
            fileType: 'PDF',
            uploadDate: '2023-03-18',
            thumbnailUrl: 'images/thumbnails/machine-learning.jpg',
            downloadUrl: '#'
        },
        {
            id: 5,
            title: 'Microeconomics Principles',
            description: 'Comprehensive notes on microeconomics principles, theories, and real-world applications.',
            category: 'Economics',
            subject: 'Microeconomics',
            author: 'Prof. Verma',
            rating: 4.5,
            downloads: 850,
            fileSize: '2.3 MB',
            fileType: 'PDF',
            uploadDate: '2023-02-25',
            thumbnailUrl: 'images/thumbnails/microeconomics.jpg',
            downloadUrl: '#'
        },
        {
            id: 6,
            title: 'Digital Electronics Fundamentals',
            description: 'Complete guide to digital electronics with circuit diagrams, truth tables, and practical examples.',
            category: 'Electronics',
            subject: 'Digital Electronics',
            author: 'Dr. Kumar',
            rating: 4.6,
            downloads: 920,
            fileSize: '3.7 MB',
            fileType: 'PDF',
            uploadDate: '2023-01-12',
            thumbnailUrl: 'images/thumbnails/digital-electronics.jpg',
            downloadUrl: '#'
        },
        {
            id: 7,
            title: 'Human Anatomy and Physiology',
            description: 'Detailed notes on human anatomy and physiology with labeled diagrams and explanations.',
            category: 'Biology',
            subject: 'Anatomy',
            author: 'Dr. Reddy',
            rating: 4.8,
            downloads: 1050,
            fileSize: '6.2 MB',
            fileType: 'PDF',
            uploadDate: '2023-05-05',
            thumbnailUrl: 'images/thumbnails/anatomy.jpg',
            downloadUrl: '#'
        },
        {
            id: 8,
            title: 'Modern World History',
            description: 'Comprehensive notes on modern world history covering major events, revolutions, and world wars.',
            category: 'History',
            subject: 'World History',
            author: 'Prof. Joshi',
            rating: 4.4,
            downloads: 780,
            fileSize: '4.0 MB',
            fileType: 'PDF',
            uploadDate: '2023-04-08',
            thumbnailUrl: 'images/thumbnails/world-history.jpg',
            downloadUrl: '#'
        },
        {
            id: 9,
            title: 'Object-Oriented Programming in Java',
            description: 'Complete guide to OOP concepts in Java with code examples and best practices.',
            category: 'Computer Science',
            subject: 'Java Programming',
            author: 'Prof. Mehta',
            rating: 4.7,
            downloads: 1320,
            fileSize: '3.5 MB',
            fileType: 'PDF',
            uploadDate: '2023-06-20',
            thumbnailUrl: 'images/thumbnails/java-oop.jpg',
            downloadUrl: '#'
        },
        {
            id: 10,
            title: 'Thermodynamics and Heat Transfer',
            description: 'Comprehensive notes on thermodynamics principles, laws, and heat transfer mechanisms.',
            category: 'Physics',
            subject: 'Thermodynamics',
            author: 'Dr. Sharma',
            rating: 4.6,
            downloads: 890,
            fileSize: '3.8 MB',
            fileType: 'PDF',
            uploadDate: '2023-03-30',
            thumbnailUrl: 'images/thumbnails/thermodynamics.jpg',
            downloadUrl: '#'
        },
        {
            id: 11,
            title: 'Financial Accounting Basics',
            description: 'Easy-to-understand notes on financial accounting principles, statements, and analysis.',
            category: 'Commerce',
            subject: 'Accounting',
            author: 'Prof. Agarwal',
            rating: 4.5,
            downloads: 950,
            fileSize: '2.9 MB',
            fileType: 'PDF',
            uploadDate: '2023-02-15',
            thumbnailUrl: 'images/thumbnails/accounting.jpg',
            downloadUrl: '#'
        },
        {
            id: 12,
            title: 'Web Development Fundamentals',
            description: 'Comprehensive guide to HTML, CSS, and JavaScript with practical examples and projects.',
            category: 'Computer Science',
            subject: 'Web Development',
            author: 'Prof. Khanna',
            rating: 4.8,
            downloads: 1420,
            fileSize: '4.2 MB',
            fileType: 'PDF',
            uploadDate: '2023-05-25',
            thumbnailUrl: 'images/thumbnails/web-dev.jpg',
            downloadUrl: '#'
        }
    ];
    
    // Variables for pagination
    let currentPage = 1;
    const itemsPerPage = 6;
    let filteredMaterials = [...studyMaterials];
    
    // Initialize display
    displayStudyMaterials(filteredMaterials, currentPage);
    setupPagination(filteredMaterials);
    
    // Handle search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            filterAndSortMaterials();
        });
    }
    
    // Handle category filter change
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            filterAndSortMaterials();
        });
    }
    
    // Handle sort filter change
    if (sortFilter) {
        sortFilter.addEventListener('change', function() {
            filterAndSortMaterials();
        });
    }
    
    // Function to filter and sort materials
    function filterAndSortMaterials() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const category = categoryFilter ? categoryFilter.value : 'all';
        const sortBy = sortFilter ? sortFilter.value : 'newest';
        
        // Filter by search term and category
        filteredMaterials = studyMaterials.filter(material => {
            const matchesSearch = material.title.toLowerCase().includes(searchTerm) || 
                                material.description.toLowerCase().includes(searchTerm) || 
                                material.subject.toLowerCase().includes(searchTerm) || 
                                material.author.toLowerCase().includes(searchTerm);
            
            const matchesCategory = category === 'all' || material.category === category;
            
            return matchesSearch && matchesCategory;
        });
        
        // Sort materials
        switch (sortBy) {
            case 'newest':
                filteredMaterials.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
                break;
            case 'oldest':
                filteredMaterials.sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate));
                break;
            case 'most-downloaded':
                filteredMaterials.sort((a, b) => b.downloads - a.downloads);
                break;
            case 'highest-rated':
                filteredMaterials.sort((a, b) => b.rating - a.rating);
                break;
            case 'a-z':
                filteredMaterials.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'z-a':
                filteredMaterials.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }
        
        // Reset to first page and update display
        currentPage = 1;
        displayStudyMaterials(filteredMaterials, currentPage);
        setupPagination(filteredMaterials);
    }
    
    // Function to display study materials
    function displayStudyMaterials(materials, page) {
        if (!studyMaterialsContainer) return;
        
        // Clear container
        studyMaterialsContainer.innerHTML = '';
        
        // Calculate start and end index for current page
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, materials.length);
        
        // Check if no materials found
        if (materials.length === 0) {
            studyMaterialsContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search fa-3x"></i>
                    <h3>No study materials found</h3>
                    <p>Try adjusting your search criteria or browse all materials</p>
                </div>
            `;
            return;
        }
        
        // Create materials grid
        const materialsGrid = document.createElement('div');
        materialsGrid.className = 'materials-grid';
        
        // Add material cards to grid
        for (let i = startIndex; i < endIndex; i++) {
            const material = materials[i];
            const materialCard = document.createElement('div');
            materialCard.className = 'material-card';
            materialCard.innerHTML = `
                <div class="material-thumbnail">
                    <img src="${material.thumbnailUrl}" alt="${material.title}" onerror="this.src='images/thumbnails/default.jpg'">
                </div>
                <div class="material-info">
                    <h3 class="material-title">${material.title}</h3>
                    <p class="material-description">${material.description}</p>
                    <div class="material-meta">
                        <span class="material-category">${material.category}</span>
                        <span class="material-subject">${material.subject}</span>
                    </div>
                    <div class="material-author">By ${material.author}</div>
                    <div class="material-stats">
                        <div class="material-rating">
                            <span class="rating-value">${material.rating}</span>
                            <span class="rating-stars">${generateRatingStars(material.rating)}</span>
                        </div>
                        <div class="material-downloads">
                            <i class="fas fa-download"></i> ${material.downloads}
                        </div>
                    </div>
                    <div class="material-details">
                        <span class="material-size">${material.fileSize}</span>
                        <span class="material-type">${material.fileType}</span>
                        <span class="material-date">Uploaded: ${formatDate(material.uploadDate)}</span>
                    </div>
                </div>
                <div class="material-actions">
                    <a href="${material.downloadUrl}" class="btn primary-btn download-btn" download>
                        <i class="fas fa-download"></i> Download
                    </a>
                    <button class="btn outline-btn preview-btn" data-id="${material.id}">
                        <i class="fas fa-eye"></i> Preview
                    </button>
                </div>
            `;
            materialsGrid.appendChild(materialCard);
            
            // Add event listener to preview button
            const previewBtn = materialCard.querySelector('.preview-btn');
            previewBtn.addEventListener('click', function() {
                const materialId = this.getAttribute('data-id');
                const selectedMaterial = materials.find(m => m.id === parseInt(materialId));
                if (selectedMaterial) {
                    showPreviewModal(selectedMaterial);
                }
            });
        }
        
        studyMaterialsContainer.appendChild(materialsGrid);
    }
    
    // Function to setup pagination
    function setupPagination(materials) {
        if (!paginationContainer) return;
        
        // Clear container
        paginationContainer.innerHTML = '';
        
        // Calculate total pages
        const totalPages = Math.ceil(materials.length / itemsPerPage);
        
        // If only one page, hide pagination
        if (totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        // Show pagination
        paginationContainer.style.display = 'flex';
        
        // Create pagination controls
        const paginationControls = document.createElement('div');
        paginationControls.className = 'pagination-controls';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-btn prev-btn';
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i> Previous';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                displayStudyMaterials(filteredMaterials, currentPage);
                setupPagination(filteredMaterials);
            }
        });
        paginationControls.appendChild(prevBtn);
        
        // Page numbers
        const pageNumbers = document.createElement('div');
        pageNumbers.className = 'page-numbers';
        
        // Determine range of page numbers to show
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);
        
        // Adjust start page if end page is maxed out
        if (endPage === totalPages) {
            startPage = Math.max(1, endPage - 4);
        }
        
        // First page button (if not in range)
        if (startPage > 1) {
            const firstPageBtn = document.createElement('button');
            firstPageBtn.className = 'pagination-btn page-btn';
            firstPageBtn.textContent = '1';
            firstPageBtn.addEventListener('click', function() {
                currentPage = 1;
                displayStudyMaterials(filteredMaterials, currentPage);
                setupPagination(filteredMaterials);
            });
            pageNumbers.appendChild(firstPageBtn);
            
            // Ellipsis if needed
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
        }
        
        // Page number buttons
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-btn page-btn';
            if (i === currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', function() {
                currentPage = i;
                displayStudyMaterials(filteredMaterials, currentPage);
                setupPagination(filteredMaterials);
            });
            pageNumbers.appendChild(pageBtn);
        }
        
        // Last page button (if not in range)
        if (endPage < totalPages) {
            // Ellipsis if needed
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.className = 'pagination-ellipsis';
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
            
            const lastPageBtn = document.createElement('button');
            lastPageBtn.className = 'pagination-btn page-btn';
            lastPageBtn.textContent = totalPages;
            lastPageBtn.addEventListener('click', function() {
                currentPage = totalPages;
                displayStudyMaterials(filteredMaterials, currentPage);
                setupPagination(filteredMaterials);
            });
            pageNumbers.appendChild(lastPageBtn);
        }
        
        paginationControls.appendChild(pageNumbers);
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-btn next-btn';
        nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                displayStudyMaterials(filteredMaterials, currentPage);
                setupPagination(filteredMaterials);
            }
        });
        paginationControls.appendChild(nextBtn);
        
        paginationContainer.appendChild(paginationControls);
    }
    
    // Function to show preview modal
    function showPreviewModal(material) {
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-container';
        modalContainer.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${material.title}</h3>
                    <button class="close-modal-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="material-preview">
                        <div class="preview-info">
                            <div class="preview-thumbnail">
                                <img src="${material.thumbnailUrl}" alt="${material.title}" onerror="this.src='images/thumbnails/default.jpg'">
                            </div>
                            <div class="preview-details">
                                <p><strong>Category:</strong> ${material.category}</p>
                                <p><strong>Subject:</strong> ${material.subject}</p>
                                <p><strong>Author:</strong> ${material.author}</p>
                                <p><strong>Rating:</strong> ${material.rating} ${generateRatingStars(material.rating)}</p>
                                <p><strong>Downloads:</strong> ${material.downloads}</p>
                                <p><strong>File Size:</strong> ${material.fileSize}</p>
                                <p><strong>File Type:</strong> ${material.fileType}</p>
                                <p><strong>Upload Date:</strong> ${formatDate(material.uploadDate)}</p>
                            </div>
                        </div>
                        <div class="preview-description">
                            <h4>Description</h4>
                            <p>${material.description}</p>
                        </div>
                        <div class="preview-placeholder">
                            <i class="fas fa-file-pdf fa-5x"></i>
                            <p>Preview not available. Please download the file to view full content.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <a href="${material.downloadUrl}" class="btn primary-btn download-btn" download>
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
    
    // Helper function to generate rating stars
    function generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        let starsHTML = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        // Half star
        if (halfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return starsHTML;
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }
}