import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenisInstance: Lenis | null = null;
let clickListenerAttached = false;

export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Respect user preference for reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  try {
    lenisInstance = new Lenis({
      autoRaf: true,
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Handle anchor navigation smoothly
    if (!clickListenerAttached) {
      clickListenerAttached = true;
      document.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement)?.closest('a');
        if (!target) return;

        const href = target.getAttribute('href');
        if (href && href.startsWith('#') && href.length > 1) {
          const targetEl = document.querySelector(href);
          if (targetEl) {
            e.preventDefault();
            lenisInstance?.scrollTo(targetEl as HTMLElement, {
              offset: -70,
              duration: 1.1,
            });
            window.history.pushState(null, '', href);
          }
        }
      });

      // If initial page load has a hash in URL (e.g. #contact)
      if (window.location.hash) {
        setTimeout(() => {
          const initialTarget = document.querySelector(window.location.hash);
          if (initialTarget && lenisInstance) {
            lenisInstance.scrollTo(initialTarget as HTMLElement, {
              offset: -70,
              duration: 0.8,
            });
          }
        }, 300);
      }
    }

    return lenisInstance;
  } catch (err) {
    console.warn('Lenis smooth scroll failed to initialize:', err);
    return null;
  }
}

export function scrollToTarget(target: string | HTMLElement, offset = -70) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration: 1.1 });
  } else if (typeof target === 'string') {
    const el = document.querySelector(target);
    el?.scrollIntoView({ behavior: 'smooth' });
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

export function destroySmoothScroll() {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function getSmoothScroll(): Lenis | null {
  return lenisInstance;
}
