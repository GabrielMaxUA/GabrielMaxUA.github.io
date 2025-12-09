// Modern JavaScript with all animations and interactions
// No jQuery dependency

document.addEventListener("DOMContentLoaded", function() {

    // ========================================
    // Matrix-Style Code Background Animation
    // ========================================
    const codeBackground = document.getElementById('codeBackground');
    const codeSnippets = [
        'const portfolio = { name: "Max Gabriel", role: "Developer" };',
        'function buildFuture() { return innovation + passion; }',
        'import { skills } from "./expertise";',
        'while (learning) { skills++; }',
        'const tech = ["React", "Angular", "Swift", "UIKit"];',
        'async function createSolutions() { await deploy(); }',
        'export default class Developer extends Learner {}',
        'if (challenge) { solve(creatively); }',
        'const dream = code + dedication;',
        'let experience = projects.map(learn);',
        'return success ? celebrate() : keepTrying();',
        'class Portfolio { constructor() { this.awesome = true; }}',
        '() => { pursue(excellence); }',
        'for (let i = 0; i < infinity; i++) { grow(); }',
        'const future = await buildCareer();',
        'git commit -m "Building amazing things"',
        'npm run build && deploy --production',
        'docker build -t innovation:latest .',
        '<div className="passion">Code</div>',
        'SELECT * FROM opportunities WHERE growth = true;'
    ];

    function createCodeLine() {
        const line = document.createElement('div');
        line.className = 'code-line';
        line.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

        // Random vertical position
        line.style.top = Math.random() * 100 + '%';

        // Random animation duration (slower = more variation)
        const duration = 15 + Math.random() * 25; // 15-40 seconds
        line.style.animationDuration = duration + 's';

        // Random delay
        line.style.animationDelay = Math.random() * 5 + 's';

        // Random opacity
        line.style.opacity = (0.08 + Math.random() * 0.12).toString();

        // Random colors (cyan, blue, purple)
        const colors = ['#00f5ff', '#0066ff', '#8b5cf6'];
        line.style.color = colors[Math.floor(Math.random() * colors.length)];

        codeBackground.appendChild(line);

        // Remove after animation
        setTimeout(() => {
            line.remove();
        }, (duration + 5) * 1000);
    }

    // Create initial code lines
    for (let i = 0; i < 12; i++) {
        setTimeout(() => createCodeLine(), i * 800);
    }

    // Continuously add new code lines
    setInterval(createCodeLine, 3000);


    // ========================================
    // Hamburger Menu Toggle
    // ========================================
    const menu = document.querySelector('.menu');
    const side = document.querySelector('aside');

    menu.addEventListener('click', function() {
        menu.classList.toggle('active');
        side.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!side.contains(event.target) && !menu.contains(event.target)) {
            menu.classList.remove('active');
            side.classList.remove('active');
        }
    });


    // ========================================
    // Navigation and Section Switching
    // ========================================
    const aboutLink = document.querySelector("#about");
    const goalsLink = document.querySelector("#goals");
    const linksLink = document.querySelector("#links");

    const aboutSection = document.querySelector(".aText");
    const goalsSection = document.querySelector(".leftSide");
    const linksSection = document.querySelector(".rightSide");

    const allSections = [aboutSection, goalsSection, linksSection];
    const allLinks = [aboutLink, goalsLink, linksLink];

    // Function to hide all sections with fade out
    function hideAllSections() {
        allSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            setTimeout(() => {
                section.style.display = 'none';
            }, 300);
        });
    }

    // Function to show a section with fade in
    function showSection(section) {
        section.style.display = 'block';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
            section.classList.add('show');

            // Trigger animations for children elements
            animateChildren(section);
        }, 50);
    }

    // Function to remove active class from all links
    function removeActiveClassFromLinks() {
        allLinks.forEach(link => link.classList.remove("Active"));
    }

    // Initialize - show About section
    aboutLink.classList.add("Active");
    goalsSection.style.display = "none";
    linksSection.style.display = "none";

    // Show About section initially
    setTimeout(() => {
        aboutSection.classList.add('show');
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
    }, 200);

    // Navigation click handlers
    aboutLink.addEventListener("click", function() {
        hideAllSections();
        setTimeout(() => showSection(aboutSection), 300);
        removeActiveClassFromLinks();
        aboutLink.classList.add("Active");
    });

    goalsLink.addEventListener("click", function() {
        hideAllSections();
        setTimeout(() => showSection(goalsSection), 300);
        removeActiveClassFromLinks();
        goalsLink.classList.add("Active");
    });

    linksLink.addEventListener("click", function() {
        hideAllSections();
        setTimeout(() => showSection(linksSection), 300);
        removeActiveClassFromLinks();
        linksLink.classList.add("Active");
    });


    // ========================================
    // Intersection Observer for Scroll Animations
    // ========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    // Callback for intersection observer
    const observerCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('show');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe category cards
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        observer.observe(category);
    });

    // Function to animate children elements when section becomes visible
    function animateChildren(section) {
        const categories = section.querySelectorAll('.category');

        categories.forEach((category, index) => {
            setTimeout(() => {
                category.classList.add('show');
            }, index * 150);
        });
    }


    // ========================================
    // Parallax Effect on Header
    // ========================================
    const header = document.querySelector('header');
    let ticking = false;

    function updateParallax(scrollPos) {
        // Subtle parallax - moves slower than scroll
        const parallaxSpeed = 0.5;
        const yPos = -(scrollPos * parallaxSpeed);

        if (header) {
            header.style.backgroundPositionY = `${yPos}px`;
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

        // Use requestAnimationFrame for smooth performance
        if (!ticking) {
            window.requestAnimationFrame(() => updateParallax(scrollPos));
            ticking = true;
        }
    });


    // ========================================
    // Smooth Hover Effects Enhancement
    // ========================================
    // Add ripple effect to navigation items
    const navItems = document.querySelectorAll('.left h4, .right h4');

    navItems.forEach(item => {
        item.addEventListener('mouseenter', function(e) {
            this.style.transform = 'scale(1.05)';
        });

        item.addEventListener('mouseleave', function(e) {
            this.style.transform = 'scale(1)';
        });
    });


    // ========================================
    // Profile Image Animation on Load
    // ========================================
    const profileImg = document.querySelector('.aImg');
    if (profileImg) {
        setTimeout(() => {
            profileImg.style.animation = 'fadeIn 0.8s ease-out forwards';
        }, 300);
    }


    // ========================================
    // Add subtle floating animation to cards
    // ========================================
    function addFloatingAnimation() {
        const categories = document.querySelectorAll('.category');

        categories.forEach((category, index) => {
            // Random delay for each card
            const delay = Math.random() * 2;
            category.style.animationDelay = `${delay}s`;
        });
    }

    // Call after elements are visible
    setTimeout(addFloatingAnimation, 1000);


    // ========================================
    // Smooth Scroll Behavior Enhancement
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });


    // ========================================
    // Add Loading Animation
    // ========================================
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });


    // ========================================
    // Responsive Menu Enhancement
    // ========================================
    // Close menu when clicking on navigation links in mobile
    const mobileNavLinks = document.querySelectorAll('.left h4, .right h4');

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menu.classList.remove('active');
                side.classList.remove('active');
            }
        });
    });


    // ========================================
    // Add Cursor Trail Effect (Subtle)
    // ========================================
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Subtle cursor follower (only on larger screens)
    if (window.innerWidth > 768) {
        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.1;
            cursorY += dy * 0.1;

            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }


    // ========================================
    // Preload Optimization
    // ========================================
    // Lazy load images that are not immediately visible
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));


    // ========================================
    // Performance Optimization
    // ========================================
    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Handle window resize
    const handleResize = debounce(function() {
        // Reset animations on resize if needed
        console.log('Window resized - optimized');
    }, 250);

    window.addEventListener('resize', handleResize);


    // ========================================
    // Console Easter Egg
    // ========================================
    console.log('%c🚀 Welcome to Max Gabriel\'s Portfolio! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 8px;');
    console.log('%cBuilt with modern web technologies and love ❤️', 'color: #667eea; font-size: 12px; font-style: italic;');

});
