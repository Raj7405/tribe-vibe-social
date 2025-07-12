# GSAP with Next.js 15 App Router Guide

## ❌ The Problem: GSAP in Server Components

**GSAP WILL NOT WORK in Server Components!** Here's why:

### Server Components Run on the Server
- No DOM access
- No browser APIs
- No `window`, `document`, `requestAnimationFrame`
- GSAP needs these to function

### Example of What BREAKS:
```tsx
// ❌ This will FAIL - DON'T DO THIS
export default async function ServerComponent() {
  // This runs on the server - NO DOM!
  gsap.to('.my-element', { x: 100 }) // ERROR!
  
  return <div className="my-element">Won't animate</div>
}
```

**Error you'll get:**
```
ReferenceError: document is not defined
```

## ✅ The Solution: GSAP in Client Components

### Always Use 'use client' with GSAP

```tsx
'use client' // REQUIRED for GSAP

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function AnimatedComponent() {
  const elementRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // GSAP runs after component mounts (DOM is ready)
    if (elementRef.current) {
      gsap.fromTo(elementRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1 }
      )
    }
  }, [])
  
  return <div ref={elementRef}>Animated content</div>
}
```

## 🏗️ Best Architecture Pattern

### Server Component (Data) + Client Component (Animation)

```tsx
// SERVER COMPONENT - Fetches data
export default async function ProductPage({ params }) {
  const product = await getProduct(params.id)
  
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      
      {/* Pass data to client component for animation */}
      <AnimatedProductCard product={product} />
    </div>
  )
}

// CLIENT COMPONENT - Handles animation
'use client'
export default function AnimatedProductCard({ product }) {
  const cardRef = useRef(null)
  
  useEffect(() => {
    gsap.fromTo(cardRef.current, 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 }
    )
  }, [])
  
  return (
    <div ref={cardRef}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
    </div>
  )
}
```

## 🔧 GSAP Setup in Your Project

### 1. Installation (Already done in your project)
```bash
npm install gsap
```

### 2. Next.js Configuration (Already configured)
```typescript
// next.config.ts
const nextConfig = {
  transpilePackages: ['gsap'], // ✅ Already set up
}
```

### 3. Basic Usage Pattern

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function MyAnimatedComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // All GSAP animations here
      gsap.fromTo('.animate-me', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2 }
      )
    }, containerRef)
    
    return () => ctx.revert() // Cleanup
  }, [])
  
  return (
    <div ref={containerRef}>
      <div className="animate-me">Item 1</div>
      <div className="animate-me">Item 2</div>
      <div className="animate-me">Item 3</div>
    </div>
  )
}
```

## 📋 Common GSAP Patterns for Next.js 15

### 1. Page Enter Animations
```tsx
'use client'

export default function PageContent() {
  const contentRef = useRef(null)
  
  useEffect(() => {
    gsap.fromTo(contentRef.current?.children || [], 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }
    )
  }, [])
  
  return (
    <div ref={contentRef}>
      <h1>Page Title</h1>
      <p>Page content</p>
    </div>
  )
}
```

### 2. Scroll-Triggered Animations
```tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollAnimation() {
  const triggerRef = useRef(null)
  
  useEffect(() => {
    gsap.fromTo(triggerRef.current, 
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }, [])
  
  return (
    <div ref={triggerRef}>
      <h2>Scroll to see animation</h2>
    </div>
  )
}
```

### 3. Interactive Hover Effects
```tsx
'use client'

export default function HoverCard() {
  const cardRef = useRef(null)
  
  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.05,
      rotation: 5,
      duration: 0.3,
      ease: "power2.out"
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out"
    })
  }
  
  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer"
    >
      Hover me!
    </div>
  )
}
```

## 🚨 Common Mistakes to Avoid

### 1. Using GSAP in Server Components
```tsx
// ❌ DON'T DO THIS
export default async function ServerComponent() {
  gsap.to('.element', { x: 100 }) // Will break!
  return <div className="element">Content</div>
}
```

### 2. Not Using Refs
```tsx
// ❌ DON'T DO THIS
'use client'
export default function BadComponent() {
  useEffect(() => {
    // Class selectors can be unreliable
    gsap.to('.my-class', { x: 100 })
  }, [])
  
  return <div className="my-class">Content</div>
}

// ✅ DO THIS
'use client'
export default function GoodComponent() {
  const elementRef = useRef(null)
  
  useEffect(() => {
    gsap.to(elementRef.current, { x: 100 })
  }, [])
  
  return <div ref={elementRef}>Content</div>
}
```

### 3. Not Cleaning Up Animations
```tsx
// ❌ DON'T DO THIS
useEffect(() => {
  const tl = gsap.timeline()
  tl.to('.element', { x: 100 })
  // No cleanup!
}, [])

// ✅ DO THIS
useEffect(() => {
  const tl = gsap.timeline()
  tl.to(elementRef.current, { x: 100 })
  
  return () => tl.kill() // Cleanup
}, [])
```

## 🎯 For Your TribeVibe Project

### Use This Pattern:
1. **Server Components** for:
   - Fetching user data
   - Rendering page structure
   - SEO content

2. **Client Components** for:
   - GSAP animations
   - Interactive elements
   - User interactions

### Example Structure:
```
app/
  page.tsx                    (Server - fetches data)
  components/
    HeroSection.tsx          (Server - structure)
    AnimatedHero.tsx         (Client - GSAP animations)
    GroupCard.tsx            (Server - data display)
    AnimatedGroupCard.tsx    (Client - hover effects)
```

## 🚀 Ready to Use!

Your project is already configured with:
- ✅ GSAP installed
- ✅ Next.js transpilation configured
- ✅ TypeScript support
- ✅ Example components created

Start animating your TribeVibe app with confidence! 🎉 