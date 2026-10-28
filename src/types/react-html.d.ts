import 'react';

declare module 'react' {
  interface ImgHTMLAttributes<T> extends HTMLAttributes<T> {
    /**
     * Prioridade de carregamento da imagem.
     *
     * Os tipos do React 18 ainda não conhecem este atributo e, escrito em
     * camelCase, ele é descartado com um aviso no console. Em caixa baixa é
     * exatamente como o HTML espera.
     */
    fetchpriority?: 'high' | 'low' | 'auto';
  }
}
