import { useEffect, useState } from 'react';

const BREAKPOINTS = [
  { query: '(min-width: 1024px)', columns: 3 },
  { query: '(min-width: 640px)', columns: 2 },
] as const;

function currentColumns(): number {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 1;
  const match = BREAKPOINTS.find((item) => window.matchMedia(item.query).matches);
  return match ? match.columns : 1;
}

/**
 * Número de colunas da grade do portfólio conforme a largura da tela.
 *
 * Lê o valor certo já no primeiro render (para a grade não nascer em uma coluna
 * e saltar em seguida) e acompanha mudanças por matchMedia, sem listener de resize.
 */
export function useColumnCount(): number {
  const [columns, setColumns] = useState(currentColumns);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return;

    const lists = BREAKPOINTS.map((item) => window.matchMedia(item.query));
    const update = () => setColumns(currentColumns());

    update();
    lists.forEach((list) => list.addEventListener('change', update));
    return () => lists.forEach((list) => list.removeEventListener('change', update));
  }, []);

  return columns;
}
