import { Instagram } from 'lucide-react';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { siteConfig, whatsappMessages } from '@/data/site';
import { whatsappLink } from '@/lib/whatsapp';

const footerLinks = [
  { href: '#inicio', label: 'Início' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#contato', label: 'Contato' },
  { href: siteConfig.links.instagram, label: 'Instagram', external: true },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-ink/8 bg-canvas">
      <div className="section-shell py-14 md:py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-serif text-2xl font-light text-ink md:text-[1.75rem]">
              {siteConfig.name}
            </p>
            <p className="mt-2 text-[14px] text-muted">{siteConfig.signature}</p>

            <div className="mt-7 flex items-center gap-3">
              <a
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de João Victor Fotografias"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors duration-300 hover:border-ink/35 hover:text-gold"
              >
                <Instagram size={17} strokeWidth={1.5} aria-hidden="true" />
              </a>

              <a
                href={whatsappLink(whatsappMessages.geral)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de João Victor Fotografias"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors duration-300 hover:border-ink/35 hover:text-gold"
              >
                <WhatsAppIcon size={16} />
              </a>
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-col gap-3 md:items-end">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...('external' in link && link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="link-underline text-[14px] text-muted transition-colors duration-300 hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink/8 pt-6 text-[12px] text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</p>
          <p>Patos de Minas, Minas Gerais — Brasil.</p>
        </div>
      </div>
    </footer>
  );
}
