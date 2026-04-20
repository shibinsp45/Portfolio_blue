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

// 8. Project Carousel Scroll
const scrollNextBtn = document.querySelector('.scroll-next-btn');
const scrollPrevBtn = document.querySelector('.scroll-prev-btn');
const projectsGrid = document.querySelector('.projects-grid');

if (projectsGrid) {
    const cardWidth = projectsGrid.querySelector('.project-card')?.offsetWidth || 300;
    const gap = 20;
    const scrollAmount = cardWidth + gap;

    if (scrollNextBtn) {
        scrollNextBtn.addEventListener('click', () => {
            // Check if we are at the end (tolerating small pixel differences)
            const maxScrollLeft = projectsGrid.scrollWidth - projectsGrid.clientWidth;

            if (projectsGrid.scrollLeft >= maxScrollLeft - 10) {
                // Rewind to start
                projectsGrid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                projectsGrid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        });
    }

    if (scrollPrevBtn) {
        scrollPrevBtn.addEventListener('click', () => {
            if (projectsGrid.scrollLeft <= 10) {
                // Loop to end
                projectsGrid.scrollTo({ left: projectsGrid.scrollWidth, behavior: 'smooth' });
            } else {
                projectsGrid.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            }
        });
    }
}

// 9. Project Filtering
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add to clicked
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filterValue === 'all' || filterValue === category) {
                card.style.display = 'flex';
                // Reset animation/opacity
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

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

// 10. Dynamic Stats Counter
const statsSection = document.querySelector('#stats-section');
const statNumbers = document.querySelectorAll('.stat-number');

function startCount(el) {
    // Clear any existing timer to prevent overlaps
    if (el.dataset.timerId) {
        clearInterval(parseInt(el.dataset.timerId));
    }

    const target = parseFloat(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = 20;
    const totalSteps = duration / step;
    let currentStep = 0;

    // For float numbers like 1.5, we want to show decimal places
    const isFloat = target % 1 !== 0;

    const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / totalSteps;
        // Ease out quart
        const easedProgress = 1 - Math.pow(1 - progress, 4);

        let currentVal = target * easedProgress;

        if (isFloat) {
            el.textContent = currentVal.toFixed(1) + suffix;
        } else {
            el.textContent = Math.floor(currentVal) + suffix;
        }

        if (currentStep >= totalSteps) {
            clearInterval(timer);
            // Ensure final value format matches exactly the loop format
            if (isFloat) {
                el.textContent = target.toFixed(1) + suffix;
            } else {
                el.textContent = target + suffix;
            }
            delete el.dataset.timerId;
        }
    }, step);

    // Store timer ID to clear it later if needed
    el.dataset.timerId = timer;
}

function resetCount(el) {
    if (el.dataset.timerId) {
        clearInterval(parseInt(el.dataset.timerId));
        delete el.dataset.timerId;
    }
    el.textContent = "0";
}

if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate when entering view
                statNumbers.forEach(num => startCount(num));
            } else {
                // Reset when leaving view (so it can animate again)
                statNumbers.forEach(num => resetCount(num));
            }
        });
    }, { threshold: 0.1 });

    observer.observe(statsSection);
}
