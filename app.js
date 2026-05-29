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
   2. PROJECT DATA
   ========================================================================== */

// Project database containing detailed specifications for dynamic rendering
const projects = {
    'lotus-blossom': {
        title: 'Lotus Blossom Study',
        year: '2026',
        completed: '36.05.29',
        medium: 'Ink on Rice Paper',
        size: '45 × 60 cm',
        overview: 'A series of gestural ink studies exploring the transition of the lotus flower from bud to decay. Painted on raw mulberry paper, each stroke captures the tension between liquid ink and absorbent fiber. The series serves as an investigation into quiet permanence.',
        heroImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        detailImages: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23dcdcdc'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23d3d3d3'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23c0c0c0'/></svg>"
        ],
        quote: '"In every flower, there is a choreography of gravity and light."',
        footerImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        footerCaption: 'Lotus Blossom Study, ink dispersion detail under magnification. 2026.'
    },
    'submerged-shadows': {
        title: 'Submerged Shadows',
        year: '2025',
        completed: '35.11.14',
        medium: 'Acrylic on Canvas',
        size: '120 × 90 cm',
        overview: 'Submerged Shadows explores the deep greens and shifting blues of pond water under overcast skies. Built up through forty thin layers of acrylic glaze, the painting shifts in depth and color response depending on the angles and intensity of light hitting its surface.',
        heroImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        detailImages: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23dcdcdc'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23d3d3d3'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23c0c0c0'/></svg>"
        ],
        quote: '"Water does not resist; it absorbs the shadows cast above it."',
        footerImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        footerCaption: 'Submerged Shadows, detail of the organic surface glazes.'
    },
    'ephemeral-waters': {
        title: 'Ephemeral Waters',
        year: '2025',
        completed: '35.08.22',
        medium: 'Digital Projection & Sound',
        size: 'Dimensions Variable',
        overview: 'An immersive site-specific installation projecting generative ripples onto floating panels of transparent silk. The movement of the ripples is modulated by live hydrophone data recorded from a nearby natural pond, paired with a low-frequency soundscape.',
        heroImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        detailImages: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23dcdcdc'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23d3d3d3'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23c0c0c0'/></svg>"
        ],
        quote: '"To capture flow, one must allow the screen itself to float."',
        footerImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        footerCaption: 'Generative software wave mapping detail.'
    },
    'echoes-silence': {
        title: 'Echoes of Silence',
        year: '2024',
        completed: '34.12.02',
        medium: 'Stoneware & Lotus Pond Clay',
        size: '30 × 30 × 45 cm',
        overview: 'A collection of ceramic vessels coiled by hand using local wild clay sourced from ancient lotus ponds. The vessels were wood-fired in an anagama kiln for three days, leaving raw ash deposits and flame paths permanently etched onto their tactile surfaces.',
        heroImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        detailImages: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23dcdcdc'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23d3d3d3'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23c0c0c0'/></svg>"
        ],
        quote: '"The clay retains the memory of the water that once held it."',
        footerImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        footerCaption: 'Echoes of Silence, surface texture showing natural ash glaze.'
    },
    'floating-meditation': {
        title: 'Floating Meditation',
        year: '2026',
        completed: '36.03.18',
        medium: 'Mixed Media Installation',
        size: '240 × 180 × 120 cm',
        overview: 'A suspended sculptural grid made of hand-carved cedar wood, raw linen, and dried lotus leaves. Floating over a shallow basin of dark reflective water, the installation responds to subtle drafts in the gallery space, gently rotating in silent meditation.',
        heroImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        detailImages: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23dcdcdc'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23d3d3d3'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23c0c0c0'/></svg>"
        ],
        quote: '"A grid is not a constraint, but a net to capture the wind."',
        footerImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        footerCaption: 'Installation detail of suspended cedar frames.'
    },
    'whispering-reeds': {
        title: 'Whispering Reeds',
        year: '2024',
        completed: '34.05.10',
        medium: 'Woven Reed and Linen Thread',
        size: '80 × 160 cm',
        overview: 'A tactile tapestry constructed from harvested marsh reeds hand-woven on a floor loom with undyed linen threads. The varying density of the weave creates a rhythmic pattern that resembles the dynamic motion of wind passing over river wetlands.',
        heroImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        detailImages: [
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23e5e5e5'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23dcdcdc'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23d3d3d3'/></svg>",
            "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 300'><rect width='100%' height='100%' fill='%23c0c0c0'/></svg>"
        ],
        quote: '"The reed bends, and in bending, it catches the voice of the wind."',
        footerImage: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%23e0e0e0'/></svg>",
        footerCaption: 'Whispering Reeds, weave structure showing organic linen fibers.'
    }
};

