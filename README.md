# Afya Inovação — Sistema de Pré-Incubação

Sistema de acompanhamento de startups da jornada de pré-incubação da Afya Inovação.

## Funcionalidades

- **Projetos** — visualização e acompanhamento de startups com filtros por fase, status, responsável e etapa. Página individual com jornada metodológica, mentorias vinculadas, oportunidades, link da metodologia e histórico.
- **Mentorias** — registro completo de mentorias com tema, ciclo, orientações, encaminhamentos e prazo. Filtros por projeto e mentor.
- **Oportunidades** — banco de oportunidades (editais, fomento, aceleração etc.) com vínculo a projetos, filtros e alertas de prazo.

## Regra de Arquivamento

Um projeto só sai da listagem principal quando cumprir **duas condições**:
1. `status === "Concluído"`
2. `faseArquivada === true` (marcado manualmente na página do projeto)

Projetos arquivados ficam acessíveis pelo filtro **📦 Arquivados** e podem ser desarquivados a qualquer momento.

## Tecnologias

- React 18
- Vite 5
- Sem dependências externas — tudo em um único `App.jsx`

## Como rodar localmente

```bash
npm install
npm run dev
```

## Credenciais de acesso (demo)

| Usuário | E-mail | Senha |
|---|---|---|
| Administrador | admin@afya.com.br | afya2026 |
| Rayza Resende | rayza@afya.com.br | rayza123 |
| Mentor Afya | mentor@afya.com.br | mentor123 |

## Estrutura

```
afya-preincubacao/
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
└── src/
    ├── main.jsx
    └── App.jsx      ← toda a aplicação
```

## Deploy

```bash
npm run build
# pasta dist/ pronta para Vercel, Netlify ou GitHub Pages
```
