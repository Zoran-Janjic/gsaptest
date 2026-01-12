import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Register ScrollTrigger securely
gsap.registerPlugin(ScrollTrigger);

// Initialize when page is fully loaded (images, fonts, etc.)
window.addEventListener("load", () => {

    // Smooth Scroll (Lenis)
    const lenis = new Lenis({
        smoothWheel: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    // Synchronize Lenis and GSAP
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000); // lenis requires time in ms
    });

    gsap.ticker.lagSmoothing(0);

    // Force video play (fixes autoplay issues in some browsers)
    const video = document.querySelector('video');
    if (video) {
        video.muted = true; // Ensure muted
        video.play().catch(e => console.log("Autoplay blocked:", e));
    }

    // Initial Reveal
    const tl = gsap.timeline();
    tl.to("body", { autoAlpha: 1, duration: 0.5 })
        .from(".hero-eyebrow", { y: 20, autoAlpha: 0, duration: 1, ease: "power3.out" })
        .from(".hero h1", { y: 50, autoAlpha: 0, duration: 1.2, ease: "power4.out" }, "-=0.8")
        .from(".hero p", { y: 30, autoAlpha: 0, duration: 1 }, "-=0.8")
        .from(".hero p", { y: 30, autoAlpha: 0, duration: 1 }, "-=0.8")
        .fromTo(".hero-cta",
            { scale: 0.9, autoAlpha: 0 },
            { scale: 1, autoAlpha: 1, duration: 0.8 },
            "-=0.6"
        );

    // Smooth Scroll to Mission on Button Click
    const heroBtn = document.querySelector('.hero-cta');
    if (heroBtn) {
        heroBtn.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo('#mission', { offset: -50 }); // Offset for sticky header if any, or breathing room
        });
    }

    // Generic Section Headlines
    gsap.utils.toArray(".section-header").forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 40,
            autoAlpha: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // About Text
    gsap.from(".about-content p", {
        scrollTrigger: {
            trigger: ".about-content",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: 30,
        autoAlpha: 0,
        duration: 1
    });

    // Interviews (Stagger)
    gsap.from(".interview-card", {
        scrollTrigger: {
            trigger: ".interview-grid",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: 50,
        // autoAlpha: 0, // Temporarily commented out to debug visibility
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });

    // CEO Message
    gsap.from(".ceo-img", {
        scrollTrigger: {
            trigger: ".ceo-wrapper",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        scale: 0.8,
        autoAlpha: 0,
        duration: 1,
        ease: "back.out(1.7)"
    });

    gsap.from(".ceo-text > *", {
        scrollTrigger: {
            trigger: ".ceo-wrapper",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        x: 30,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.2
    });

    // Business List
    gsap.from(".business-list li", {
        scrollTrigger: {
            trigger: ".business-list",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        x: -30,
        // autoAlpha: 0,
        duration: 0.6,
        stagger: 0.1
    });

    // Partners
    gsap.from(".partner-card", {
        scrollTrigger: {
            trigger: ".partner-grid",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        y: 40,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.2
    });

    // History Timeline
    gsap.from(".history-timeline", {
        scrollTrigger: {
            trigger: ".history-timeline",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        scaleY: 0,
        transformOrigin: "top left",
        duration: 1.5,
        ease: "power3.inOut"
    });

    gsap.from(".timeline-item", {
        scrollTrigger: {
            trigger: ".history-timeline",
            start: "top 90%",
            toggleActions: "play none none none"
        },
        x: 20,
        autoAlpha: 0,
        duration: 1,
        stagger: 0.5,
        delay: 0.5
    });

    // Company Info Table
    gsap.from(".info-box .row", {
        scrollTrigger: {
            trigger: ".info-box",
            start: "top 95%",
            toggleActions: "play none none none"
        },
        y: 10,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.1
    });

    // FORCE REFRESH to ensure everything calculates correctly
    ScrollTrigger.refresh();

    // Safety timeout: if anything is still invisible after 1 second, force it
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 1000);
});
