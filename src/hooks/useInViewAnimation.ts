import { useEffect, useRef, useState } from 'react';

interface Options {
  /** Fração do elemento que precisa estar visível para disparar. */
  threshold?: number;
  rootMargin?: string;
  /** Quando `false`, a animação se repete a cada entrada na tela. */
  once?: boolean;
}

/**
 * Observa um elemento e informa quando ele entra na área visível.
 * Usado para revelar as seções conforme a página é rolada, sem listeners
 * de scroll. Em navegadores sem IntersectionObserver o conteúdo já nasce visível.
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.1,
  rootMargin = '0px 0px -8% 0px',
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;

        if (entry.isIntersecting) {
          setIsInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isInView };
}
