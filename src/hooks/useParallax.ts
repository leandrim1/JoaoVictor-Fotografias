import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface Options {
  /** Deslocamento máximo aplicado à imagem, em pixels. */
  distance?: number;
  /** Abaixo desta largura o efeito é desligado (telas pequenas e aparelhos simples). */
  minWidth?: number;
}

/**
 * Parallax discreto para a fotografia do topo.
 *
 * O listener de rolagem só é registrado enquanto o elemento está visível
 * (IntersectionObserver) e as leituras são agrupadas em requestAnimationFrame,
 * de modo que nada roda enquanto a pessoa navega pelo restante da página.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>({
  distance = 60,
  minWidth = 768,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion) return;
    if (typeof IntersectionObserver === 'undefined') return;
    if (window.innerWidth < minWidth) return;

    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / Math.max(rect.height, 1), 0), 1);
      setOffset(progress * distance);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    const toggleListening = (shouldListen: boolean) => {
      if (shouldListen === listening) return;
      listening = shouldListen;

      if (shouldListen) {
        window.addEventListener('scroll', onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener('scroll', onScroll);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) toggleListening(entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      toggleListening(false);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [distance, minWidth, prefersReducedMotion]);

  return { ref, offset };
}
