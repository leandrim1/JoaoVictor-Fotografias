import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'inverse' | 'text';

interface CommonProps {
  variant?: ButtonVariant;
  /** Ícone opcional exibido depois do texto. */
  icon?: ReactNode;
  /** Ocupa toda a largura disponível (útil no celular). */
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
}

type AnchorProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & {
    href: string;
    /** Abre em nova aba com os atributos de segurança. */
    external?: boolean;
  };

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: undefined;
    external?: never;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-300 ease-editorial disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary:
    'rounded-full bg-ink px-7 py-3.5 text-[13px] font-medium tracking-[0.04em] text-canvas shadow-[0_1px_2px_rgba(23,23,21,0.12),0_8px_24px_-12px_rgba(23,23,21,0.5)] hover:bg-[#2a2a26] hover:shadow-[0_2px_4px_rgba(23,23,21,0.14),0_14px_32px_-14px_rgba(23,23,21,0.55)] active:translate-y-px',
  secondary:
    'rounded-full bg-canvas/90 px-7 py-3.5 text-[13px] font-medium tracking-[0.04em] text-ink shadow-[0_0_0_1px_rgba(23,23,21,0.08),0_4px_18px_-8px_rgba(23,23,21,0.25)] backdrop-blur-sm hover:bg-canvas hover:shadow-[0_0_0_1px_rgba(23,23,21,0.14),0_8px_24px_-10px_rgba(23,23,21,0.3)] active:translate-y-px',
  inverse:
    'rounded-full bg-canvas px-7 py-3.5 text-[13px] font-medium tracking-[0.04em] text-ink shadow-[0_6px_24px_-12px_rgba(0,0,0,0.6)] hover:bg-white active:translate-y-px',
  text: 'group/text gap-1.5 text-[13px] font-medium tracking-[0.04em] text-ink hover:text-gold',
};

/**
 * Botão reutilizável. Renderiza `<a>` quando recebe `href` e `<button>` caso
 * contrário, mantendo os mesmos estilos e estados de foco em toda a página.
 */
export function Button(props: ButtonProps) {
  const { variant = 'primary', icon, fullWidth, className = '', children } = props;

  const classes = [base, variants[variant], fullWidth ? 'w-full' : '', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span aria-hidden="true" className="flex shrink-0 items-center">
          {icon}
        </span>
      ) : null}
    </>
  );

  if (props.href !== undefined) {
    const { href, external, variant: _v, icon: _i, fullWidth: _f, className: _c, children: _ch, ...rest } = props;

    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }

  const { variant: _v, icon: _i, fullWidth: _f, className: _c, children: _ch, type, ...rest } = props;

  return (
    <button type={type ?? 'button'} className={classes} {...rest}>
      {content}
    </button>
  );
}
