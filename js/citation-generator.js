/**
 * Citation Generator Script
 * This script handles the functionality for generating citations in different formats
 * (APA, MLA, Chicago) for various source types (books, journals, websites, newspapers).
 */

document.addEventListener('DOMContentLoaded', function() {
    initCitationGenerator();
});

/**
 * Initialize the Citation Generator tool
 */
function initCitationGenerator() {
    // Set up tab switching
    setupCitationTabs();
    
    // Set up source type change handlers
    setupSourceTypeHandlers();
    
    // Set up citation generation
    setupCitationGeneration();
    
    // Set up copy citation functionality
    setupCopyCitation();
}

/**
 * Set up the citation format tabs (APA, MLA, Chicago)
 */
function setupCitationTabs() {
    const tabButtons = document.querySelectorAll('#citation-generator .tab-btn');
    const tabPanes = document.querySelectorAll('#citation-generator .tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

/**
 * Set up handlers for source type changes
 */
function setupSourceTypeHandlers() {
    // APA source type handler
    const apaSourceType = document.getElementById('apa-source-type');
    if (apaSourceType) {
        apaSourceType.addEventListener('change', function() {
            showSourceFields('apa', this.value);
        });
    }
    
    // MLA source type handler
    const mlaSourceType = document.getElementById('mla-source-type');
    if (mlaSourceType) {
        mlaSourceType.addEventListener('change', function() {
            showSourceFields('mla', this.value);
        });
    }
    
    // Chicago source type handler
    const chicagoSourceType = document.getElementById('chicago-source-type');
    if (chicagoSourceType) {
        chicagoSourceType.addEventListener('change', function() {
            showSourceFields('chicago', this.value);
        });
    }
    
    // Initialize with default source type (book)
    showSourceFields('apa', 'book');
    showSourceFields('mla', 'book');
    showSourceFields('chicago', 'book');
}

/**
 * Show the appropriate fields based on the selected source type
 * @param {string} format - The citation format (apa, mla, chicago)
 * @param {string} sourceType - The source type (book, journal, website, newspaper)
 */
function showSourceFields(format, sourceType) {
    // Hide all source fields for this format
    const allFields = document.querySelectorAll(`#${format}-citation .source-fields`);
    allFields.forEach(field => field.style.display = 'none');
    
    // Show the fields for the selected source type
    const selectedFields = document.querySelector(`#${format}-citation .${sourceType}-fields`);
    if (selectedFields) {
        selectedFields.style.display = 'block';
    } else {
        // If specific fields don't exist, show the book fields as default
        const bookFields = document.querySelector(`#${format}-citation .book-fields`);
        if (bookFields) {
            bookFields.style.display = 'block';
        }
    }
}

/**
 * Set up citation generation buttons
 */
function setupCitationGeneration() {
    const generateButtons = document.querySelectorAll('.generate-citation-btn');
    
    generateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentTab = this.closest('.tab-pane');
            const format = parentTab.id.split('-')[0]; // apa, mla, or chicago
            const sourceType = document.getElementById(`${format}-source-type`).value;
            
            generateCitation(format, sourceType);
        });
    });
}

/**
 * Generate a citation based on the format and source type
 * @param {string} format - The citation format (apa, mla, chicago)
 * @param {string} sourceType - The source type (book, journal, website, newspaper)
 */
function generateCitation(format, sourceType) {
    let citation = '';
    
    switch(format) {
        case 'apa':
            citation = generateAPACitation(sourceType);
            break;
        case 'mla':
            citation = generateMLACitation(sourceType);
            break;
        case 'chicago':
            citation = generateChicagoCitation(sourceType);
            break;
        default:
            citation = 'Invalid citation format';
    }
    
    // Display the citation
    const resultElement = document.getElementById(`${format}-citation-result`);
    if (resultElement) {
        resultElement.innerHTML = `<p>${citation}</p>`;
    }
}

/**
 * Generate an APA citation
 * @param {string} sourceType - The source type (book, journal, website, newspaper)
 * @returns {string} The formatted citation
 */
