import { useState, useEffect } from 'react';

export function useMediaQuery(query:string) : boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => {
        setMatches(media.matches);
      };
      try {
        media.addEventListener('change', listener);
      } catch (e1) {
      try {
        // Additional compatibility to cover all browsers
        media.addListener(listener);
      } catch (e2) {
          console.error(e2);
      }
    }
  }, [matches, query]);
  return matches; 
}

/**
 * Gets the pixel value for the given breakpoint key. The keys and values here 
 * should correspond to the ones defiend in the variables CSS file. 
 * 
 * @param key the key, for example 'md' for medium or 'sx' for extra-small
 * @returns the corresponding value in pixels, as a number
 */
export function getBreakpoint(key:string) : number {
  switch (key) {
    case 'xxs':
      return 320
    case 'xs':
      return 460
    case 'sm':
      return 640
    case 'md':
      return 768
    case 'lg':
      return 992
    case 'xl':
      return 1280
    case 'xxl':
      return 1440
    case 'xxxl':
      return 1920
    default: 
      throw Error('Unknown breakpoint')
  }
}
