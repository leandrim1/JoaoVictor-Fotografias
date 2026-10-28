# João Victor Fotografias

Site institucional de página única para **João Victor Fotografias** — casamentos,
ensaios e eventos em Patos de Minas e região, Minas Gerais.

> Esta etapa é **somente front-end**. Não há backend, banco de dados, painel
> administrativo nem autenticação. A estrutura foi pensada para receber essas
> integrações depois, sem precisar reescrever as telas.

## Tecnologias

- [React 18](https://react.dev/) com TypeScript em modo estrito
- [Vite 5](https://vite.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) para os ícones
- `IntersectionObserver` para as animações de entrada (sem bibliotecas de animação)

## Como rodar

```bash
npm install
npm run dev
```

| Comando             | O que faz                                                        |
| ------------------- | ---------------------------------------------------------------- |
| `npm run dev`       | Servidor de desenvolvimento em http://localhost:5173              |
| `npm run build`     | Verifica os tipos e gera a versão de produção em `dist/`          |
| `npm run preview`   | Serve a pasta `dist/` para conferir o resultado final             |
| `npm run typecheck` | Só a verificação de tipos                                         |
| `npm run images`    | Reprocessa as fotografias (veja abaixo) — precisa de Python + Pillow |

## Estrutura

```
fotos-originais/          fotos em tamanho original (entrada do processamento)
  portfolio/              fotos do portfólio
  estudio/                fotos do estúdio (usadas no bloco do Instagram)
  sobre/                  retrato do fotógrafo
public/
  images/                 versões WebP geradas — NÃO edite à mão
  favicon.svg
scripts/
  build-images.py         gera as versões responsivas e o manifesto
src/
  App.tsx                 composição das seções
  index.css               tipografia, animações e utilitários
  components/             uma seção por arquivo + Button, Photo, Reveal
  data/                   conteúdo editável (contato, portfólio, serviços…)
  hooks/                  useInViewAnimation, useParallax, useColumnCount…
  lib/                    helpers de imagem e do link do WhatsApp
  types/                  tipos do portfólio
```

## Trocar ou acrescentar fotografias

As fotos passam por um processamento que gera versões WebP em várias larguras,
mede as dimensões reais e cria a miniatura borrada exibida durante o
carregamento. É esse processamento que mantém o site leve no celular.

**1. Coloque o arquivo original em `fotos-originais/<pasta>/<nome>.jpg`**

O nome do arquivo (sem extensão) vira o `slug` usado no código, então use algo
descritivo e sem acentos — por exemplo `casamento-altar-igreja.jpg`.

**2. Rode o processamento**

```bash
npm run images
```

Isso regenera `public/images/` e reescreve `src/data/imageManifest.ts`.
Requer Python 3.9+ com Pillow (`pip install Pillow`).

**3. Cadastre a foto em `src/data/portfolio.ts`**

```ts
{
  id: 'casamento-altar-igreja',
  slug: 'casamento-altar-igreja',   // mesmo nome do arquivo
  caption: 'No altar',
  category: 'casamentos',           // casamentos | ensaios | eventos | retratos
  alt: 'Descrição da cena para quem não enxerga a imagem.',
  orientation: 'vertical',          // vertical | horizontal | quadrada
}
```

Se o `slug` não existir no manifesto, o TypeScript acusa o erro antes do build.

### Filtros do portfólio

As quatro categorias já estão previstas no código, mas a barra de filtros mostra
apenas as que têm pelo menos uma fotografia cadastrada — nenhuma aba abre vazia.
Hoje o acervo do site tem **casamentos** e **ensaios**; ao cadastrar a primeira
foto de *eventos* ou *retratos*, o filtro correspondente aparece sozinho.

### Outras imagens

- **Topo da página:** definido em `src/components/Hero.tsx` (`desktopImage` para
  telas grandes e `mobileImage` para o celular, com corte vertical).
- **Blocos de serviços:** campo `slug` em `src/data/services.ts`.
- **Bloco do Instagram:** lista em `src/data/instagram.ts`.
- **Retrato do fotógrafo:** `fotos-originais/sobre/joao-victor.jpg`.
- **Imagem de compartilhamento (Open Graph):** gerada a partir da foto definida
  em `OG_SOURCE`, dentro de `scripts/build-images.py`.

## Conteúdo editável

| Arquivo                     | O que contém                                                     |
| --------------------------- | ---------------------------------------------------------------- |
| `src/data/site.ts`          | telefone, endereço, links, itens do menu e as mensagens do WhatsApp |
| `src/data/portfolio.ts`     | fotografias, categorias e filtros                                 |
| `src/data/services.ts`      | os três serviços e as etapas do processo                          |
| `src/data/testimonials.ts`  | depoimentos (hoje vazio, ver abaixo)                              |
| `src/data/instagram.ts`     | fotos do bloco do Instagram                                       |

Telefone, endereço e links externos saem todos de `src/data/site.ts` — mude em um
lugar só e o site inteiro acompanha.

### Depoimentos

Nenhum depoimento foi escrito no site: a seção traz apenas o convite para ler as
**avaliações públicas no Google**. A lista em `src/data/testimonials.ts` está
pronta e tipada; assim que houver relatos autorizados por quem escreveu, basta
acrescentá-los e os cartões passam a ser exibidos.

### Instagram

Não há integração com a API do Instagram — o bloco mostra uma galeria escolhida à
mão e leva ao perfil oficial. Nada ali é um feed ao vivo.

## Decisões que valem conhecer

- **Animações.** `useInViewAnimation` revela cada seção uma única vez quando ela
  entra na tela. Tudo (entradas, faixa de fotos, parallax do topo) é desligado por
  `prefers-reduced-motion`.
- **Rolagem.** O cabeçalho muda de estado por `IntersectionObserver`, não por
  listener de rolagem. O único listener de rolagem é o do parallax do topo, que se
  registra apenas enquanto o hero está visível e fica desligado abaixo de 768px.
- **Imagens.** Toda foto tem `srcset`, `sizes`, largura e altura explícitas
  (evita o layout pular) e `loading="lazy"` fora da primeira dobra. A foto do topo
  é pré-carregada com `fetchpriority="high"`.
- **Camadas.** Botão flutuante do WhatsApp `z-40` < menu do celular `z-45` <
  cabeçalho `z-50` < lightbox `z-70`.
- **Escala de opacidade.** `tailwind.config.js` libera todos os inteiros de 0 a
  100 (`bg-ink/97`), porque a escala padrão do Tailwind descarta em silêncio os
  valores fora dela.

## Acessibilidade

HTML semântico, foco visível em todos os links e botões, textos alternativos em
todas as fotografias, lightbox operável por teclado (`Esc`, `←`, `→`) e por toque,
menu do celular com `aria-expanded`/`aria-controls` e link "pular para o conteúdo".

## Publicação

`npm run build` gera `dist/`, que é um site estático — pode ser publicado em
qualquer hospedagem de arquivos (Vercel, Netlify, Cloudflare Pages, GitHub Pages).
Antes de publicar, ajuste a URL em `<link rel="canonical">` no `index.html` para o
domínio definitivo.
