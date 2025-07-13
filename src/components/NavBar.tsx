'use client'
import Link from "next/link";
import Image from "next/image";
import React from "react";
// cspell:ignore gsap
import { gsap } from "gsap";
import useScrollTrigger from "@/hooks/useScrollTrigger";
import { NavBarItems } from "@/lib/constants/constant";

const NavBar = () => {
  const scope = useScrollTrigger(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: scope.current,
        start: "bottom top",
        end: "+=100",
        toggleActions: "play none none reverse",
      }
    });
    
    navTween.to(scope.current, {
      backgroundColor: "transparent",
      backdropFilter: "blur(10px)",
      duration: 0.3,
      ease: "power2.out",
    }, "start");

    gsap.from(".fade-effect", {
      opacity: 0,
      y: 100,
      duration: 0.5,
      ease: "power2.inOut",
      stagger: 0.1,
    })
  }, []); 

  return (
    <header 
      id="navbar" 
      ref={scope} 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:block hidden "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 fade-effect">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div id="logo" className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logos/TribVibeLogo.png"
                alt="TribeVibe Logo"
                width={160}
                height={160}
                priority
              />
            </Link>
          </div>

          {/* Navigation links*/}
          <nav className="flex items-center space-x-8">
            {NavBarItems.map((item) => (
              item.type === "link" ? (
                <Link key={item.name} href={item.href} className="text-black text-sm font-bold transition-colors ">
                {item.name}
                </Link>
              ) : (
                <button key={item.name} className="text-black text-sm font-bold bg-white px-4 py-2 rounded-3xl hover:bg-gray-200 transition-colors">
                  {item.name}
                </button>
                )
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default NavBar;