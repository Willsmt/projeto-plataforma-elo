# EducaRede — Plataforma de Integração Educacional

> Conhecimento para todos.

Protótipo funcional (HTML, CSS e JavaScript puro) desenvolvido para o **Projeto Integrador** — Senac EAD, Tecnologia em Análise e Desenvolvimento de Sistemas.

A plataforma conecta escolas para compartilhamento de recursos, registro de projetos pedagógicos replicáveis, organização de atividades conjuntas (feiras e olimpíadas) e divulgação de oportunidades para estudantes.

## Demo

[projeto-plataforma-elo.vercel.app](https://projeto-plataforma-elo.vercel.app/#visao)

## Funcionalidades

- **Mapa interativo** (Leaflet + OpenStreetMap/CARTO Dark Matter) com escolas participantes espalhadas pelas regiões do Brasil
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
- Fontes: Fraunces (títulos) + Work Sans (texto), via Google Fonts

## Identidade visual

- **Cores:** fundo azul-marinho `#0A1B38`, azul da marca `#4F8EF7` (versão clara para leitura no fundo escuro), amarelo `#F5B400` (conhecimento) e laranja `#F28C1B` (dinamismo)
- **Mascote:** Edu, apresentando a seção "Como a rede funciona"
- **Slogan:** "Conhecimento para todos"

## Estrutura

```
.
├── index.html                  # estrutura das seções
├── style.css                   # identidade visual (tokens de cor em :root)
├── script.js                   # dados fictícios, navegação, filtros e mapa
├── assets/
│   ├── logo-educarede-dark.png # logo horizontal para fundo escuro
│   └── edu-avatar.jpg          # avatar do mascote Edu
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
git add index.html style.css script.js assets README.md   # adiciona os arquivos ao stage
git commit -m "feat(demo): adiciona protótipo interativo da plataforma EducaRede"
git branch -M main
git remote add origin <URL_DO_SEU_REPOSITORIO_NO_GITHUB>
git push -u origin main
```

## Aviso

Escolas, recursos, projetos e eventos exibidos são **dados fictícios**, criados para ilustrar o funcionamento da plataforma. As estatísticas da seção "Visão geral" citam fontes reais (Anuário Brasileiro da Educação Básica — Todos pela Educação, 2024–2025).

## Equipe

Projeto Integrador — Senac EAD, Tecnologia em Análise e Desenvolvimento de Sistemas (2026)
