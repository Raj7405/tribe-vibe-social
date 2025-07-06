import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const useGSAP = (
  callback: (context: gsap.Context) => void,
  dependencies: any[] = []
) => {
  const scope = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(callback, scope)
    return () => ctx.revert()
  }, dependencies)

  return scope
}