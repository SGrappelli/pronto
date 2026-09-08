🌍 [English](../README.md) | [Español](README.es.md) | **Português**

# BookingPro — Sistema de Gestão para Negócios de Serviços

> PDV · CRM · Estoque · Agendamento · Notificações multicanal. Tudo no seu servidor.  
> Seus dados, seu servidor. Sem comissões. Instalação com um único comando.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com)
[![Docker](https://img.shields.io/badge/Docker-ready-blue)](../docker-compose.yml)

---

## O que é o BookingPro?

O BookingPro é um sistema de gestão empresarial gratuito e de código aberto, desenvolvido para negócios de serviços: salões de beleza, oficinas mecânicas, cafés, clínicas odontológicas, academias e muito mais.

Sem mensalidades. Sem comissões sobre suas vendas. Seus dados ficam no seu próprio servidor.

---

## Funcionalidades

| Módulo | Descrição |
|---|---|
| **Ponto de Venda (PDV)** | Finalize uma venda em 3 cliques. Dinheiro, cartão, transferência. Número do recibo gerado automaticamente. Funciona offline (PWA) — sincroniza automaticamente ao voltar a conexão. |
| **CRM** | Histórico completo de clientes — visitas, gastos, tags, aniversário, anotações. |
| **Estoque** | Controle de estoque com alertas de baixo nível via Telegram e e-mail. |
| **Agenda de Compromissos** | Visualização semanal, novos agendamentos, acompanhamento de status, página pública de agendamento. |
| **Agendamento Online** | Clientes agendam sem cadastro pelo link público (`/book/seu-slug`). Horários de funcionamento com intervalo/almoço configurável, geração de slots, sem conflito de horários. |
| **Bot do Telegram** | O dono recebe notificações instantâneas: novos agendamentos, lembretes, estoque baixo. Comandos: `/today`, `/help`. |
| **Bot do Viber** | Mesmas notificações do Telegram, entregues pelo Viber. Clientes vinculam seu Viber com `/link {telefone}`. ⚠️ Novos bots exigem acordo comercial com o Viber (~€100/mês). Funciona com bots criados antes de fev/2024. |
| **WhatsApp** | Mensagens diretas para clientes via Meta Cloud API — confirmações, lembretes, agradecimentos, reativação, aniversário. |
| **Notificações por E-mail** | Confirmação de agendamento, lembretes 24h e 1h antes, agradecimento, reativação, parabéns de aniversário. |
| **Configurações** | Serviços, funcionários, horários de funcionamento, dados do negócio, canais de notificação. |
| **Multi-empresa** | Uma única instalação pode atender vários negócios (Supabase RLS). Instalações próprias já vêm com suporte a domínio personalizado e logotipo. |

---

## Tecnologias

- **Framework**: [Next.js 16](https://nextjs.org) — App Router, Server Actions, Server Components
- **Banco de dados**: [Supabase](https://supabase.com) — PostgreSQL + Auth + Row Level Security
- **UI**: [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix UI)
- **E-mail**: [Resend](https://resend.com) ou qualquer servidor SMTP
- **Mensageria**: Telegram Bot API · Viber Bot API · Meta WhatsApp Cloud API
- **i18n**: [next-intl](https://next-intl-docs.vercel.app) — inglês por padrão, facilmente extensível
- **Deploy**: Docker + Docker Compose

---

## Requisitos

- Docker e Docker Compose v2.1+ instalados
- Compatível com Linux, Windows 10/11, macOS ou qualquer VPS
- Mínimo: 1 GB de RAM, 10 GB de armazenamento
- [Instalar o Docker →](https://docs.docker.com/get-docker/)

---

## Início Rápido

### Opção 1 — Docker (recomendado para hospedagem própria)

**Requisitos:** Docker, Docker Compose v2.1+, uma conta gratuita no [Supabase](https://supabase.com).

```bash
# 1. Clonar o repositório
git clone https://github.com/SGrappelli/pronto.git
cd pronto

# 2. Copiar o arquivo de ambiente e preencher os valores
cp .env.example .env
# Editar o .env — veja a seção de Configuração abaixo

# 3. Desativar a confirmação de e-mail no Supabase (obrigatório para hospedagem própria)
# Dashboard → Authentication → Providers → Email → desmarcar "Confirm email" → Save

# 4. Iniciar a aplicação — as migrações são aplicadas automaticamente na primeira execução
docker-compose up -d

# A aplicação estará disponível em http://localhost:3000
# Na primeira execução, o docker-compose inicia um serviço "migrate" que aplica
# todas as migrações SQL e depois inicia a aplicação. Nenhum passo manual de SQL é necessário.
```

### Opção 2 — Desenvolvimento local

```bash
git clone https://github.com/SGrappelli/pronto.git
cd pronto
npm install
cp .env.example .env
# Editar .env com suas credenciais do Supabase
npm run dev
# A aplicação estará disponível em http://localhost:3000
```

---

## Configuração

Copie `.env.example` para `.env` e preencha os valores obrigatórios:

```env
# ── Obrigatórios ──────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key
SUPABASE_SERVICE_ROLE_KEY=sua-service-role-key
NEXT_PUBLIC_APP_URL=https://seudominio.com   # ou http://localhost:3000

# String de conexão PostgreSQL (para migrações automáticas)
# Supabase Dashboard → Project Settings → Database → Connection string (Session mode)
DATABASE_URL=postgresql://postgres.[ref]:[password]@[host]:5432/postgres

# ── E-mail (escolha uma opção) ────────────────────────
# Opção A: Resend (mais fácil — plano gratuito: 3.000 e-mails/mês)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=BookingPro <noreply@seudominio.com>

# Opção B: Seu próprio servidor SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=seu@gmail.com
# SMTP_PASS=sua-senha-de-app
# SMTP_FROM=BookingPro <seu@gmail.com>

# ── Cron secret (protege /api/cron/notify) ───────────
CRON_SECRET=substituir-por-string-aleatoria

# ── WhatsApp (opcional) ───────────────────────────────
# META_WHATSAPP_PHONE_NUMBER_ID=
# META_WHATSAPP_ACCESS_TOKEN=
```

Consulte `.env.example` para a lista completa, incluindo Telegram, Viber e configurações opcionais para modo SaaS.

### Configuração do Supabase

1. Crie um projeto gratuito em [supabase.com](https://supabase.com)
2. Copie sua **string de conexão com o banco de dados** (modo Session, porta 5432) em  
   **Project Settings → Database → Connection string** e defina como `DATABASE_URL` no `.env`  
   As migrações são aplicadas automaticamente ao executar `docker-compose up`
3. **Personalize os templates de e-mail** — substitua os e-mails padrão do Supabase pelos do BookingPro:
   - Acesse **Authentication → Email Templates** no seu Supabase Dashboard
   - Para cada template, abra o arquivo, copie o HTML e cole no Supabase:

   | Template no Supabase | Arquivo |
   |---|---|
   | Reset Password | `supabase/email-templates/reset-password.html` |
   | Confirm signup | `supabase/email-templates/confirm-signup.html` |
   | Change Email Address | `supabase/email-templates/email-change.html` |

4. **Configure o remetente** — em **Authentication → Email Settings**:
   - **Sender name**: `BookingPro` (ou o nome da sua marca)
   - **Reply-to**: seu e-mail de suporte
5. Acesse **Authentication → Providers** e ative **Email** (opcionalmente Google OAuth)
6. Copie a URL do seu projeto e as chaves de API para o `.env`

---

## Checklist de segurança após a instalação

Depois de implantar, acesse o dashboard do seu projeto Supabase e confira **Advisors → Security Advisor**. Este projeto segue as boas práticas de RLS do Postgres/Supabase em cada migração, mas o próprio advisor do Supabase é a única forma de confirmar o estado real do seu banco de dados específico — incluindo qualquer objeto que já existisse no seu projeto antes de rodar essas migrações, ou alterações personalizadas que você mesmo tenha feito. Corrija tudo o que for sinalizado ali antes de usar isso em produção com dados reais de clientes.

---

## Eventos de Notificação

O BookingPro envia notificações automáticas por todos os canais configurados.

| Gatilho | Destinatário | Canal |
|---|---|---|
| Agendamento confirmado | Cliente | E-mail + WhatsApp |
| Agendamento confirmado | Dono do negócio | Telegram + Viber |
| 24h antes do compromisso | Cliente | E-mail + WhatsApp + Telegram† + Viber† |
| 24h antes do compromisso | Dono do negócio | Telegram + Viber |
| 1h antes do compromisso | Cliente | E-mail + WhatsApp + Telegram† + Viber† |
| 1h antes do compromisso | Dono do negócio | Telegram + Viber |
| Visita concluída | Cliente (agradecimento + link para reagendar) | E-mail + WhatsApp + Telegram† + Viber† |
| 30 dias sem visita | Cliente (reativação) | E-mail + WhatsApp |
| Aniversário | Cliente | E-mail + WhatsApp |
| Estoque baixo | Dono do negócio | E-mail + Telegram + Viber |

† O cliente recebe notificações pelo Telegram/Viber apenas se tiver vinculado seu perfil com `/link {telefone}` no bot.

**Configuração do cron** — chame este endpoint a cada 15 minutos pelo [cron-job.org](https://cron-job.org) (gratuito):
```
GET https://seudominio.com/api/cron/notify
Authorization: Bearer SEU_CRON_SECRET
```

Ou use o agendador integrado pg_cron — veja [Configurar notificações cron](#configurar-o-cron-de-notificações) abaixo.

---

## Bot do Telegram

1. Abra [@BotFather](https://t.me/BotFather) → `/newbot` → copie o token
2. No BookingPro: **Configurações → Notificações** → cole o token → clique em **Conectar**
3. Abra seu bot no Telegram → envie `/start`

Comandos disponíveis (para o dono):
- `/today` — compromissos de hoje
- `/help` — lista de comandos

**Clientes podem vincular seu perfil do Telegram:**

Se um cliente quiser receber lembretes pelo Telegram, ele envia um comando para o bot:
```
/link +5511999999999
```
Substitua pelo número de telefone usado no agendamento. O ID do Telegram será salvo automaticamente.

Você também pode preencher o ID do Telegram manualmente em **CRM → ficha do cliente**.

Notificações automáticas para o dono:
- 📅 Novo agendamento (com origem: interno / online)
- 🔔 Lembretes de compromisso (24h e 1h antes)
- ⚠️ Alertas de estoque baixo
- ✅ Confirmação de visita concluída

---

## Bot do Viber

> ⚠️ **Importante:** Desde fevereiro de 2024, o Viber exige um acordo comercial para criar novos chatbots (~€100/mês). Esta integração funciona com bots criados antes dessa data ou com acordo ativo. **Para novas instalações, recomendamos o Telegram (gratuito).**

1. Acesse [partners.viber.com](https://partners.viber.com) com sua conta de bot → copie o token
2. No BookingPro: **Configurações → Notificações** → cole o token do Viber → clique em **Conectar**
3. Encontre seu bot no Viber e inicie uma conversa — você receberá uma mensagem de boas-vindas

As mesmas notificações do Telegram são entregues pelo Viber (novos agendamentos, lembretes, estoque baixo, visitas concluídas).

**Clientes podem vincular seu perfil do Viber:**

```
/link +5511999999999
```
Substitua pelo número usado no agendamento. O ID do Viber será salvo automaticamente.

Você também pode preenchê-lo manualmente em **CRM → ficha do cliente → Viber ID**.

---

## WhatsApp (Meta Cloud API)

Ao contrário do Telegram/Viber (que notificam o *dono do negócio*), as mensagens do WhatsApp vão diretamente para os *clientes*: confirmações, lembretes, agradecimentos, reativação e parabéns de aniversário.

**Configuração:**

1. Acesse [developers.facebook.com](https://developers.facebook.com) → crie um Meta App → adicione o produto **WhatsApp**
2. Em **WhatsApp → API Setup**, copie o *Phone Number ID* e o *Access Token*
3. **Recomendado: crie um token permanente** — no [Meta Business Manager](https://business.facebook.com) → Configurações → Usuários → Usuários do sistema → crie um usuário → atribua seu app → gere o token com permissões `whatsapp_business_messaging` + `whatsapp_business_management`. Este token não expira.
4. Adicione ao seu `.env`:
   ```env
   META_WHATSAPP_PHONE_NUMBER_ID=seu-phone-number-id
   META_WHATSAPP_ACCESS_TOKEN=seu-token-permanente
   ```
5. Reinicie o servidor — Configurações → Notificações exibirá um badge verde "Conectado"
6. Adicione os números de WhatsApp dos clientes em **CRM → ficha do cliente → WhatsApp** — eles receberão mensagens automaticamente

**Formato do número:** insira com ou sem `+` — o BookingPro normaliza automaticamente (ex.: `+55 11 99999-9999` → `5511999999999`).

> ⚠️ **Limites de mensagens do WhatsApp:** Mensagens de texto livre (`type: text`) só funcionam dentro de uma **janela de atendimento ao cliente de 24 horas**, aberta quando o cliente escreve primeiro para o negócio. Mensagens iniciadas pelo negócio — lembretes, agradecimentos, reativação, aniversário — exigem **Modelos de Mensagem (HSM) pré-aprovados** no Meta Business Manager. Sem modelos aprovados, essas mensagens são descartadas silenciosamente pelo Meta. Para suporte completo a notificações via cron pelo WhatsApp, crie e envie seus modelos em [business.facebook.com → Ferramentas de conta → Modelos de mensagem](https://business.facebook.com).

---

## Configurar o Cron de Notificações

O arquivo `supabase/migrations/007_cron_jobs.sql` configura um agendador automático dentro do Supabase que chama `/api/cron/notify` a cada 15 minutos.

**Por que isso importa:** Sem isso, lembretes e mensagens de agradecimento nunca são enviados. O cron é o motor que alimenta todas as notificações automáticas.

### Passo 1 — Ativar extensões no Supabase Dashboard

1. Acesse seu [Supabase Dashboard](https://supabase.com) → abra seu projeto
2. Na barra lateral esquerda, clique em **Database** → depois em **Extensions**
3. Procure por **pg_cron** → ative
4. Procure por **pg_net** → ative (se ainda não estiver ativo)

### Passo 2 — Editar o arquivo de migração

Abra `supabase/migrations/007_cron_jobs.sql` e substitua dois valores:

| Placeholder | Substituir por |
|---|---|
| `YOUR_APP_URL` | A URL da sua aplicação em produção, ex.: `https://minhaapp.com.br` |
| `YOUR_CRON_SECRET` | O valor de `CRON_SECRET` no seu arquivo `.env` |

### Passo 3 — Executar a migração

SQL Editor → cole `007_cron_jobs.sql` → clique em **Run**.

Você verá `SELECT 1` nos resultados — o cron job foi criado.

### Passo 4 — Verificar

```sql
SELECT * FROM cron.job WHERE jobname = 'pronto-notify';
```

### Alternativa: cron externo (cron-job.org)

1. Crie uma conta gratuita em [cron-job.org](https://cron-job.org)
2. Crie um novo job:
   - **URL**: `https://seudominio.com/api/cron/notify`
   - **Agendamento**: a cada 15 minutos
   - **Headers**: adicione `Authorization: Bearer SEU_CRON_SECRET`
3. Nenhuma alteração no banco de dados é necessária

---

## Deploy

### VPS / Servidor

```bash
# No seu servidor
git clone https://github.com/SGrappelli/pronto.git
cd pronto
cp .env.example .env
# Editar .env
docker-compose up -d
```

Aponte seu domínio para o servidor e configure um proxy reverso (Nginx, Caddy ou Cloudflare Tunnel).

### Exemplo de configuração Nginx

```nginx
server {
    listen 80;
    server_name seudominio.com.br;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Estrutura do Projeto

```
pronto/
├── app/
│   ├── (auth)/          # Login, Cadastro, Verificar e-mail
│   ├── (dashboard)/     # PDV, CRM, Estoque, Agendamentos, Configurações, Dashboard
│   ├── api/             # E-mail, webhooks Telegram/Viber, Cron, Faturamento
│   ├── book/[slug]/     # Página pública de agendamento (sem login)
│   └── onboarding/      # Assistente de configuração inicial
├── components/
│   ├── layout/          # Barra lateral, Header
│   └── ui/              # Button, Badge, Card, DatePicker...
├── lib/
│   ├── supabase/        # Helpers de cliente e servidor
│   ├── email.ts         # Templates de e-mail + envio
│   ├── mailer.ts        # Transporte Resend / SMTP
│   ├── telegram.ts      # Telegram Bot API + templates
│   ├── viber.ts         # Viber Bot API + templates
│   ├── whatsapp.ts      # Meta WhatsApp Cloud API + templates
│   └── utils.ts         # Utilitários (formatCurrency, formatDate…)
├── messages/
│   └── en.json          # Textos da UI (adicione novos idiomas aqui)
├── supabase/
│   └── migrations/      # Arquivos SQL — aplicados automaticamente no primeiro docker-compose up
├── .env.example         # Template de variáveis de ambiente
└── docker-compose.yml
```

---

## Adicionar um Novo Idioma

1. Copie `messages/en.json` para `messages/pt.json` (ou qualquer idioma)
2. Traduza todos os valores
3. Atualize `i18n/request.ts` para detectar e servir o novo idioma

---

## Serviços Profissionais

Precisa de ajuda para começar? Ofereço:

- **Instalação e configuração** — instalo o BookingPro no seu servidor, configuro todas as integrações e deixo tudo funcionando ($100–200)
- **Personalização** — funcionalidades sob medida, identidade visual ou integrações específicas para o seu negócio ($150–400)
- **Hospedagem gerenciada** — não quer gerenciar um servidor? Use a versão na nuvem em [trypronto.app](https://trypronto.app) a partir de $19/mês

  A versão na nuvem também inclui algumas funcionalidades que não fazem parte do núcleo self-hosted: programa de fidelidade e painel de análises.

Contato: [ukv2179@gmail.com](mailto:ukv2179@gmail.com) ou abra uma issue com a label `services`.

---

## Contribuindo

Consulte [CONTRIBUTING.md](../CONTRIBUTING.md) para a configuração do ambiente de desenvolvimento e as diretrizes de contribuição.

Pull requests são bem-vindos! Por favor, abra uma issue primeiro para discutir mudanças significativas.

---

## Licença

[MIT](../LICENSE) — livre para usar, modificar e hospedar no seu próprio servidor.

---

## Roadmap

### ✅ v1.1 — Disponível agora
- Ponto de venda (PDV) com modo offline
- Gestão de clientes (CRM) com histórico completo de visitas
- Controle de estoque com alertas de baixo nível
- Agenda de compromissos com arrastar e soltar
- Página de agendamento online — sem cadastro para o cliente
- Intervalo/almoço configurável nos horários de funcionamento
- Notificações multicanal: E-mail · Telegram · WhatsApp · Viber
- PWA — instalável em qualquer dispositivo sem App Store
- Instalação com um único comando via Docker
- Arquitetura multi-empresa

### 🔜 v1.5 — Q3 2026
- Painel de análises (receita, LTV, serviços mais populares)
- Notificações pelo LINE (Japão, Tailândia, Taiwan)
- PWA para clientes (histórico de agendamentos, cartão fidelidade)
- Gestão de equipe com folha de pagamento e comissões
- Insights de negócio com inteligência artificial
- Interface em múltiplos idiomas (ES, RU, PT)

### 🌐 v2.0 — Q4 2026
- Canais de mensageria adicionais
- Acesso por API para integrações externas

---

Tem uma sugestão? [Abra uma issue](https://github.com/SGrappelli/pronto/issues)
— o feedback da comunidade define o roadmap.
