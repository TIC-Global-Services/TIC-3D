import React from "react";
import Image from "next/image";
import { ImageVideo } from "@/assets/Home";
import Container from "../Reusbale/Container";

const Joinus = () => {
  return (
    <Container>
  <div className="flex flex-col items-center justiyf-center space-y-5 py-20 bg-black">
      <h1 className="font-medium md:text-[86px] tracking-tighter text-[43px] md:leading-[83px] leading-[42px]  max-w-3xl mx-auto text-center">
        Build a Brand That Can’t Be Ignored.
      </h1>
      <p className="font-medium text-[14px] leading-[20px] md:tracking-[-0.4px] max-w-sm mx-auto text-center">
        From vision to identity, we create brands that tell stories
       and leave a lasting impression.
      </p>

      <Image src={ImageVideo} alt="Join us" className="w-full max-w-4xl mt-10 rounded-xl" />
    </div>
    </Container>
  
  );
};

export default Joinus;
