import { siteConfig } from '@/data/site';

/**
 * Monta o link do WhatsApp já com a mensagem inicial da seção de origem.
 * Mantém um único ponto de verdade para o número de telefone.
 */
export function whatsappLink(message: string): string {
  const params = new URLSearchParams({
    phone: siteConfig.whatsappNumber,
    text: message,
  });

  return `https://api.whatsapp.com/send?${params.toString()}`;
}
