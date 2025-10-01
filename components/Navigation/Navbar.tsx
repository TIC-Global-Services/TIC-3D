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
  { name: "About", link: "/about-us" },
  { name: "Design House", link: "/design" },
  { name: "Client Portal", link: "/client" },
  { name: "Archive", link: "/archive" },
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
        <Container className="flex items-center justify-between py-4 sm:py-6 lg:py-7">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/TICLogo.png"
                alt="The Internet Company Logo"
                width={200}
                height={100}
                className="h-8 sm:h-10 lg:h-12 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-8">
            {navItems.map((item, index) => (
              <Link
                key={`nav-${index}`}
                href={item.link}
                className="text-white text-base xl:text-lg hover:text-gray-300 transition-colors duration-300 font-normal relative group"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button - Responsive sizing */}
          <Link
            href="/contact"
            className="bg-transparent text-sm sm:text-base lg:text-lg text-white border border-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full font-medium hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 shadow-lg"
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
        className="fixed top-4 right-4 sm:top-5 sm:right-5 lg:top-6 lg:right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white hover:bg-black cursor-pointer rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        style={{ opacity: 0 }}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <div
          ref={plusIconRef}
          className="transition-transform duration-300 ease-out"
        >
          <HiPlus className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-black group-hover:text-white transition-colors duration-300" />
        </div>
      </button>

      {/* Full Screen Overlay Menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-45"
        style={{ visibility: "hidden" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
      >
        <div className="h-full w-full flex flex-col">
          {/* Header with Logo */}
          <div className="flex justify-start items-center px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div ref={overlayLogoRef} className="flex-shrink-0">
              <Link href="/" onClick={handleLinkClick}>
                <Image
                  src="/TICLogo.png"
                  alt="The Internet Company Logo"
                  width={200}
                  height={100}
                  className="h-8 sm:h-10 lg:h-12 w-auto"
                />
              </Link>
            </div>
          </div>

          {/* Main Content Area - Responsive layout */}
          <div className="flex-1 flex flex-col lg:flex-row items-start justify-between px-4 sm:px-6 lg:px-8 pt-8 lg:pt-16 pb-8">
            {/* Navigation Links - Responsive text sizes */}
            <div ref={menuLinksRef} className="flex-1 w-full lg:w-auto">
              <nav
                className="space-y-4 sm:space-y-5 lg:space-y-6"
                id="menu-title"
              >
                {navItems.map((item, index) => (
                  <div key={`overlay-nav-${index}`} className="overflow-hidden">
                    <Link
                      href={item.link}
                      onClick={handleLinkClick}
                      className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white hover:text-gray-400 transition-all duration-300 transform hover:translate-x-2 lg:hover:translate-x-4"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
                <div className="overflow-hidden pt-2 lg:pt-4">
                  <Link
                    href="/contact"
                    onClick={handleLinkClick}
                    className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white hover:text-gray-400 transition-all duration-300 transform hover:translate-x-2 lg:hover:translate-x-4"
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </div>

            {/* Social Links & Copyright - Responsive positioning */}
            <div
              ref={socialLinksRef}
              className="flex flex-row lg:flex-col items-start lg:items-end justify-between w-full lg:w-auto h-auto lg:h-full pt-8 mt-8 lg:mt-0 border-t lg:border-t-0 border-gray-800"
            >
              {/* Social Links */}
              <div className="flex flex-row lg:flex-col items-start lg:items-end gap-4 lg:gap-6 mb-4 lg:mb-0">
                {[
                  { href: "https://instagram.com", label: "Instagram" },
                  { href: "https://linkedin.com", label: "LinkedIn" },
                  { href: "https://twitter.com", label: "Twitter" },
                ].map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={handleLinkClick}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg lg:text-xl text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* Copyright */}
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed text-left lg:text-right">
                © 2024 The Internet Company.
                <br className="hidden lg:block" />
                <span className="lg:hidden"> </span>
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
