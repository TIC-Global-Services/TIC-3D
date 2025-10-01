"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FooterImage1, FooterImage2 } from "@/assets/Footer";
import Image from "next/image";

const socialLinks = [
  { link: 'https://www.instagram.com/the.internetcompany/', logo: <FaInstagram /> },
  { link: '#', logo: <IoLogoLinkedin /> },
];

const content = [
  {
    img: FooterImage1,
    name: "We're always looking for new collaborations.",
    link: "#",
    button: "contact us",
  },
  {
    img: FooterImage2,
    name: "Check out our latest news on instagram",
    link: "https://www.instagram.com/the.internetcompany/",
    button: "follow us",
  },
];

const Footer = () => {
  const [scrollY, setScrollY] = useState(0);
  const footerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / window.innerHeight));
        setScrollY(scrollProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer ref={footerRef} className="min-h-screen w-full  text-white overflow-hidden">
      <div className="container mx-auto px-4 py-16 h-full flex flex-col justify-between">
  
        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-16">
          {content.map((item, index) => {
            // Calculate parallax offset as percentage for responsive behavior
            const parallaxOffset = scrollY * 15;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl  transition-all duration-500  hover:shadow-2xl "
              >
                {/* Image Section with Parallax */}
                <div className="relative h-[700px] overflow-hidden">
                  <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                      transform: `translateY(${parallaxOffset}%) scale(1.2)`,
                      transition: 'transform 0.1s ease-out',
                      top: '-10%',
                    }}
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
              
                  {/* Title at Top */}
                  <div className="absolute top-8 left-8 right-8 z-10">
                    <h3 className="text-2xl md:text-6xl font-normal text-white">
                      {item.name}
                    </h3>
                  </div>
                  
                  {/* Button at Bottom */}
                  <div className="absolute bottom-8 left-8 right-8 z-10">
                    <a
                      href={item.link}
                      className="inline-block px-8 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white font-semibold rounded-full transition-all duration-300 hover:bg-white hover:text-black uppercase tracking-wider"
                    >
                      {item.button}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Bottom Section */}
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            
              {/* Social Links */}
            <div className="flex items-center gap-4">

              {socialLinks.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center rounded-full  transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/50"
                >
                  <span className="text-xl">{item.logo}</span>
                </a>
              ))}
            </div>
     
            <div className="text-center flex-1">
             © Copyright TIC GLOBAL SERVICES / admin@theinternetcompany.one
            </div>

          
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;