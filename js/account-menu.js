// Account menu functionality - Shared across all pages

function updateAccountMenu() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const accountLink = document.getElementById('accountLink');
    const accountText = document.getElementById('accountText');
    const accountMenu = document.getElementById('accountMenu');
    const accountMenuItems = document.getElementById('accountMenuItems');
    
    if (!accountLink || !accountText || !accountMenu || !accountMenuItems) {
        return; // Elements don't exist on this page
    }
    
    // Update account text
    if (currentUser) {
        accountText.textContent = currentUser.name ? currentUser.name.split(' ')[0] : 'Account';
    } else {
        accountText.textContent = 'Account';
    }
    
    // Build menu items - always show Login, Register, and Admin
    let menuHTML = '';
    
    if (currentUser) {
        // User is logged in - show profile/logout instead of login/register
        menuHTML += `
            <a href="#" style="display: block; padding: 12px 16px; color: var(--color-text-dark); border-bottom: 1px solid var(--color-beige-dark);">
                <i class="fas fa-user"></i> My Profile
            </a>
            <a href="#" onclick="logoutUser(); return false;" style="display: block; padding: 12px 16px; color: var(--color-text-dark); border-bottom: 1px solid var(--color-beige-dark);">
                <i class="fas fa-sign-out-alt"></i> Logout
            </a>
        `;
    } else {
        // User is not logged in - show login and register
        menuHTML += `
            <a href="login.html" style="display: block; padding: 12px 16px; color: var(--color-text-dark); border-bottom: 1px solid var(--color-beige-dark);">
                <i class="fas fa-sign-in-alt"></i> Login
            </a>
            <a href="register.html" style="display: block; padding: 12px 16px; color: var(--color-text-dark); border-bottom: 1px solid var(--color-beige-dark);">
                <i class="fas fa-user-plus"></i> Register
            </a>
        `;
    }
    
    // Always show Admin Dashboard link
    menuHTML += `
        <a href="admin-dashboard.html" style="display: block; padding: 12px 16px; color: var(--color-text-dark);">
            <i class="fas fa-tachometer-alt"></i> Admin Dashboard
        </a>
    `;
    
    accountMenuItems.innerHTML = menuHTML;
}

function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        updateAccountMenu();
        window.location.href = 'index.html';
    }
}

// Initialize account menu when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    updateAccountMenu();
    
    const accountLink = document.getElementById('accountLink');
    const accountMenu = document.getElementById('accountMenu');
    
    if (accountLink && accountMenu) {
        accountLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent event from bubbling up
            const isVisible = accountMenu.style.display === 'block';
            accountMenu.style.display = isVisible ? 'none' : 'block';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (accountMenu && !e.target.closest('.account-dropdown')) {
                accountMenu.style.display = 'none';
            }
        });
        
        // Prevent closing when clicking inside the menu
        if (accountMenu) {
            accountMenu.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }
    }
});

