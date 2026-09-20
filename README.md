# Instituto Mãos que Ajudam

Site institucional da ONG **Instituto Mãos que Ajudam** (Lajinha, MG), desenvolvido como projeto da disciplina de Desenvolvimento Front-end. O site apresenta a instituição, seus projetos sociais e um formulário de cadastro de voluntários.

> O banner da home, o emblema do cabeçalho e as ilustrações de `projetos.html` são as imagens oficiais do Instituto. As fotos dos três cards de projetos (`img/projeto-*.jpg`) são **imagens de exemplo**: substitua os `.jpg` por fotos reais (mesmos nomes) e rode `npm run imagens` para gerar as versões WebP.

## Páginas

| Página | Conteúdo |
|---|---|
| `index.html` | Apresentação da ONG, missão e formas de ajudar |
| `projetos.html` | Projetos sociais (educação, saúde e assistência alimentar), como ser voluntário e como doar |
| `cadastro.html` | Formulário de voluntários com validação, máscaras, modal de confirmação e toast |

## Tecnologias

- **HTML5 semântico** (`header`, `nav`, `main`, `section`, `article`, `footer`)
- **CSS3**: variáveis (design system), Grid de 12 colunas com 5 breakpoints, Flexbox, menu hambúrguer em CSS puro (checkbox hack), modo escuro e alto contraste
- **JavaScript** (módulos ES, sem bibliotecas): máscaras de CPF, telefone e CEP e validação do formulário
- **Vite** (build e minificação), **html-minifier-terser** (HTML) e **sharp** (imagens WebP)
- **Git/GitHub** e **GitHub Actions/Pages** (deploy)

## Estrutura de diretórios

```
instituto-maos-que-ajudam/
├── index.html
├── projetos.html
├── cadastro.html
├── css/style.css
├── js/
│   ├── mascaras.js
│   └── validacoes.js
├── img/                      # imagens do site (JPG + WebP)
├── assets-originais/         # arquivos de origem (não vão para o site)
├── scripts/otimizar-imagens.mjs
├── .github/workflows/deploy.yml
├── vite.config.js
└── package.json
```

## Instalação e execução local

Pré-requisitos: [Git](https://git-scm.com/) e [Node.js](https://nodejs.org/) 20 ou superior.

```bash
git clone https://github.com/lucianobarbosa88/instituto-maos-que-ajudam.git
cd instituto-maos-que-ajudam
git checkout develop      # versão em desenvolvimento (use main para a versão estável)
npm install
npm run dev               # abre em http://localhost:5173/instituto-maos-que-ajudam/
```

Os scripts JavaScript são módulos ES, então o site deve ser aberto por um servidor local (`npm run dev` ou `python -m http.server 8000`), e não por duplo clique no arquivo.

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Gera a pasta `dist/` com CSS, JS e HTML minificados |
| `npm run preview` | Serve a pasta `dist/` para testar o resultado final |
| `npm run imagens` | Converte `img/*.jpg` em WebP (480, 800 e 1200 px) |

## Fluxo de versionamento

- **GitFlow**: `main` (versões estáveis), `develop` (integração), `feature/*` (novas funcionalidades), `release/*` e `hotfix/*`.
- **Conventional Commits**: `feat`, `fix`, `style`, `docs`, `perf`, `build`, `ci`.
- **Versionamento semântico (SemVer)**: `MAJOR.MINOR.PATCH`, com tags anotadas (ex.: `v1.0.0`).
- **Colaboração**: issues e milestones para organizar tarefas; toda `feature/*` entra na `develop` por pull request revisado.

## Acessibilidade (WCAG 2.1 AA)

- Landmarks semânticos, hierarquia de títulos consistente e link "Ir para o conteúdo".
- Navegação completa por teclado, foco visível e `aria-current` na página atual.
- Formulário com `label`, `fieldset`/`legend`, `aria-describedby` e mensagens de erro em texto (`role="alert"`), sem depender só de cor.
- Modal com `role="dialog"`, foco gerenciado, fechamento por Esc e conteúdo de fundo inerte.
- Contraste mínimo de 4.5:1 para texto e 3:1 para componentes, nos modos claro, escuro e de alto contraste; respeita `prefers-reduced-motion`.

## Deploy

A cada push na `main`, o GitHub Actions executa `npm ci` e `npm run build` e publica a pasta `dist/` no GitHub Pages:
`https://lucianobarbosa88.github.io/instituto-maos-que-ajudam/`

## Autor

Luciano da Silva Barbosa - Desenvolvimento Front-End para Web, EAD Cruzeiro do Sul.
