"use client";
import { Logo1, Logo2, Logo3, Logo4 } from "@/assets/Home";
import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const contents = [
  {
    icon: Logo1,
    name: "Discover the Vision",
    desc: "We uncover the story, values, and vision that makes your brand unique.",
  },
  {
    icon: Logo2,
    name: "Design the Identity",
    desc: "We craft an identity system that doesn't just look beautiful, it feels unforgettable.",
  },
  {
    icon: Logo3,
    name: "Define the Voice",
    desc: "We define your voice, ensuring your brand speaks with clarity and confidence.",
  },
  {
    icon: Logo4,
    name: "Deliver the Blueprint",
    desc: "A full set of brand guidelines, to keep your brand timeless and powerful.",
  },
];

const Vision = () => {
  const [brand, setBrand] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!brand.trim() || !email.trim()) {
      toast.error("Please fill both fields.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const getCurrentTimestamp = () => new Date().toISOString();

  const resetForm = () => {
    setBrand("");
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const timestamp = getCurrentTimestamp();
      const submissionData = {
        email,
        brand,
        timestamp,
      };

      const GOOGLE_SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzNNp1jPQze67RlGMRQrmXERWj_VEpJGZWdHZ1cL_SyEGnSyh-yTTGrqFiCBobsGCCt/exec";

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      toast.success("Your message has been sent successfully!");
      resetForm();
    } catch (error: any) {
      const errorMessage =
        typeof error === "string"
          ? error
          : error?.message || "Something went wrong. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white h-100dvh w-full flex flex-col items-center justify-center py-25 px-4">
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Top Badge */}
      <div className="border border-[#2222221A] text-[16px] md:text-[18px] text-black rounded-[12px] font-bold px-6 py-1 mb-6">
        TIC
      </div>

      {/* Title */}
      <h1 className="font-medium md:text-[64px] text-[36px] text-[#171717] tracking-tighter md:leading-[72px] leading-[42px] max-w-4xl mx-auto text-center">
        Your Vision, Our Craft
      </h1>

      {/* Subtitle */}
      <p className="font-medium text-[14px] md:text-[16px] leading-[22px] text-[#171717] md:tracking-[-0.4px] max-w-md mx-auto text-center mt-4 mb-8">
        Every great brand starts with a story. We turn yours into a legacy.
      </p>

      {/* Input + Button */}
      <div className="flex flex-col items-center justify-center gap-4 w-full max-w-3xl mx-auto mb-12 px-4">
        {/* Brand Name Input */}
        <input
          type="text"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          placeholder="Your Brand Name"
          className="flex-1 border border-gray-300 text-black placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full sm:max-w-md"
          disabled={isLoading}
        />

        {/* Email Input */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          className="flex-1 border border-gray-300 text-black placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black w-full sm:max-w-md"
          disabled={isLoading}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-black/80 cursor-pointer transition w-full sm:w-auto disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 min-w-[150px]"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
          ) : (
            "Claim your brand"
          )}
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {contents.map((item, index) => (
          <div
            key={index}
            className="border border-[#2222221A] rounded-[10px] p-6 flex flex-col items-start text-start bg-white hover:shadow-lg transition"
          >
            <Image
              src={item.icon}
              alt={item.name}
              className="w-14 h-14 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-[#171717] mb-2">
              {item.name}
            </h2>
            <p className="text-sm text-[#444]">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vision;