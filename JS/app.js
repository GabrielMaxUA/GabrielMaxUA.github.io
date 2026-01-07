// Modern JavaScript with all animations and interactions
// No jQuery dependency

document.addEventListener("DOMContentLoaded", function() {

    // ========================================
    // Device Detection
    // ========================================
    const isMobile = window.innerWidth <= 768;

    // ========================================
    // Loading Screen
    // ========================================
    const loadingScreen = document.getElementById('loadingScreen');

    // Hide loading screen after content loads
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500); // Show loader for 1.5 seconds


    // ========================================
    // Scroll Progress Indicator
    // ========================================
    const scrollProgress = document.getElementById('scrollProgress');

    if (scrollProgress) {
        function updateScrollProgress() {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.pageYOffset / windowHeight) * 100;
            scrollProgress.style.width = scrolled + '%';
        }

        window.addEventListener('scroll', updateScrollProgress);
        updateScrollProgress(); // Initialize
    }


    // ========================================
    // Typing Animation
    // ========================================
    const typingText = document.getElementById('typingText');
    const cursor = document.querySelector('.cursor');
    const lines = [
        '• Full Stack Web Developer',
        '• Swift & SwiftUI Enthusiast'
    ];
    const text = lines.join('\n');

    let charIndex = 0;
    let typingSpeed = 100;

    function typeEffect() {
        if (charIndex <= text.length) {
            const currentText = text.substring(0, charIndex);
            // Replace newlines with <br> for HTML display and add cursor inline
            typingText.innerHTML = currentText.replace(/\n/g, '<br>') + '<span class="cursor">|</span>';
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else {
            // Animation completes - remove inline cursor
            const currentText = text.substring(0, charIndex);
            typingText.innerHTML = currentText.replace(/\n/g, '<br>');
            // Hide the original cursor element
            if (cursor) {
                cursor.style.display = 'none';
            }
            // Start social links animation after typing completes
            animateSocialLinks();
        }
    }

    // Hide the original cursor element since we're using inline cursor
    if (cursor) {
        cursor.style.display = 'none';
    }

    // Start typing animation after a short delay
    setTimeout(typeEffect, 800);

    // ========================================
    // Social Links Animation
    // ========================================
    const socialLinks = document.querySelectorAll('.social-link');

    function animateSocialLinks() {
        // Animate social links appearing one by one with 0.3s interval
        socialLinks.forEach((link, index) => {
            setTimeout(() => {
                link.classList.add('show');
            }, index * 300); // 0.3s between each icon
        });
    }

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

        // Random animation duration - slower on larger screens for readability
        const screenWidth = window.innerWidth;
        const duration = screenWidth > 770
            ? 20 + Math.random() * 15  // 20-35 seconds (slower, readable) on larger screens
            : 18 + Math.random() * 2;  // 18-20 seconds on smaller screens
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

    // Create initial code lines (reduce on mobile)
    const initialLines = isMobile ? 8 : 18;
    const intervalTime = isMobile ? 4000 : 2500;

    for (let i = 0; i < initialLines; i++) {
        setTimeout(() => createCodeLine(), i * 600);
    }

    // Continuously add new code lines (less frequently on mobile)
    setInterval(createCodeLine, intervalTime);


    // ========================================
    // Navigation and Section Switching
    // ========================================
    const aboutLink = document.querySelector("#about");
    const linksLink = document.querySelector("#links");

    const aboutSection = document.querySelector(".aText");
    const linksSection = document.querySelector(".rightSide");

    const allSections = [aboutSection, linksSection];
    const allLinks = [aboutLink, linksLink];

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
            // Remove animation after it completes so it doesn't lock the transform
            setTimeout(() => {
                profileImg.style.animation = 'none';
                profileImg.style.opacity = '1';
            }, 800);
        }, 300);
    }


    // ========================================
    // 3D Tilt Effect on Profile Image (Desktop Only)
    // ========================================
    if (!isMobile && profileImg) {
        // Set transition and transform style first
        profileImg.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        profileImg.style.transformStyle = 'preserve-3d';

        profileImg.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
            const rotateY = ((x - centerX) / centerX) * 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        profileImg.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    }


    // ========================================
    // 3D Tilt Effect on Technology Cards (Desktop Only)
    // ========================================
    if (!isMobile) {
        categories.forEach(category => {
            category.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg tilt
                const rotateY = ((x - centerX) / centerX) * 10;

                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            category.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });

            // Add transition for smooth tilt
            category.style.transition = 'transform 0.3s ease';
        });
    }

    // ========================================
    // Add subtle floating animation to cards
    // ========================================
    function addFloatingAnimation() {
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
