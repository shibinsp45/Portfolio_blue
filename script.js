// DOM Elements
const header = document.querySelector('.header');
const revealElements = document.querySelectorAll('.reveal');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const iconElement = themeToggle.querySelector('i');

// 1. Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');

    if (body.classList.contains('light-mode')) {
        // Switch to Sun Icon
        iconElement.setAttribute('data-lucide', 'sun');
    } else {
        // Switch back to Sparkles
        iconElement.setAttribute('data-lucide', 'sparkles');
    }

    // Refresh icons
    lucide.createIcons();
});

// 2. Scroll Effect for Header (Disabled for Floating Pill, logic removed or minimized)
// The floating pill style is static/fixed, so we don't need background changes on scroll
// unless user wants it to stick. For now leaving empty to preserve pill style.

// 3. Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// 4. Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Adjusted offset
                behavior: 'smooth'
            });
        }
    });
});

// 5. Draggable Skill Tags
const skillTags = document.querySelectorAll('.skill-tag');

skillTags.forEach(tag => {
    // Randomize Animation Delay for natural feel
    tag.style.animationDelay = `${Math.random() * 2}s`;

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    tag.addEventListener('mousedown', (e) => {
        isDragging = true;
        tag.classList.add('dragging'); // Optional class for styling

        // Get current mouse position
        startX = e.clientX;
        startY = e.clientY;

        // Get current element position (relative to parent via left/top)
        // If not set yet, it defaults to auto (0 relative to flow), so we computedStyle
        const style = window.getComputedStyle(tag);
        const matrix = new WebKitCSSMatrix(style.transform);

        // We are using Left/Top for position movement to not conflict with Transform Animation
        // But initially they might be 'auto'.
        initialLeft = parseInt(style.left === 'auto' ? 0 : style.left);
        initialTop = parseInt(style.top === 'auto' ? 0 : style.top);

        // Prevent default text selection
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        tag.style.left = `${initialLeft + deltaX}px`;
        tag.style.top = `${initialTop + deltaY}px`;
    });

    window.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            tag.classList.remove('dragging');
        }
    });
});

// 6. Init Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// 7. Timeline Airplane Scroll Effect
const timelineContainer = document.querySelector('.timeline');
const timelinePlane = document.querySelector('.timeline-plane');

if (timelineContainer && timelinePlane) {
    window.addEventListener('scroll', () => {
        const rect = timelineContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate progress: 0 when top of timeline enters view, 1 when bottom leaves?
        // Let's make it travel from 0% to 100% of the timeline height based on how much of the timeline we've scrolled past.

        // Start moving when timeline top is near center of screen
        const startOffset = viewportHeight * 0.8;
        const totalDistance = rect.height;

        // Relative scroll position
        // When rect.top is viewportHeight, progress is 0.
        // When rect.bottom is 0, progress is slightly > 1.

        // Distance scrolled relative to the timeline start
        const scrolled = (viewportHeight * 0.5) - rect.top;

        let progress = scrolled / totalDistance;

        // Clamp progress
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        timelinePlane.style.top = `${progress * 100}%`;
    });
}
