import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { addressLine, navLinks, siteConfig, whatsappMessages } from '@/data/site';
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll';
import { whatsappLink } from '@/lib/whatsapp';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useLockBodyScroll(menuOpen);

  // O cabeçalho fica sólido assim que a sentinela do topo sai da tela.
  // Usar IntersectionObserver evita um listener de rolagem a cada quadro.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute left-0 top-0 h-24 w-px" />

      <a
        href="#portfolio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-[13px] focus:text-canvas"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-editorial ${
          solid
            ? 'bg-canvas/95 shadow-[0_1px_0_rgba(23,23,21,0.07)] backdrop-blur-md'
            : 'bg-gradient-to-b from-black/35 to-transparent'
        }`}
      >
        <div className="section-shell flex h-[72px] items-center justify-between md:h-[88px]">
          <Logo onDark={!solid} />

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`link-underline text-[13px] font-medium tracking-[0.04em] transition-colors duration-500 ${
                      solid ? 'text-ink hover:text-gold' : 'text-canvas/90 hover:text-canvas'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Button
              href={whatsappLink(whatsappMessages.geral)}
              external
              variant={solid ? 'primary' : 'secondary'}
              className="hidden sm:inline-flex !px-6 !py-2.5 !text-[12px]"
            >
              Vamos conversar
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="menu-principal"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
                solid ? 'text-ink hover:bg-ink/5' : 'text-canvas hover:bg-white/10'
              }`}
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu do celular e do tablet.
          Camadas: botão flutuante do WhatsApp (z-40) < este painel (z-45)
          < cabeçalho (z-50) < lightbox (z-70). Assim o painel opaco cobre o
          botão enquanto o menu está aberto, em vez de o botão tapar o texto. */}
      <div
        id="menu-principal"
        hidden={!menuOpen}
        className="fixed inset-0 z-[45] bg-canvas pt-[72px] md:pt-[88px] lg:hidden"
      >
        <div className="section-shell flex h-full flex-col justify-between overflow-y-auto pb-10 pt-8">
          <nav aria-label="Navegação principal (celular)">
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <li key={link.href} className="border-b border-ink/8">
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-5 font-serif text-[30px] font-light text-ink transition-colors duration-300 hover:text-gold"
                  >
                    <span className="font-sans text-[10px] tracking-label text-muted">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-10 space-y-5">
            <Button
              href={whatsappLink(whatsappMessages.geral)}
              external
              fullWidth
              onClick={() => setMenuOpen(false)}
            >
              Vamos conversar
            </Button>

            <div className="space-y-1 text-[13px] leading-relaxed text-muted">
              <p>
                <a href={siteConfig.phoneHref} className="link-underline text-ink">
                  {siteConfig.phoneDisplay}
                </a>
              </p>
              <p>{addressLine}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
