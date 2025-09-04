// Dashboard JavaScript Functionality

// Navigation history for back functionality
let navigationHistory = [];

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initialized');
    initializeTabSwitching();
    initializeFormSubmissions();
    initializeNavigation();
});

// Navigation between sections with history tracking
function showSection(sectionName) {
    // Add to navigation history
    if (navigationHistory.length === 0 || navigationHistory[navigationHistory.length - 1] !== sectionName) {
        navigationHistory.push(sectionName);
    }
    
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionName + '-section');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update active menu item
    const menuItems = document.querySelectorAll('aside ul li');
    menuItems.forEach(item => {
        item.classList.remove('bg-brand-blue-600');
        item.classList.add('custom-hover');
        const link = item.querySelector('a');
        if (link) {
            link.classList.remove('dark:text-dark-base-600');
            link.classList.add('dark:text-dark-base-400');
        }
        // Remove active indicator
        const indicator = item.querySelector('.absolute');
        if (indicator) {
            indicator.style.opacity = '0';
        }
    });
    
    // Set active menu item
    const activeMenuItem = document.getElementById(sectionName + '-menu');
    if (activeMenuItem) {
        activeMenuItem.classList.add('bg-brand-blue-600');
        activeMenuItem.classList.remove('custom-hover');
        const link = activeMenuItem.querySelector('a');
        if (link) {
            link.classList.add('dark:text-dark-base-600');
            link.classList.remove('dark:text-dark-base-400');
        }
        // Show active indicator
        const indicator = activeMenuItem.querySelector('.absolute');
        if (indicator) {
            indicator.style.opacity = '1';
        }
    }
}

// Back navigation function
function goBack() {
    if (navigationHistory.length > 1) {
        // Remove current page from history
        navigationHistory.pop();
        // Go to previous page
        const previousSection = navigationHistory[navigationHistory.length - 1];
        // Remove from history to avoid duplicates
        navigationHistory.pop();
        showSection(previousSection);
    } else {
        // If no history, go to login page
        window.location.href = 'index.html';
    }
}

// Initialize navigation
function initializeNavigation() {
    // Set default active section (clients)
    showSection('clients');
}

// Tab switching functionality
function initializeTabSwitching() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            
            // Remove active class from all tab buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active', 'border-brand-blue-600', 'text-brand-blue-600');
                btn.classList.add('border-transparent', 'text-dark-base-400');
            });
            
            // Add active class to clicked button
            this.classList.add('active', 'border-brand-blue-600', 'text-brand-blue-600');
            this.classList.remove('border-transparent', 'text-dark-base-400');
            
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            const targetTab = document.getElementById(tabName + '-tab');
            if (targetTab) {
                targetTab.classList.add('active');
            }
        });
    });
}

// Modal functionality
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Add animation
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
        
        // Add event listener to close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal(modalId);
            }
        });
    }
}

function hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 150);
        
        // Reset form if it exists
        const form = modal.querySelector('form');
        if (form) {
            form.reset();
        }
    }
}

// Form submission handlers
function initializeFormSubmissions() {
    // Add Lead Form
    const addLeadForm = document.getElementById('addLeadForm');
    if (addLeadForm) {
        addLeadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const leadData = Object.fromEntries(formData);
            
            // Show success notification
            showNotification('Lead added successfully!', 'success');
            
            // Reset form and close modal
            this.reset();
            hideModal('addLeadModal');
            
            // In a real application, you would send this data to your backend
            console.log('New lead data:', leadData);
        });
    }
    
    // Add Customer Form
    const addCustomerForm = document.getElementById('addCustomerForm');
    if (addCustomerForm) {
        addCustomerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const customerData = Object.fromEntries(formData);
            
            // Show success notification
            showNotification('Customer added successfully!', 'success');
            
            // Reset form and close modal
            this.reset();
            hideModal('addCustomerModal');
            
            // In a real application, you would send this data to your backend
            console.log('New customer data:', customerData);
        });
    }
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm`;
    
    // Set notification style based on type
    const styles = {
        'success': 'bg-green-600 text-white border border-green-700',
        'error': 'bg-red-600 text-white border border-red-700',
        'warning': 'bg-yellow-600 text-white border border-yellow-700',
        'info': 'bg-blue-600 text-white border border-blue-700'
    };
    
    notification.className += ` ${styles[type] || styles.info}`;
    
    // Add icon based on type
    const icons = {
        'success': '✓',
        'error': '✕',
        'warning': '⚠',
        'info': 'ℹ'
    };
    
    notification.innerHTML = `
        <div class="flex items-center gap-3">
            <span class="text-lg font-bold">${icons[type] || icons.info}</span>
            <span class="font-medium">${message}</span>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Logout functionality
function logout() {
    // Clear any stored session data
    localStorage.removeItem('cautio_logged_in');
    localStorage.clear();
    
    // Show notification
    showNotification('Logging out...', 'info');
    
    // Redirect to login page after a brief delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Enhanced form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-600');
            input.classList.remove('border-success-600');
        } else {
            input.classList.remove('border-red-600');
            input.classList.add('border-success-600');
        }
    });
    
    return isValid;
}

