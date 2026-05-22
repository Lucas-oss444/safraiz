# 🌱 Safraiz

> Plataforma web para inclusão digital do agricultor familiar — controle de inventário e educação em gestão, pensada para quem mais precisa.

Desenvolvido para o **Amazon Hacking**, hackathon acadêmico com foco em soluções para a Amazônia.

---

## Sobre o Projeto

Agricultores familiares da região amazônica perdem renda e produtividade por não terem ferramentas acessíveis para controlar o que produzem e o que vendem. O **Safraiz** nasce para resolver isso.

A plataforma foi projetada para usuários com **baixo letramento digital**: interface visual, textos simples, navegação mínima e compatível com dispositivos de baixo desempenho como Chromebooks.

---

## Funcionalidades

- **Inventário de Produção** — cadastro, visualização e remoção de produtos (nome, quantidade, unidade, observação)
- **Aprenda Gestão** — conteúdo educativo em formato de cards expansíveis explicando práticas básicas de organização da roça
- **Interface acessível** — design limpo, texto grande, sem jargão técnico
- **Alto contraste e ajuste de fonte** — suporte a usuários com necessidades visuais
- **VLibras** — integração com o widget de Libras para acessibilidade de surdos

---

## Stack

| Camada | Tecnologia |
|--------|------------|
| Frontend principal | Vue 3 + Vite |
| Frontend site | React 18 + Vite |
| Estilização | Tailwind CSS v4 |
| Roteamento | Vue Router 4 / React Router 7 |
| Estado | Pinia / Context API |
| Backend / Banco | Supabase (PostgreSQL) |
| Acessibilidade | eMAG + WCAG 2.1 AA |
| Hospedagem | Vercel + Supabase |

---

## Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- Conta gratuita no [Supabase](https://supabase.com)

---

## Como Rodar Localmente

### App Vue (`safraiz___/`)

```bash
cd safraiz___
npm install
cp .env.example .env
npm run dev
```

Edite o `.env` com suas credenciais do Supabase:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima
```

**Crie a tabela no Supabase:**

```sql
create table produtos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  quantidade numeric,
  unidade text,
  observacao text,
  created_at timestamptz default now()
);
```

Acesse em: `http://localhost:5173`

### Site React (`site/`) — branch `site`

```bash
cd site
npm install
npm run dev
```

Acesse em: `http://localhost:5173`

---

## Estrutura do Repositório

```
safraiz/
├── safraiz___/          # App Vue 3 — inventário agrícola com Supabase
│   └── src/
│       ├── components/  # NavBar
│       ├── views/       # HomeView, InventarioView, AprendaView
│       ├── stores/      # Pinia — estado do inventário
│       ├── router/      # Rotas da aplicação
│       └── lib/         # Cliente Supabase
│
└── site/                # App React 18 — plataforma educativa (branch: site)
    └── src/
        └── app/
            ├── components/  # Layout, Home, Login, Inventario, Aprender, Suporte
            ├── context/     # Autenticação
            └── utils/       # Acessibilidade
```

---

## Deploy

```bash
npm run build
```

Configure as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no painel do Vercel antes do deploy.

---

## Contexto

O projeto foi desenvolvido com base em **pesquisa de campo realizada em Jutaí (AM)**, onde foram coletados dados sobre as necessidades reais dos agricultores familiares da região. A solução prioriza simplicidade, leveza e acessibilidade em todas as decisões de design e tecnologia.

---

## Licença

MIT