/* ==========================================================================
   3. HASH-BASED ROUTER
   ========================================================================== */
function initRouter() {
    window.addEventListener('hashchange', handleRoute);
    handleRoute(); // Run once on load to handle deep links
}

function handleRoute() {
    const hash = window.location.hash || '';
    
    // Select elements
    const panelProjects = document.getElementById('panel-projects');
    const panelInfo = document.getElementById('panel-information');
    const panelDetail = document.getElementById('panel-project-detail');
    const navProjects = document.getElementById('nav-projects');
    const navInfo = document.getElementById('nav-info');
    
    // Reset state: Hide panels and deactivate nav links
    [panelProjects, panelInfo, panelDetail].forEach(p => p.classList.remove('active'));
    [navProjects, navInfo].forEach(n => n.classList.remove('active'));
    
    // Route matching
    if (hash === '#projects') {
        panelProjects.classList.add('active');
        navProjects.classList.add('active');
        // Scroll panel content to top when opened
        panelProjects.querySelector('.panel-content-inner').scrollTop = 0;
    } else if (hash === '#information') {
        panelInfo.classList.add('active');
        navInfo.classList.add('active');
        // Scroll panel content to top when opened
        panelInfo.querySelector('.panel-content-inner').scrollTop = 0;
    } else if (hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        if (projects[projectId]) {
            loadProjectDetail(projectId);
            panelDetail.classList.add('active');
            // Scroll detail content to top when opened
            document.getElementById('detail-content-scroll').scrollTop = 0;
        } else {
            // Project doesn't exist, fallback to home
            window.location.hash = '';
        }
    }
}

/* ==========================================================================
   4. DYNAMIC CONTENT LOADING: PROJECT DETAIL
   ========================================================================= */
function loadProjectDetail(id) {
    const data = projects[id];
    
    // Populate inline header details
    document.getElementById('detail-project-title').textContent = data.title;
    document.getElementById('detail-project-completed').textContent = `Completed: ${data.completed}`;
    
    const heroImg = document.getElementById('detail-hero-image');
    heroImg.src = data.heroImage;
    heroImg.alt = data.title;
    
    document.getElementById('detail-overview-text').innerHTML = `
        <strong>${data.title}</strong>, ${data.year}<br>
        ${data.medium}<br>
        ${data.size}<br><br>
        ${data.overview}
    `;
    
    document.getElementById('detail-quote-text').textContent = data.quote;
    
    // Load footer image
    const footerImg = document.getElementById('detail-footer-image');
    footerImg.src = data.footerImage;
    footerImg.alt = `${data.title} Footer View`;
    document.getElementById('detail-footer-caption-text').textContent = data.footerCaption;
    
    // Populate detail gallery thumbnails
    const detailsContainer = document.getElementById('detail-images-container');
    detailsContainer.innerHTML = ''; // Clear old items
    
    data.detailImages.forEach((src, index) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'image-wrapper portrait';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${data.title} Detail Image ${index + 1}`;
        img.className = 'gallery-image';
        img.loading = 'lazy';
        
        wrapper.appendChild(img);
        detailsContainer.appendChild(wrapper);
    });
}

/* ==========================================================================
   5. DOM INTERACTION EVENTS
   ========================================================================== */
function initInteraction() {
    // Logo Click -> Close all panels (reset hash)
    document.getElementById('logo-link').addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
    });
    
    // Bind all backdrop clicks to close panels (F298 closeOnClickout)
    const backdrops = document.querySelectorAll('.panel-backdrop');
    backdrops.forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            if (window.location.hash.startsWith('#project-')) {
                window.location.hash = '#projects';
            } else {
                window.location.hash = '';
            }
        });
    });
    
    // Bind gallery grid item clicking to route to detail page
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const id = item.getAttribute('data-project-id');
            window.location.hash = `#project-${id}`;
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
