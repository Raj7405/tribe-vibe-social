"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroImageSection from "./HeroImageSection";
import { FeaturedIn } from "@/lib/constants/constant";
import { useGSAP } from "@/hooks/useGSAP";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";

const HeroSection = () => {

  const scope = useGSAP(() =>{
    const textSpilt = new SplitText(".fade-effect-line", {
      type: "lines"
    })

    const item = gsap.utils.toArray(".fade-effect-item")
    gsap.from(item, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.1,
    })

    gsap.from(textSpilt.lines, {
      opacity: 0,
      y: 100,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.1,
    })
  })
  
  return (
    <section 
    ref={scope as React.RefObject<HTMLDivElement>} 
    className="bg-transparent text-black  max-w-7xl px-2 mx-auto h-full">
      <div className="flex lg:flex-row flex-col-reverse gap-4 justify-between w-full h-full">
        <div className="lg:w-1/2 w-full px-4 sm:px-6 lg:px-8 lg:pt-16 lg:pb-28 pt-10 pb-10">
          <div className="text-left w-full">
            {/* Small tagline */}
            <div className="flex flex-col items-start gap-2 mb-6 fade-effect-item">
              <div className="flex -space-x-2">
                <Image
                  className="bg-white w-8 h-8 rounded-full border-2 border-black"
                  src="/images/logos/TribVibeLogo.png"
                  alt="User 1"
                  width={32}
                  height={32}
                />
                <Image
                  className="bg-white w-8 h-8 rounded-full border-2 border-black"
                  src="/images/logos/TribVibeLogo.png"
                  alt="User 2"
                  width={32}
                  height={32}
                />
                <Image
                  className="bg-white w-8 h-8 rounded-full border-2 border-black"
                  src="/images/logos/TribVibeLogo.png"
                  alt="User 3"
                  width={32}
                  height={32}
                />
                <Image
                  className="bg-white w-8 h-8 rounded-full border-2 border-black"
                  src="/images/logos/TribVibeLogo.png"
                  alt="User 3"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-sm font-bold opacity-80 text-gray-700">
                Trusted by Communities
              </span>
            </div>

            {/* Large action words */}
            <div className="mb-8 fade-effect-line">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Connect,
                <br />
                Create,
                <br />
                Thrive.
              </h1>
            </div>

            {/* Descriptive paragraph */}
            <p className="text-lg md:text-xl mb-8 max-w-2xl opacity-90 leading-relaxed fade-effect-line">
              TribeVibe is the social platform that brings communities together.
              Join vibrant groups, share experiences, and{" "}
              <span className="font-semibold">
                build meaningful connections for life!
              </span>
            </p>

            {/* Action buttons */}
            <div className="flex flex-row justify-start gap-4 fade-effect-items">
              <Link
                href="/groups"
                className="bg-black text-yellow-400 px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
              >
                Join now
              </Link>
              <Link
                href="/create-group"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-yellow-400 transition-colors"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full px-4 sm:px-6 lg:px-8 pt-16 pb-28 fade-effect-item">
          <HeroImageSection />
        </div>
      </div>

      <div className="flex flex-col gap-4 justify-center items-center py-10">
        <div className="font-bold text- mb-10">Featured in</div>
        <div className="flex flex-row gap-10" >
          {FeaturedIn?.map((item, index) => (
              <a href={item.href} target="_blank" rel="noopener noreferrer" key={index}>  
                <Image
                  className=""
                  src={item.image}
                  alt="User 1"
                  width={102}
                  height={40}
                />
              </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
