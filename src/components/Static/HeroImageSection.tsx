'use client'
import Image from 'next/image'
import React, { useRef } from 'react'
import { useGSAP } from '@/hooks/useGSAP'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const   HeroImageSection = () => {
//   const containerRef = useRef<HTMLDivElement>(null)
  const image1Ref = useRef<HTMLDivElement>(null)
  const image2Ref = useRef<HTMLDivElement>(null)
  const image3Ref = useRef<HTMLDivElement>(null)

  const containerRef = useGSAP(() => {
    if (!containerRef.current) return

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger)
    
    const container = containerRef.current
    const images = [image1Ref.current, image2Ref.current, image3Ref.current]

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const x = e.clientX - centerX
      const y = e.clientY - centerY
      
      // Calculate tilt angles based on mouse position
      const tiltX = (y / rect.height) * 20 // Max 20 degrees
      const tiltY = (x / rect.width) * 20  // Max 20 degrees

      // Apply different tilt intensities to each image
      images.forEach((image, index) => {
        if (image) {
          const intensity = [1, 0.8, 0.6][index] // Different intensities for layering effect
          gsap.to(image, {
            duration: 0.3,
            rotationX: 20 + (-tiltX * intensity),
            rotationY: -20 + (tiltY * intensity),
            rotationZ: 20 + ((tiltX + tiltY) * 0.1 * intensity),
            translateY: index === 0 ? 10 : index === 1 ? 0 : -10,
            transformPerspective: 1000,
            ease: "power2.out"
          })
        }
      })
    }

    // Mouse leave handler
    const handleMouseLeave = () => {
      images.forEach((image) => {
        if (image) {
          gsap.to(image, {
            duration: 0.5,
            rotationX: 20,
            rotationY: -20,
            rotationZ: 20,
            scale: '1 1 1',
            transformPerspective: 1000,
            ease: "power2.out"
          })
        }
      })
    }

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    // Initial state
    images.forEach((image) => {
      if (image) {
        gsap.set(image, {
          transformStyle: 'preserve-3d',
          rotationX: 20,
          rotationY: -20,
          rotationZ: 20,
          scale: '1 1 1',
          transformPerspective: 1000,
        })
      }
    })

    // ScrollTrigger animation for rotating cards from left to right
    images.forEach((image) => {
      if (image) {
        gsap.to(image, {
          rotationY: -20 + 20, // From -20 to +20 degrees
          duration: 2,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
            onUpdate: (self) => {
              // Maintain the base tilt while adding scroll rotation
              const progress = self.progress
              const scrollRotation = -20 + (20 * progress) // -20 to +20
              gsap.set(image, {
                rotationY: scrollRotation,
                rotationX: 20,
                rotationZ: 20,
                transformPerspective: 1000,
              })
            }
          }
        })
      }
    })

    // Cleanup
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className='flex flex-row items-center justify-center gap-4 relative max-w-4xl h-full cursor-pointer lg:left-10 left-0 bottom-10'
    >
        <div 
          ref={image1Ref}
            className='absolute top-10 left-10 rounded-2xl overflow-hidden z-20'
        >
            <Image 
                src="/images/homePageAssets/heroImage3.webp" 
                alt="Hero Image" 
                width={256} 
                height={256} 
                className='object-cover'
            />
        </div>
        <div 
          ref={image2Ref}
          className='absolute top-0 left-40 rounded-2xl overflow-hidden z-10'
        >
            <Image 
                src="/images/homePageAssets/heroImage2.webp" 
                alt="Hero Image" 
                width={256} 
                height={256} 
                className='object-cover'
            />
        </div>
        <div 
          ref={image3Ref}
          className='absolute top-82 left-50 rounded-2xl overflow-hidden z-0'
        >
            <Image 
                src="/images/homePageAssets/heroImage1.webp" 
                alt="Hero Image" 
                width={256} 
                height={256} 
                className='object-cover'
            />
        </div>
    </div>
  )
}

export default HeroImageSection