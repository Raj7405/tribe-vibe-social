'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export const useGSAP = (
  callback: (context: gsap.Context) => void,
  dependencies: React.DependencyList = []
) => {
  const scope = useRef<HTMLElement>(null)

  useEffect(() => {
    // Ensure DOM is ready
    if (!scope.current) return;

    const ctx = gsap.context(callback, scope)
    
    return () => {
      ctx.revert()
      // Additional cleanup for ScrollTrigger if needed
      ScrollTrigger.refresh()
    }
  }, dependencies)

  return scope
}