// Real-time form validation
document.addEventListener('input', function(e) {
    if (e.target.hasAttribute('required')) {
        if (e.target.value.trim()) {
            e.target.classList.remove('border-red-600');
            e.target.classList.add('border-green-600');
        } else {
            e.target.classList.add('border-red-600');
            e.target.classList.remove('border-green-600');
        }
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const visibleModals = document.querySelectorAll('.modal:not(.hidden)');
        visibleModals.forEach(modal => {
            hideModal(modal.id);
        });
    }
    
    // Alt + Backspace for back navigation
    if (e.altKey && e.key === 'Backspace') {
        e.preventDefault();
        goBack();
    }
    
    // Ctrl+N for new lead
    if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        showModal('addLeadModal');
    }
    
    // Ctrl+Shift+N for new customer
    if (e.ctrlKey && e.shiftKey && e.key === 'N') {
        e.preventDefault();
        showModal('addCustomerModal');
    }
    
    // Number keys for quick navigation
    if (e.altKey && ['1', '2', '3', '4'].includes(e.key)) {
        e.preventDefault();
        const sections = ['clients', 'finance', 'inventory', 'ground-operations'];
        const sectionIndex = parseInt(e.key) - 1;
        if (sections[sectionIndex]) {
            showSection(sections[sectionIndex]);
        }
    }
});

// Auto-save form data to localStorage
function autoSaveFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            localStorage.setItem(formId + '_autosave', JSON.stringify(data));
        });
    });
    
    // Load saved data on page load
    const savedData = localStorage.getItem(formId + '_autosave');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input && data[key]) {
                    input.value = data[key];
                }
            });
        } catch (error) {
            console.error('Error loading autosaved data:', error);
        }
    }
}

// Initialize auto-save for forms
document.addEventListener('DOMContentLoaded', function() {
    autoSaveFormData('addLeadForm');
    autoSaveFormData('addCustomerForm');
});

// Clear auto-saved data when form is submitted
document.addEventListener('submit', function(e) {
    const formId = e.target.id;
    if (formId) {
        localStorage.removeItem(formId + '_autosave');
    }
});

// Loading state management
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'loading';
    loader.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loader.innerHTML = `
        <div class="bg-dark-fill-base-300 rounded-lg p-6 text-center border border-dark-base-500">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue-600 mx-auto mb-4"></div>
            <p class="text-dark-base-600">Loading...</p>
        </div>
    `;
    document.body.appendChild(loader);
}

function hideLoading() {
    const loader = document.getElementById('loading');
    if (loader) {
        loader.remove();
    }
}

// Enhanced error handling
window.addEventListener('error', function(e) {
    console.error('Dashboard error:', e.error);
    showNotification('An error occurred. Please try again.', 'error');
});

// Performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Search functionality
function searchData(query, data) {
    if (!query) return data;
    
    return data.filter(item => {
        return Object.values(item).some(value => 
            value.toString().toLowerCase().includes(query.toLowerCase())
        );
    });
}

// Export functionality
function exportToCSV(data, filename) {
    const csv = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    
    window.URL.revokeObjectURL(url);
}

// Responsive sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('aside');
    const content = document.querySelector('.ml-\\[4\\.68rem\\]');
    
    if (window.innerWidth < 768) {
        sidebar.classList.toggle('hidden');
        content.classList.toggle('ml-0');
    }
}

// Handle responsive behavior
window.addEventListener('resize', function() {
    const sidebar = document.querySelector('aside');
    const content = document.querySelector('.ml-\\[4\\.68rem\\]');
    
    if (window.innerWidth >= 768) {
        sidebar.classList.remove('hidden');
        content.classList.add('ml-[4.68rem]');
        content.classList.remove('ml-0');
    }
});

// Initialize analytics (placeholder)
function initializeAnalytics() {
    console.log('Analytics initialized');
}

// API communication helpers (for future backend integration)
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        showLoading();
        
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(endpoint, options);
        const result = await response.json();
        
        hideLoading();
        
        if (!response.ok) {
            throw new Error(result.message || 'API call failed');
        }
        
        return result;
    } catch (error) {
        hideLoading();
        showNotification(error.message, 'error');
        throw error;
    }
}

// Data persistence helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Failed to save to localStorage:', error);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Failed to load from localStorage:', error);
        return null;
    }
}

// Theme management
function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('dark')) {
        body.classList.remove('dark');
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light');
        body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
    }
});

// Help system
function showHelp() {
    const helpModal = document.createElement('div');
    helpModal.className = 'modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    helpModal.innerHTML = `
        <div class="bg-dark-fill-base-300 rounded-lg p-6 w-full max-w-2xl mx-4 border border-dark-base-500 max-h-96 overflow-y-auto">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-heading-6 dark:text-dark-base-600">Keyboard Shortcuts</h2>
                <button onclick="this.closest('.modal').remove()" class="text-dark-base-400 hover:text-dark-base-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div class="space-y-3 text-sm">
                <div class="flex justify-between"><span>Alt + Backspace</span><span>Go Back</span></div>
                <div class="flex justify-between"><span>Ctrl + N</span><span>New Lead</span></div>
                <div class="flex justify-between"><span>Ctrl + Shift + N</span><span>New Customer</span></div>
                <div class="flex justify-between"><span>Alt + 1-4</span><span>Quick Navigation</span></div>
                <div class="flex justify-between"><span>Escape</span><span>Close Modals</span></div>
                <div class="flex justify-between"><span>F1</span><span>Show Help</span></div>
            </div>
        </div>
    `;
    document.body.appendChild(helpModal);
}

// Add F1 help shortcut
document.addEventListener('keydown', function(e) {
    if (e.key === 'F1') {
        e.preventDefault();
        showHelp();
    }
});

// Dashboard initialization complete
console.log('Cautio Dashboard v1.0 - Ready');

// Run initialization
document.addEventListener('DOMContentLoaded', function() {
    initializeAnalytics();
});
