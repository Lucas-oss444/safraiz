# 🌱 Safraiz

Aplicação web para auxiliar agricultores familiares com baixo letramento no processo de **gestão de recursos** e **controle de inventário** da produção agrícola.

Desenvolvido para o **Amazon Hacking** como projeto acadêmico.

---

## Sobre o Projeto

O Safraiz nasceu da necessidade de incluir digitalmente o agricultor familiar. A interface foi pensada para ser simples, visual e acessível — com textos diretos, ícones intuitivos e navegação mínima, adequada para usuários com pouca familiaridade com tecnologia.

**Problema:** Agricultores familiares perdem produtividade e renda por não terem controle sobre o que produzem, quanto têm em estoque e como gerenciar seus recursos básicos.

**Solução:** Um web app leve, de fácil uso e que roda em dispositivos de baixo desempenho (como Chromebooks), ensinando gestão de forma prática e guiando o agricultor no registro do seu inventário.

---

## Funcionalidades

- **Inventário de Produtos** — cadastro e visualização de itens da produção (nome, quantidade, unidade, observação)
- **Aprenda Gestão** — lições simples sobre controle de estoque, gastos, planejamento por temporada e negociação
- **Interface acessível** — design limpo, texto grande, sem jargões técnicos

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Vue 3 + Vite |
| Estilização | Tailwind CSS v4 |
| Roteamento | Vue Router 4 |
| Estado | Pinia |
| Backend / Banco | Supabase (PostgreSQL) |
| Hospedagem | Vercel / Netlify (frontend) + Supabase (gratuito) |

---

## Pré-requisitos

- [Node.js](https://nodejs.org) v18 ou superior
- Conta gratuita no [Supabase](https://supabase.com)

---

## Como Rodar Localmente

**1. Clone o repositório**
```bash
git clone https://github.com/seu-usuario/safraiz.git
cd safraiz
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**
```bash
cp .env.example .env
```
Edite o arquivo `.env` com as credenciais do seu projeto Supabase (URL e chave anônima).

**4. Crie a tabela no Supabase**

No SQL Editor do Supabase, execute:
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

**5. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

Acesse em: `http://localhost:5173`

---

## Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis (NavBar, etc.)
├── views/            # Páginas da aplicação
│   ├── HomeView.vue
│   ├── InventarioView.vue
│   └── AprendaView.vue
├── stores/           # Estado global com Pinia
│   └── inventario.js
├── router/           # Configuração de rotas
│   └── index.js
├── lib/
│   └── supabase.js   # Cliente Supabase
├── App.vue
├── main.js
└── style.css
```

---

## Deploy

**Frontend (Vercel)**
```bash
npm run build
# Faça o deploy da pasta dist/ no Vercel ou Netlify
```

Configure as variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no painel do Vercel.

---

## Licença

MIT
