# Instituto MÃ£os que Ajudam

Site institucional da ONG **Instituto MÃ£os que Ajudam** (Lajinha, MG), desenvolvido como projeto da disciplina de Desenvolvimento Front-end. O site apresenta a instituiÃ§Ã£o, seus projetos sociais e um formulÃ¡rio de cadastro de voluntÃ¡rios.

> O banner da home, o emblema do cabeÃ§alho e as ilustraÃ§Ãµes de `projetos.html` sÃ£o as imagens oficiais do Instituto. As fotos dos trÃªs cards de projetos (`img/projeto-*.jpg`) sÃ£o **imagens de exemplo**: substitua os `.jpg` por fotos reais (mesmos nomes) e rode `npm run imagens` para gerar as versÃµes WebP.

## PÃ¡ginas

| PÃ¡gina | ConteÃºdo |
|---|---|
| `index.html` | ApresentaÃ§Ã£o da ONG, missÃ£o e formas de ajudar |
| `projetos.html` | Projetos sociais (educaÃ§Ã£o, saÃºde e assistÃªncia alimentar), como ser voluntÃ¡rio e como doar |
| `cadastro.html` | FormulÃ¡rio de voluntÃ¡rios com validaÃ§Ã£o, mÃ¡scaras, modal de confirmaÃ§Ã£o e toast |

## Tecnologias

- **HTML5 semÃ¢ntico** (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3**: variÃ¡veis (design system), Grid de 12 colunas com 5 breakpoints, Flexbox, menu hambÃºrguer em CSS puro (checkbox hack), modo escuro e alto contraste
- **JavaScript** (mÃ³dulos ES, sem bibliotecas): mÃ¡scaras de CPF, telefone e CEP e validaÃ§Ã£o do formulÃ¡rio
- **Vite** (build e minificaÃ§Ã£o), **html-minifier-terser** (HTML) e **sharp** (imagens WebP)
- **Git/GitHub** e **GitHub Actions/Pages** (deploy)

## Estrutura de diretÃ³rios

```
instituto-maos-que-ajudam/
â”œâ”€â”€ index.html
â”œâ”€â”€ projetos.html
â”œâ”€â”€ cadastro.html
â”œâ”€â”€ css/style.css
â”œâ”€â”€ js/
â”‚   â”œâ”€â”€ mascaras.js
â”‚   â””â”€â”€ validacoes.js
â”œâ”€â”€ img/                      # imagens do site (JPG + WebP)
â”œâ”€â”€ assets-originais/         # arquivos de origem (nÃ£o vÃ£o para o site)
â”œâ”€â”€ scripts/otimizar-imagens.mjs
â”œâ”€â”€ .github/workflows/deploy.yml
â”œâ”€â”€ vite.config.js
â””â”€â”€ package.json
```

## InstalaÃ§Ã£o e execuÃ§Ã£o local

PrÃ©-requisitos: [Git](https://git-scm.com/) e [Node.js](https://nodejs.org/) 20 ou superior.

```bash
git clone https://github.com/lucianobarbosa88/instituto-maos-que-ajudam.git
cd instituto-maos-que-ajudam
git checkout develop      # versÃ£o em desenvolvimento (use main para a versÃ£o estÃ¡vel)
npm install
npm run dev               # abre em http://localhost:5173/instituto-maos-que-ajudam/
```

Os scripts JavaScript sÃ£o mÃ³dulos ES, entÃ£o o site deve ser aberto por um servidor local (`npm run dev` ou `python -m http.server 8000`), e nÃ£o por duplo clique no arquivo.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a pasta `dist/` com CSS, JS e HTML minificados |
| `npm run preview` | Serve a pasta `dist/` para testar o resultado final |
| `npm run imagens` | Converte `img/*.jpg` em WebP (480, 800 e 1200 px) |

## Fluxo de versionamento

- **GitFlow**: `main` (versÃµes estÃ¡veis), `develop` (integraÃ§Ã£o), `feature/*` (novas funcionalidades), `release/*` e `hotfix/*`.
- **Conventional Commits**: `feat`, `fix`, `style`, `docs`, `perf`, `build`, `ci`.
- **Versionamento semÃ¢ntico (SemVer)**: `MAJOR.MINOR.PATCH`, com tags anotadas (ex.: `v1.0.0`).
- **ColaboraÃ§Ã£o**: issues e milestones para organizar tarefas; toda `feature/*` entra na `develop` por pull request revisado.

## Acessibilidade (WCAG 2.1 AA)

- Landmarks semÃ¢nticos, hierarquia de tÃ­tulos consistente e link "Ir para o conteÃºdo".
- NavegaÃ§Ã£o completa por teclado, foco visÃ­vel e `aria-current` na pÃ¡gina atual.
- FormulÃ¡rio com `label`, `fieldset`/`legend`, `aria-describedby` e mensagens de erro em texto (`role="alert"`), sem depender sÃ³ de cor.
- Modal com `role="dialog"`, foco gerenciado, fechamento por Esc e conteÃºdo de fundo inerte.
- Contraste mÃ­nimo de 4.5:1 para texto e 3:1 para componentes, nos modos claro, escuro e de alto contraste; respeita `prefers-reduced-motion`.

## Deploy

A cada push na `main`, o GitHub Actions executa `npm ci` e `npm run build` e publica a pasta `dist/` no GitHub Pages:
`https://lucianobarbosa88.github.io/instituto-maos-que-ajudam/`

## Autor

SEU NOME - curso e instituiÃ§Ã£o.


