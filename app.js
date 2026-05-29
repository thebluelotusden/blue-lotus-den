/* ==========================================================================
   BLUE LOTUS DEN — CORE JS LOGIC (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initClock();
    initRouter();
    initInteraction();
    initAudioPlayers();
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
    
    // Stop any playing audio when switching sections or closing
    stopAllAudio();
    
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

/* ==========================================================================
   4. CUSTOM AUDIO PLAYERS (Soundtrack)
   ========================================================================== */
function initAudioPlayers() {
    const rows = document.querySelectorAll('.audio-player-row');
    if (!rows.length) return;
    
    let activeDragPlayer = null;
    
    function formatTime(seconds) {
        if (isNaN(seconds)) return '00:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    
    rows.forEach(row => {
        const audio = row.querySelector('audio');
        const playBtn = row.querySelector('.audio-play-btn');
        const progressContainer = row.querySelector('.audio-progress-container');
        const progressFill = row.querySelector('.audio-progress-fill');
        const timestamp = row.querySelector('.audio-timestamp');
        
        if (!audio || !playBtn || !progressContainer || !progressFill || !timestamp) return;
        
        // Play/Pause button click
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                // Pause all other audios
                rows.forEach(otherRow => {
                    const otherAudio = otherRow.querySelector('audio');
                    if (otherAudio && otherAudio !== audio) {
                        otherAudio.pause();
                    }
                });
                audio.play();
            } else {
                audio.pause();
            }
        });
        
        // Audio state events
        audio.addEventListener('play', () => {
            playBtn.classList.add('playing');
        });
        
        audio.addEventListener('pause', () => {
            playBtn.classList.remove('playing');
        });
        
        audio.addEventListener('ended', () => {
            playBtn.classList.remove('playing');
            progressFill.style.width = '0%';
            timestamp.textContent = '00:00';
        });
        
        audio.addEventListener('timeupdate', () => {
            if (activeDragPlayer !== dragController) {
                const percentage = (audio.currentTime / audio.duration) * 100 || 0;
                progressFill.style.width = percentage + '%';
                timestamp.textContent = formatTime(audio.currentTime);
            }
        });
        
        // Handle metadata loaded (for duration setup)
        audio.addEventListener('loadedmetadata', () => {
            timestamp.textContent = formatTime(audio.currentTime);
        });
        
        // Drag controller object for this player
        const dragController = {
            getPercentage(e) {
                const rect = progressContainer.getBoundingClientRect();
                const clientX = e.touches ? e.touches[0].clientX : e.clientX;
                let percentage = (clientX - rect.left) / rect.width;
                return Math.max(0, Math.min(1, percentage));
            },
            startDrag(e) {
                activeDragPlayer = dragController;
                progressContainer.classList.add('dragging');
                dragController.updateDrag(e);
                e.preventDefault();
            },
            updateDrag(e) {
                const percentage = dragController.getPercentage(e);
                progressFill.style.width = (percentage * 100) + '%';
                if (audio.duration) {
                    timestamp.textContent = formatTime(percentage * audio.duration);
                }
            },
            endDrag(e) {
                progressContainer.classList.remove('dragging');
                const percentage = dragController.getPercentage(e);
                if (audio.duration) {
                    audio.currentTime = percentage * audio.duration;
                }
                activeDragPlayer = null;
            }
        };
        
        progressContainer.addEventListener('mousedown', (e) => dragController.startDrag(e));
        progressContainer.addEventListener('touchstart', (e) => dragController.startDrag(e), { passive: false });
    });
    
    // Global drag handlers
    window.addEventListener('mousemove', (e) => {
        if (activeDragPlayer) activeDragPlayer.updateDrag(e);
    });
    window.addEventListener('mouseup', (e) => {
        if (activeDragPlayer) activeDragPlayer.endDrag(e);
    });
    window.addEventListener('touchmove', (e) => {
        if (activeDragPlayer) activeDragPlayer.updateDrag(e);
    }, { passive: true });
    window.addEventListener('touchend', (e) => {
        if (activeDragPlayer) activeDragPlayer.endDrag(e);
    });
}

function stopAllAudio() {
    const audios = document.querySelectorAll('.audio-player-row audio');
    audios.forEach(audio => {
        audio.pause();
    });
}
