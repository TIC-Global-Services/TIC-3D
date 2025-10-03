"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HiPlus } from "react-icons/hi2";
import Container from "@/components/Reusbale/Container";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Navigation items - easy to modify
const navItems = [
  { name: "About", link: "https://www.theinternetcompany.one/about" },
  {
    name: "Design House",
    link: "https://www.theinternetcompany.one/about.html",
  },
  {
    name: "Client Portal",
    link: "https://www.theinternetcompany.one/client.html",
  },
  { name: "Archive", link: "https://www.theinternetcompany.one/archive" },
   { name: "Branding", link: "/" },

];

const FnavItems = [
  { name: "Home", link: "https://www.theinternetcompany.one" },
  { name: "About", link: "https://www.theinternetcompany.one/about" },
  {
    name: "Design House",
    link: "https://www.theinternetcompany.one/about.html",
  },
  {
    name: "Client Portal",
    link: "https://www.theinternetcompany.one/client.html",
  },
  { name: "Archive", link: "https://www.theinternetcompany.one/archive" },
  { name: "Contact", link: "https://www.theinternetcompany.one/contact" },
  { name: "Branding", link: "/" },

];
const Navbar = () => {
  // References for DOM elements
  const navbarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const plusIconRef = useRef(null);
  const overlayRef = useRef(null);
  const menuLinksRef = useRef(null);
  const socialLinksRef = useRef(null);
  const overlayLogoRef = useRef(null);

  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Setup initial element states
  const setupInitialStates = useCallback(() => {
    if (!menuButtonRef.current || !overlayRef.current) return;

    // Hide menu button initially
    gsap.set(menuButtonRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -20,
    });

    // Hide overlay initially
    gsap.set(overlayRef.current, {
      clipPath: "circle(0% at 95% 5%)",
      visibility: "hidden",
    });

    // Hide overlay content initially
    const overlayElements = [
      menuLinksRef.current,
      socialLinksRef.current,
      overlayLogoRef.current,
    ].filter(Boolean);
    if (overlayElements.length > 0) {
      gsap.set(overlayElements, {
        opacity: 0,
        y: 50,
      });
    }
  }, []);

  // Setup scroll-based animations
  const setupScrollAnimations = useCallback(() => {
    if (!navbarRef.current || !menuButtonRef.current) return;

    return ScrollTrigger.create({
      trigger: document.body,
      start: "50px top",
      end: "20px top",
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress;

        // Navbar fade out smoothly
        const navbarOpacity = Math.max(0, 1 - progress * 2);
        const navbarY = progress * -80;

        // Menu button fade in with proper timing
        const buttonOpacity = Math.min(1, Math.max(0, (progress - 0.3) * 2));
        const buttonScale = 0.8 + buttonOpacity * 0.2;
        const buttonY = -20 + buttonOpacity * 20;

        // Animate navbar
        gsap.set(navbarRef.current, {
          y: navbarY,
          opacity: navbarOpacity,
        });

        // Animate menu button (only when navbar is mostly hidden)
        gsap.set(menuButtonRef.current, {
          opacity: buttonOpacity,
          scale: buttonScale,
          y: buttonY,
        });
      },
    });
  }, []);

  // Open menu animation
  const openMenu = useCallback(() => {
    if (!overlayRef.current || !plusIconRef.current) return;

    gsap.set(overlayRef.current, { visibility: "visible" });

    // Animate plus icon to X
    gsap.to(plusIconRef.current, {
      rotation: 45,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Expand overlay
    gsap.to(overlayRef.current, {
      clipPath: "circle(150% at 95% 5%)",
      duration: 0.6,
      ease: "power3.inOut",
    });

    // Animate overlay content with stagger
    const tl = gsap.timeline({ delay: 0.2 });

    if (overlayLogoRef.current) {
      tl.to(overlayLogoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    }

    if (menuLinksRef.current) {
      tl.to(
        menuLinksRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    if (socialLinksRef.current) {
      tl.to(
        socialLinksRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }
  }, []);

  // Close menu animation
  const closeMenu = useCallback(() => {
    if (!plusIconRef.current || !overlayRef.current) return;

    // Reset plus icon based on hover state
    const targetRotation = isHovering ? 22.5 : 0;
    gsap.to(plusIconRef.current, {
      rotation: targetRotation,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });

    // Hide overlay content
    const overlayElements = [
      overlayLogoRef.current,
      menuLinksRef.current,
      socialLinksRef.current,
    ].filter(Boolean);
    if (overlayElements.length > 0) {
      gsap.to(overlayElements, {
        opacity: 0,
        y: 30,
        duration: 0.3,
        ease: "power2.inOut",
        stagger: 0.05,
      });
    }

    // Collapse overlay
    gsap.to(overlayRef.current, {
      clipPath: "circle(0% at 95% 5%)",
      duration: 0.4,
      delay: 0.1,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(overlayRef.current, { visibility: "hidden" });
      },
    });
  }, [isHovering]);

  // Handle menu toggle
  const toggleMenu = useCallback(() => {
    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
    setIsMenuOpen((prev) => !prev);
  }, [isMenuOpen, openMenu, closeMenu]);

  // Handle hover enter
  const handleHoverEnter = useCallback(() => {
    setIsHovering(true);
    if (!isMenuOpen && plusIconRef.current) {
      gsap.to(plusIconRef.current, {
        rotation: 22.5,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isMenuOpen]);

  // Handle hover leave
  const handleHoverLeave = useCallback(() => {
    setIsHovering(false);
    if (!isMenuOpen && plusIconRef.current) {
      gsap.to(plusIconRef.current, {
        rotation: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  }, [isMenuOpen]);

  // Close menu when link is clicked
  const handleLinkClick = useCallback(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
  }, [isMenuOpen, toggleMenu]);

  // Setup animations on mount
  useEffect(() => {
    setupInitialStates();
    const scrollTrigger = setupScrollAnimations();

    // Cleanup function
    return () => {
      if (scrollTrigger) scrollTrigger.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setupInitialStates, setupScrollAnimations]);

  return (
    <>
      {/* Main Navigation */}
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-40 bg-transparent"
      >
        <Container className="flex items-center justify-between py-4 sm:py-6 lg:py-3">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="https://www.theinternetcompany.one">
              <Image
                src="https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/newLogo.png?updatedAt=1751867093209"
                alt="The Internet Company Logo"
                width={200}
                height={100}
                className="h-8 sm:h-10 lg:h-19 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navItems.map((item, index) => (
              <Link
                key={`nav-${index}`}
                href={item.link}
                className="text-white text-base xl:text-[19px] font-medium hover:text-gray-300 transition-colors duration-300  relative group"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Responsive sizing */}
          <Link
            href="https://www.theinternetcompany.one/contact"
            className="bg-transparent text-sm sm:text-base lg:text-lg text-white border border-white px-3 sm:px-4 py-1 sm:py-1 rounded-full font-medium hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Let&apos;s talk
          </Link>
        </Container>
      </nav>

      {/* Floating Menu Button - Higher z-index and responsive positioning */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        className="fixed top-4 right-4 sm:top-5 sm:right-5 lg:top-7 lg:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 lg:w-17 lg:h-17 bg-white cursor-pointer rounded-full flex items-center justify-center shadow-md transition-all duration-300 group
  lg:hover:bg-black lg:hover:scale-105 lg:hover:shadow-lg"
        style={{ opacity: 0 }}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div
          ref={plusIconRef}
          className="transition-transform duration-300 ease-out"
        >
          <HiPlus className="w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 text-black group-hover:text-white transition-colors duration-300" />
        </div>
      </button>

      {/* Full Screen Overlay Menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-45"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
      >
        <div className="md:h-full h-1/2 w-full flex md:flex-row flex-col items-start justify-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-48">
          {/* Logo - Centered */}
          <div className="flex-1 flex items-start justify-start">
            <div ref={overlayLogoRef} className="flex-shrink-0">
              <a href="/" onClick={handleLinkClick}>
                <img
                  src="https://ik.imagekit.io/99y1fc9mh/TIC_Globe/images/newLogo.png?updatedAt=1751867093209"
                  alt="The Internet Company Logo"
                  className="h-20 sm:h-20 lg:h-30 w-auto"
                />
              </a>
            </div>
          </div>

          {/* Right Side: Navigation and Social Links */}
          <div className="flex flex-row items-start justify-between gap-40">
            {/* Main Navigation */}
            <div ref={menuLinksRef}>
              <nav
                className="space-y-2 sm:space-y-3 lg:space-y-4 text-start"
                id="menu-title"
              >
                {FnavItems.map((item, index) => (
                  <div key={`overlay-nav-${index}`} className="relative">
                    <a
                      href={item.link}
                      onClick={handleLinkClick}
                      className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-medium tracking-tight text-white hover:text-gray-400 transition-colors"
                    >
                      {item.name === "Design House" ? (
                        <span className="block">
                          Design <span className="block">House</span>
                        </span>
                      ) : (
                        item.name
                      )}
                    </a>

                    {item.name === "Client Portal" && (
                      <span className="absolute -top-1 -right-12 sm:-right-14 lg:-right-16 px-2 sm:px-3 py-1 text-xs hover:bg-[#4A5818] bg-[#c7e55b] text-black rounded">
                        New
                      </span>
                    )}

                    {item.name === "Archive" && (
                      <span className="absolute -top-1 -right-1 sm:-right-12 lg:right-1 px-2 py-1 text-xs bg-gray-700 text-white rounded">
                        36
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            </div>

            {/* Social Links */}
            <div ref={socialLinksRef} className="flex flex-col items-start">
              {[
                { href: "https://instagram.com", label: "Instagram" },
                { href: "https://linkedin.com", label: "LinkedIn" },
              ].map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  onClick={handleLinkClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base lg:text-3xl tracking-tighter text-white hover:text-[#595959] transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white flex items-center justify-center hover:bg-gray-200 transition-colors z-50"
            onClick={() => console.log("Close menu")}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Copyright - Bottom Right */}
          <div className="absolute bottom-7 right-4 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
            <p className="text-xs sm:text-sm text-gray-500 text-right">
              © Copyright TIC INTERNET COMPANY
            </p>
          </div>

          {/* Contact Button - Bottom Left */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8">
            <button
              onClick={handleLinkClick}
              className="px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition-all text-sm sm:text-base"
            >
              contact
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
