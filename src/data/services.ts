import type { ImageSlug } from '@/data/imageManifest';
import { whatsappMessages } from '@/data/site';

export interface Service {
  id: string;
  /** Numeração editorial exibida ao lado do título. */
  index: string;
  title: string;
  description: string;
  /** Texto do link que leva ao WhatsApp. */
  linkLabel: string;
  /** Mensagem inicial enviada no WhatsApp a partir deste bloco. */
  message: string;
  /** Foto de apoio do bloco. */
  slug: ImageSlug;
  alt: string;
}

export const services: Service[] = [
  {
    id: 'casamentos',
    index: '01',
    title: 'Casamentos',
    description:
      'Um dia cheio de significado, pessoas importantes e momentos que acontecem uma única vez. Registros espontâneos de tudo aquilo que torna essa história só de vocês.',
    linkLabel: 'Conversar sobre meu casamento',
    message: whatsappMessages.casamentos,
    slug: 'casamento-noivos-igreja',
    alt: 'Noivos sorrindo lado a lado dentro da igreja, com buquê de flores claras.',
  },
  {
    id: 'ensaios',
    index: '02',
    title: 'Ensaios fotográficos',
    description:
      'Uma experiência para registrar sua personalidade, celebrar uma fase da vida ou simplesmente guardar imagens que tenham a sua cara.',
    linkLabel: 'Planejar meu ensaio',
    message: whatsappMessages.ensaios,
    slug: 'ensaio-casal-folhagem',
    alt: 'Casal de mãos dadas encostado em uma parede clara, emoldurado por folhagens.',
  },
  {
    id: 'eventos',
    index: '03',
    title: 'Eventos',
    description:
      'Dos grandes acontecimentos aos pequenos detalhes, registros atentos para preservar a energia, as pessoas e os momentos que fazem cada evento ser especial.',
    linkLabel: 'Conversar sobre meu evento',
    message: whatsappMessages.eventos,
    slug: 'casamento-cerimonia-ar-livre',
    alt: 'Cerimônia ao ar livre acompanhada pelos convidados, ao fim da tarde.',
  },
];

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Conversa',
    description:
      'Você me conta o que está planejando, o que é importante para você e como imagina esse momento.',
  },
  {
    index: '02',
    title: 'Planejamento',
    description:
      'Alinhamos os detalhes, entendemos as expectativas e organizamos tudo para que a experiência aconteça com tranquilidade.',
  },
  {
    index: '03',
    title: 'Registro',
    description:
      'No dia, a ideia é estar presente, observar e registrar o que acontece de forma natural, sem perder os detalhes que fazem sua história ser única.',
  },
];
