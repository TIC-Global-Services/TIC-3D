"use client";
import { Logo1, Logo2, Logo3, Logo4 } from "@/assets/Home";
import React, { useState } from "react";
import Image from "next/image";

const contents = [
  {
    icon: Logo1,
    name: "Discover the Vision",
    desc: "We uncover the story, values, and vision that makes your brand unique.",
  },
  {
    icon: Logo2,
    name: "Design the Identity",
    desc: "We craft an identity system that doesn’t just look beautiful, it feels unforgettable.",
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
  const [value, setValue] = useState("");

  const handleClick = () => {
    alert(`You entered: ${value}`);
  };

  return (
    <div className="bg-white h-100dvh w-full flex flex-col items-center justify-center py-20 px-4">
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
     <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mb-12">
  {/* Input */}
  <input
    type="text"
    value={value}
    onChange={(e) => setValue(e.target.value)}
    placeholder="Your Brand Name"
    className="flex-1 border border-gray-300 text-black placeholder-gray-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
  />

  {/* Button */}
  <button
    onClick={handleClick}
    className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition w-full sm:w-auto"
  >
    Claim your brand
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
