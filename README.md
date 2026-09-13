# Elo — Rede de Integração entre Instituições de Ensino

Protótipo funcional (HTML, CSS e JavaScript puro) desenvolvido para o **Projeto Integrador** — Senac EAD, Tecnologia em Análise e Desenvolvimento de Sistemas.

A plataforma conecta escolas para compartilhamento de recursos, registro de projetos pedagógicos replicáveis, organização de atividades conjuntas (feiras e olimpíadas) e divulgação de oportunidades para estudantes.

## Demo

_(https://projeto-plataforma-elo.vercel.app/#visao)_

## Funcionalidades

- **Mapa interativo** (Leaflet + OpenStreetMap/CARTO) com escolas participantes espalhadas pelas regiões do Brasil
- **Recursos compartilhados** — busca e filtro por categoria e status
- **Projetos replicáveis** — galeria filtrável por área
- **Atividades conjuntas** — linha do tempo de feiras e olimpíadas
- **Oportunidades** — prazos de inscrição calculados dinamicamente
- Navegação entre seções sem recarregar a página; dados fictícios carregados em memória (sem backend)

## Tecnologias

- HTML5 + CSS3 (custom properties, sem framework)
- JavaScript (vanilla)
- [Leaflet.js](https://leafletjs.com/) para o mapa
- Tiles: CARTO Dark Matter sobre dados OpenStreetMap
- Fontes: Fraunces + Work Sans (Google Fonts)

## Estrutura

```
.
├── index.html
├──script.js
├──style.css
└── README.md
```

## Rodando localmente

Não precisa de instalação nem build — é um arquivo estático.

```bash
# opção 1: abrir direto no navegador
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# opção 2: servir localmente (evita bloqueios de CORS em alguns navegadores)
npx serve .
```

## Subindo pro Git

```bash
git init                                    # inicializa o repositório local
git add index.html README.md                # adiciona os arquivos ao stage
git commit -m "feat(demo): adiciona protótipo interativo da plataforma Elo"
git branch -M main
git remote add origin <URL_DO_SEU_REPOSITORIO_NO_GITHUB>
git push -u origin main
```


## Aviso

Escolas, recursos, projetos e eventos exibidos são **dados fictícios**, criados para ilustrar o funcionamento da plataforma. As estatísticas da seção "Visão geral" citam fontes reais (Anuário Brasileiro da Educação Básica — Todos pela Educação, 2024–2025).

## Equipe

Projeto Integrador — Senac EAD, Tecnologia em Análise e Desenvolvimento de Sistemas (2026)
