/* ==========================================================================
   BLUE LOTUS DEN — CORE JS LOGIC (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initRouter();
    initInteraction();
});

/* ==========================================================================
   1. LIVE DIGITAL CLOCK
   ========================================================================== */
function initClock() {
    const clockEl = document.getElementById('digital-clock');
    
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        clockEl.textContent = `${hours}:${minutes}:${seconds}`;
        
        // Request next frame at the next second interval
        const delay = 1000 - (now.getMilliseconds());
        setTimeout(updateClock, delay);
    }
    
    updateClock();
}

/* ==========================================================================
   2. HASH-BASED ROUTER
   ========================================================================== */
function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Run once on load to handle deep links
}

function handleRoute() {
    const hash = window.location.hash || '';
    
    // Select elements
    const panelTriumph = document.getElementById('panel-triumph');
    const panelLonelyGuy = document.getElementById('panel-lonely-guy');
    const panelInfo = document.getElementById('panel-information');
    const navTriumph = document.getElementById('nav-triumph');
    const navLonelyGuy = document.getElementById('nav-lonely-guy');
    const navInfo = document.getElementById('nav-info');
    const clockContainer = document.getElementById('clock-container');
    
    // Reset state: Hide panels and deactivate nav links
    [panelTriumph, panelLonelyGuy, panelInfo].forEach(p => {
        if (p) p.classList.remove('active');
    });
    [navTriumph, navLonelyGuy, navInfo].forEach(n => {
        if (n) n.classList.remove('active');
    });
    
    // Hide clock when panel overlays are open
    if (hash === '#triumph' || hash === '#lonely-guy' || hash === '#information') {
        if (clockContainer) clockContainer.style.display = 'none';
    } else {
        if (clockContainer) clockContainer.style.display = 'block';
    }
    
    // Route matching
    if (hash === '#triumph' && panelTriumph) {
        panelTriumph.classList.add('active');
        if (navTriumph) navTriumph.classList.add('active');
        panelTriumph.querySelector('.panel-content-inner').scrollTop = 0;
    } else if (hash === '#lonely-guy' && panelLonelyGuy) {
        panelLonelyGuy.classList.add('active');
        if (navLonelyGuy) navLonelyGuy.classList.add('active');
        panelLonelyGuy.querySelector('.panel-content-inner').scrollTop = 0;
    } else if (hash === '#information' && panelInfo) {
        panelInfo.classList.add('active');
        if (navInfo) navInfo.classList.add('active');
        panelInfo.querySelector('.panel-content-inner').scrollTop = 0;
    }
}

/* ==========================================================================
   3. DOM INTERACTION EVENTS
   ========================================================================== */
function initInteraction() {
    // Logo Click -> Close all panels (reset hash)
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.hash = '';
        });
    }
    
    // Bind all backdrop clicks to close panels (F298 closeOnClickout)
    const backdrops = document.querySelectorAll('.panel-backdrop');
    backdrops.forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            window.location.hash = '';
        });
    });
    
    // Bind all close buttons
    const closeBtns = document.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.hash = '';
        });
    });
    
    // Smooth scrolling for back to top links
    const topLinks = document.querySelectorAll('.top-link');
    topLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const panelContent = link.closest('.panel-content-inner');
            if (panelContent) {
                panelContent.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
}
