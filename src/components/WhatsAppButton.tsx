import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { whatsappMessages } from '@/data/site';
import { whatsappLink } from '@/lib/whatsapp';

/**
 * Atalho flutuante para o WhatsApp.
 * Fica acima do conteúdo, mas abaixo do lightbox (z-40 contra z-70), e respeita
 * a área segura dos celulares com entalhe na parte de baixo.
 */
export function WhatsAppButton() {
  return (
    <div className="safe-bottom pointer-events-none fixed bottom-5 right-4 z-40 md:bottom-7 md:right-7">
      <a
        href={whatsappLink(whatsappMessages.geral)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com João Victor Fotografias pelo WhatsApp"
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-canvas shadow-[0_6px_24px_-8px_rgba(23,23,21,0.55)] transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:bg-[#2a2a26] hover:shadow-[0_10px_30px_-10px_rgba(23,23,21,0.6)] active:translate-y-0"
      >
        <WhatsAppIcon size={24} />
      </a>
    </div>
  );
}
