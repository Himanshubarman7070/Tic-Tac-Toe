document.addEventListener('DOMContentLoaded', () => {
    // 1. LOADING SCREEN HANDLER
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1500);
    }

    // 2. SIDEBAR ELEMENTS
    const menuBtn = document.getElementById('menuBtn');
    const closeBtn = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    // 3. TOGGLE FUNCTION
    const toggleSidebar = (state) => {
        if (state) {
            sidebar.classList.add('open');
            overlay.classList.add('active');
        } else {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }
    };

    // 4. EVENT LISTENERS
    menuBtn.addEventListener('click', () => toggleSidebar(true));
    closeBtn.addEventListener('click', () => toggleSidebar(false));
    overlay.addEventListener('click', () => toggleSidebar(false));

    // Handle Active Menu States
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            if (!item.classList.contains('logout')) {
                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            }
        });
    });
});