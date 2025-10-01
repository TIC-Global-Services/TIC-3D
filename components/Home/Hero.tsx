"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const firstTextRef = useRef<HTMLDivElement | null>(null);
  const secondTextRef = useRef<HTMLDivElement | null>(null);

  const totalFrames = 320;
  const currentFrame = (index: number) =>
    `/castle/${(index + 1).toString()}.avif`;

  const images: HTMLImageElement[] = [];
  const imgSeq = { frame: 0 };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    contextRef.current = context;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const img = images[imgSeq.frame];
      if (!img || !img.complete) return;
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      if (imgWidth === 0 || imgHeight === 0) return;

      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

      const x = canvasWidth / 2 - (imgWidth / 2) * scale;
      const y = canvasHeight / 2 - (imgHeight / 2) * scale;

      context.clearRect(0, 0, canvasWidth, canvasHeight);
      context.drawImage(
        img,
        0,
        0,
        imgWidth,
        imgHeight,
        x,
        y,
        imgWidth * scale,
        imgHeight * scale
      );
    };

    images[0].onload = () => {
      render();

      // Set initial states for both text elements
      gsap.set([firstTextRef.current, secondTextRef.current], {
        opacity: 0,
        visibility: "hidden",
      });

      // Timeline for sequential text animations
      const textTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "+=10",
          end: "+=3000",
          scrub: 1,
        },
      });

      // First text reveal - simple fade in
      textTimeline
        .to(firstTextRef.current, {
          opacity: 1,
          visibility: "visible",
          duration: 0.8,
          ease: "power2.out",
        })
        // Hide first text - simple fade out
        .to(firstTextRef.current, {
          opacity: 0,
          visibility: "hidden",
          duration: 0.6,
          ease: "power2.in",
        })
        // Show second text with simple fade-in
        .to(
          secondTextRef.current,
          {
            opacity: 1,

            visibility: "visible",
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.1"
        )
        // Start color transition from white to black immediately
        .to(
          ".text-line-2",
          {
            color: "#000000",
            duration: 1.2,
            ease: "power2.inOut",
          },
          "-=0.4"
        );

      // Canvas animation
      gsap.to(imgSeq, {
        frame: totalFrames - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3500",
          scrub: 1,
          pin: true,
        },
        onUpdate: render,
      });
    };

    canvas.width = 1920;
    canvas.height = 1080;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen relative overflow-hidden"
    >
      <div className="w-full h-screen flex items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-screen object-cover z-10"
        />

        {/* First Text */}
        <div
          ref={firstTextRef}
          className="absolute z-20 text-center text-white xl:text-[80px] lg:text-[70px] md:text-[30px] text-[30px] font-medium md:leading-[81px] xl:tracking-[-4px] lg:tracking-[-3px] md:tracking-[-1.5px] tracking-[-1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div>Our Brand Strategy is</div>
          <div className="mt-2">Stronger</div>
        </div>

        {/* Second Text */}
        <div
          ref={secondTextRef}
          className="absolute z-20 text-start xl:text-[80px] lg:text-[70px] md:text-[30px] text-[30px] font-medium md:leading-[81px] xl:tracking-[-4px] lg:tracking-[-3px] md:tracking-[-1.5px] tracking-[-1px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div className="text-line-2 text-white">Stronger than ever</div>
        </div>
      </div>
    </section>
  );
};

export default Hero;