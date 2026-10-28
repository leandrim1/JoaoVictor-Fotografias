/**
 * Dados oficiais do negócio. Tudo que aparece como informação de contato no
 * site sai daqui — não duplique telefone, endereço ou links nos componentes.
 */
export const siteConfig = {
  name: 'João Victor Fotografias',
  shortName: 'João Victor',
  signature: 'Histórias reais. Olhares sinceros.',
  city: 'Patos de Minas',
  state: 'MG',
  serviceArea: 'Patos de Minas e região — MG',

  /** Somente dígitos, no formato exigido pela API do WhatsApp. */
  whatsappNumber: '5534997811654',
  phoneDisplay: '(34) 99781-1654',
  phoneHref: 'tel:+5534997811654',

  address: {
    street: 'Av. Lucy Mesquita de Araújo, 116',
    district: 'Guanabara',
    city: 'Patos de Minas',
    state: 'MG',
    zip: '38701-164',
    note: 'Atendimento com hora marcada, conforme disponibilidade.',
  },

  links: {
    instagram: 'https://www.instagram.com/joaovictor.fotografias',
    googleReviews: 'https://www.google.com/search?q=Jo%C3%A3o+Victor+Fotografias',
    maps: 'https://www.google.com/maps/search/?api=1&query=Av.+Lucy+Mesquita+de+Ara%C3%BAjo%2C+116+-+Guanabara%2C+Patos+de+Minas+-+MG%2C+38701-164',
  },
} as const;

export const addressLine = `${siteConfig.address.street} — ${siteConfig.address.district}, ${siteConfig.address.city} — ${siteConfig.address.state}, ${siteConfig.address.zip}`;

/** Mensagens iniciais do WhatsApp, separadas por contexto de origem. */
export const whatsappMessages = {
  geral: 'Olá, João Victor! Vi o seu site e gostaria de conversar sobre um trabalho de fotografia.',
  casamentos:
    'Olá, João Victor! Estou organizando meu casamento e gostaria de conversar sobre a cobertura fotográfica.',
  ensaios: 'Olá, João Victor! Gostaria de conversar sobre um ensaio fotográfico.',
  eventos: 'Olá, João Victor! Gostaria de conversar sobre a cobertura fotográfica de um evento.',
  disponibilidade:
    'Olá, João Victor! Gostaria de consultar a sua disponibilidade de datas. Pode me contar como funciona?',
  contato:
    'Olá, João Victor! Vim pelo site e gostaria de contar o que estou planejando para conversarmos.',
} as const;

/** Itens do menu principal, usados no cabeçalho e no rodapé. */
export const navLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#experiencia', label: 'Experiência' },
  { href: '#contato', label: 'Contato' },
] as const;
