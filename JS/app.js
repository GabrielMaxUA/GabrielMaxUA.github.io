// Progressive enhancements: motion, typing, counters and effects.
// The page reads fully without JavaScript.

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // ========================================
    // Email: assembled here, never written in the HTML (keeps spam bots away)
    // ========================================
    const email = ["maxim", "don", "mg"].join(".") + "@" + ["gmail", "com"].join(".");
    document.querySelectorAll(".js-email").forEach((a) => { a.href = `mailto:${email}`; });

    const emailText = document.getElementById("emailText");
    if (emailText) emailText.textContent = email;

    const copyBtn = document.getElementById("copyEmail");
    if (copyBtn && navigator.clipboard) {
        copyBtn.hidden = false;
        copyBtn.addEventListener("click", () => {
            navigator.clipboard.writeText(email).then(() => {
                copyBtn.textContent = "Copied ✓";
                copyBtn.classList.add("copied");
                setTimeout(() => {
                    copyBtn.textContent = "Copy";
                    copyBtn.classList.remove("copied");
                }, 2000);
            });
        });
    }

    // Footer year
    const year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    // ========================================
    // Scroll progress bar + active nav link
    // ========================================
    const progress = document.getElementById("scrollProgress");
    const navLinks = [...document.querySelectorAll(".nav-links a")];
    const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href")));
    let ticking = false;

    const island = document.getElementById("island");
    const islandLabel = document.getElementById("islandLabel");
    const pill = document.querySelector(".nav-pill");
    let activeIndex = -2;

    // Slide the highlight under a link (or hide it)
    function movePill(link) {
        if (!pill) return;
        if (!link) { pill.style.opacity = "0"; return; }
        pill.style.left = `${link.offsetLeft}px`;
        pill.style.width = `${link.offsetWidth}px`;
        pill.style.opacity = "1";
    }

    navLinks.forEach((a) => {
        a.addEventListener("mouseenter", () => movePill(a));
        a.addEventListener("mouseleave", () => movePill(navLinks[activeIndex]));
    });

    function onScroll() {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;

        const line = window.scrollY + window.innerHeight * 0.35;
        let current = -1;
        sections.forEach((s, i) => { if (s && s.offsetTop <= line) current = i; });
        navLinks.forEach((a, i) => a.classList.toggle("active", i === current));

        // Dynamic Island: compact while scrolling, showing the current section
        if (island) island.classList.toggle("compact", window.scrollY > 120);
        if (islandLabel) {
            const text = current >= 0 ? navLinks[current].textContent : "Open to work";
            if (islandLabel.textContent !== text) islandLabel.textContent = text;
        }
        if (activeIndex !== current) {
            activeIndex = current;
            movePill(navLinks[current]);
        }
        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });
    onScroll();

    // ========================================
    // Typing effect in the hero
    // ========================================
    const typed = document.getElementById("typed");
    const words = ["SwiftUI", "UIKit", "SwiftData", "StoreKit 2", "AVFoundation", "Firebase", "TypeScript"];

    if (typed && !reduceMotion) {
        let w = 0;
        let c = words[0].length;
        let deleting = true;

        function tick() {
            const word = words[w];
            typed.textContent = word.slice(0, c);

            if (deleting) {
                if (c > 0) { c--; return setTimeout(tick, 45); }
                deleting = false;
                w = (w + 1) % words.length;
                return setTimeout(tick, 250);
            }
            if (c < words[w].length) { c++; return setTimeout(tick, 90); }
            deleting = true;
            setTimeout(tick, 1800);
        }
        setTimeout(tick, 2000);
    }

    // ========================================
    // Reveal on scroll (staggered) + counters
    // ========================================
    const revealTargets = document.querySelectorAll(
        ".section .container > *, .facts li, .shots li, .highlight, .timeline li, .skill-group, .card, .looking-facts li"
    );

    function countUp(el) {
        const target = parseInt(el.dataset.count, 10);
        if (!target || target < 2 || reduceMotion) return;
        const start = performance.now();
        const duration = 1200;
        function frame(now) {
            const t = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
            if (t < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                entry.target.querySelectorAll("[data-count]").forEach(countUp);
                observer.unobserve(entry.target);
            });
        }, { rootMargin: "0px 0px -60px 0px", threshold: 0.05 });

        revealTargets.forEach((el) => {
            // Stagger siblings so groups cascade in
            const index = [...el.parentElement.children].indexOf(el);
            el.style.setProperty("--d", `${Math.min(index, 6) * 0.08}s`);
            el.classList.add("reveal");
            observer.observe(el);
        });
    }

    // ========================================
    // Desktop-only pointer effects
    // ========================================
    if (finePointer && !reduceMotion) {
        // Ambient light that eases after the cursor
        const light = document.getElementById("cursorLight");
        if (light) {
            let tx = window.innerWidth / 2, ty = 200, lx = tx, ly = ty;
            window.addEventListener("pointermove", (e) => {
                tx = e.clientX;
                ty = e.clientY;
                light.classList.add("on");
            }, { passive: true });
            document.addEventListener("pointerleave", () => light.classList.remove("on"));
            (function follow() {
                lx += (tx - lx) * 0.08;
                ly += (ty - ly) * 0.08;
                light.style.transform = `translate(${lx}px, ${ly}px)`;
                requestAnimationFrame(follow);
            })();
        }

        // Spotlight glow that follows the cursor on cards
        document.querySelectorAll(".spotlight").forEach((card) => {
            card.addEventListener("pointermove", (e) => {
                const r = card.getBoundingClientRect();
                card.style.setProperty("--mx", `${e.clientX - r.left}px`);
                card.style.setProperty("--my", `${e.clientY - r.top}px`);
            });
        });

        // 3D tilt: stronger on the app screenshots, subtle on cards
        function addTilt(selector, maxDeg, lift) {
            document.querySelectorAll(selector).forEach((el) => {
                el.addEventListener("pointerenter", () => {
                    el.style.transition = "transform .15s ease-out, border-color .3s";
                });
                el.addEventListener("pointermove", (e) => {
                    const r = el.getBoundingClientRect();
                    const x = (e.clientX - r.left) / r.width - 0.5;
                    const y = (e.clientY - r.top) / r.height - 0.5;
                    el.style.transform = `perspective(900px) rotateY(${x * maxDeg}deg) rotateX(${y * -maxDeg}deg) translateY(-${lift}px)`;
                });
                el.addEventListener("pointerleave", () => {
                    el.style.transition = "transform .6s cubic-bezier(.2, .7, .2, 1), border-color .3s";
                    el.style.transform = "";
                });
            });
        }

        addTilt(".tilt", 8, 6);
        addTilt(".highlight, .skill-group, .card, .facts li, .looking-facts li", 5, 4);
    }

    console.log("%c Hi, recruiter or fellow dev 👋  Let's talk: see the Contact section ", "background:#f5f5f7; color:#000; padding:8px 14px; font-weight:700; border-radius:8px;");
});