function generateAPACitation(sourceType) {
    switch(sourceType) {
        case 'book':
            return generateAPABookCitation();
        case 'journal':
            return generateAPAJournalCitation();
        case 'website':
            return generateAPAWebsiteCitation();
        case 'newspaper':
            return generateAPANewspaperCitation();
        default:
            return 'Please select a valid source type.';
    }
}

/**
 * Generate an APA book citation
 * @returns {string} The formatted citation
 */
function generateAPABookCitation() {
    const author = document.getElementById('apa-book-author').value.trim() || '[Author]';
    const year = document.getElementById('apa-book-year').value.trim() || '[Year]';
    const title = document.getElementById('apa-book-title').value.trim() || '[Title]';
    const publisher = document.getElementById('apa-book-publisher').value.trim() || '[Publisher]';
    
    // Format: Author. (Year). Title. Publisher.
    return `${author}. (${year}). <em>${title}</em>. ${publisher}.`;
}

/**
 * Generate an APA journal citation
 * @returns {string} The formatted citation
 */
function generateAPAJournalCitation() {
    // Implement journal citation logic
    return 'APA Journal citation will be generated here.';
}

/**
 * Generate an APA website citation
 * @returns {string} The formatted citation
 */
function generateAPAWebsiteCitation() {
    // Implement website citation logic
    return 'APA Website citation will be generated here.';
}

/**
 * Generate an APA newspaper citation
 * @returns {string} The formatted citation
 */
function generateAPANewspaperCitation() {
    // Implement newspaper citation logic
    return 'APA Newspaper citation will be generated here.';
}

/**
 * Generate an MLA citation
 * @param {string} sourceType - The source type (book, journal, website, newspaper)
 * @returns {string} The formatted citation
 */
function generateMLACitation(sourceType) {
    switch(sourceType) {
        case 'book':
            return generateMLABookCitation();
        case 'journal':
            return 'MLA Journal citation will be generated here.';
        case 'website':
            return 'MLA Website citation will be generated here.';
        case 'newspaper':
            return 'MLA Newspaper citation will be generated here.';
        default:
            return 'Please select a valid source type.';
    }
}

/**
 * Generate an MLA book citation
 * @returns {string} The formatted citation
 */
function generateMLABookCitation() {
    const author = document.getElementById('mla-book-author').value.trim() || '[Author]';
    const title = document.getElementById('mla-book-title').value.trim() || '[Title]';
    const publisher = document.getElementById('mla-book-publisher').value.trim() || '[Publisher]';
    const year = document.getElementById('mla-book-year').value.trim() || '[Year]';
    
    // Format: Author. Title. Publisher, Year.
    return `${author}. <em>${title}</em>. ${publisher}, ${year}.`;
}

/**
 * Generate a Chicago citation
 * @param {string} sourceType - The source type (book, journal, website, newspaper)
 * @returns {string} The formatted citation
 */
function generateChicagoCitation(sourceType) {
    switch(sourceType) {
        case 'book':
            return generateChicagoBookCitation();
        case 'journal':
            return 'Chicago Journal citation will be generated here.';
        case 'website':
            return 'Chicago Website citation will be generated here.';
        case 'newspaper':
            return 'Chicago Newspaper citation will be generated here.';
        default:
            return 'Please select a valid source type.';
    }
}

/**
 * Generate a Chicago book citation
 * @returns {string} The formatted citation
 */
function generateChicagoBookCitation() {
    const author = document.getElementById('chicago-book-author').value.trim() || '[Author]';
    const title = document.getElementById('chicago-book-title').value.trim() || '[Title]';
    const publisher = document.getElementById('chicago-book-publisher').value.trim() || '[Publisher]';
    const year = document.getElementById('chicago-book-year').value.trim() || '[Year]';
    const city = document.getElementById('chicago-book-city').value.trim() || '[City]';
    
    // Format: Author. Title. City: Publisher, Year.
    return `${author}. <em>${title}</em>. ${city}: ${publisher}, ${year}.`;
}

/**
 * Set up copy citation functionality
 */
function setupCopyCitation() {
    const copyButtons = document.querySelectorAll('.copy-citation-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parentResult = this.closest('.citation-result');
            const citationText = parentResult.querySelector('.citation-text p').textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(citationText).then(() => {
                // Show success message
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                // Reset button text after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
}