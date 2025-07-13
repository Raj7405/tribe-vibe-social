import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const useScrollTrigger = (
    callback,
    dependencies = React.DependencyList = []
  ) => {
    const scope = useRef(null)
  
    useEffect(() => {
      if (!scope.current) return;
  
      // Dynamic import for ScrollTrigger
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        
        const ctx = gsap.context(() => {
          callback();
        }, scope);
  
        return () => {
          ctx.revert();
          ScrollTrigger.refresh();
        };
      });
    }, dependencies)
  
    return scope
  }
  
export default useScrollTrigger;