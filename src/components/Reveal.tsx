import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useInViewAnimation } from '@/hooks/useInViewAnimation';

interface RevealProps {
  /** Elemento renderizado. Use a tag semântica adequada à seção. */
  as?: ElementType;
  /** Atraso da animação, em segundos, para entradas escalonadas. */
  delay?: number;
  threshold?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/**
 * Revela o conteúdo com um leve deslocamento vertical quando ele entra na tela.
 * A animação acontece uma única vez e é desligada por `prefers-reduced-motion`.
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  threshold = 0.1,
  className = '',
  style,
  children,
}: RevealProps) {
  const { ref, isInView } = useInViewAnimation<HTMLDivElement>({ threshold });

  return (
    <Tag
      ref={ref}
      className={`${isInView ? 'animate-fade-in-up' : 'reveal-idle'} ${className}`.trim()}
      style={{ animationDelay: `${delay}s`, ...style }}
    >
      {children}
    </Tag>
  );
}
