🌍 [English](../README.md) | **Español** | [Português](README.pt.md)

# BookingPro — Sistema de Gestión para Negocios de Servicios

> POS · CRM · Inventario · Reservas · Notificaciones multicanal. Todo en tu servidor.  
> Tus datos, tu servidor. Sin comisiones. Instalación con un solo comando.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](../LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)](https://supabase.com)
[![Docker](https://img.shields.io/badge/Docker-ready-blue)](../docker-compose.yml)

---

## ¿Qué es BookingPro?

BookingPro es un sistema de gestión empresarial gratuito y de código abierto, diseñado para negocios de servicios: salones de belleza, talleres mecánicos, cafeterías, clínicas dentales, gimnasios y mucho más.

Sin cuotas mensuales. Sin comisiones sobre tus ventas. Tus datos se quedan en tu propio servidor.

---

## Funcionalidades

| Módulo | Descripción |
|---|---|
| **Punto de Venta (POS)** | Cierra una venta en 3 clics. Efectivo, tarjeta, transferencia. Número de recibo generado automáticamente. Funciona sin conexión (PWA) — sincroniza automáticamente al recuperar internet. |
| **CRM** | Historial completo de clientes — visitas, gastos, etiquetas, cumpleaños, notas. |
| **Inventario** | Control de stock con alertas de bajo inventario por Telegram y email. |
| **Calendario de Citas** | Vista semanal, nuevas citas, seguimiento de estado, página pública de reservas. |
| **Reservas Online** | Los clientes reservan sin registrarse mediante un enlace público (`/book/tu-slug`). Horarios con descanso/almuerzo configurable, generación de turnos, sin doble reserva. |
| **Bot de Telegram** | El dueño recibe notificaciones instantáneas: nuevas reservas, recordatorios, stock bajo. Comandos: `/today`, `/help`. |
| **Bot de Viber** | Las mismas notificaciones que Telegram, entregadas por Viber. Los clientes vinculan su perfil con `/link {teléfono}`. ⚠️ Los bots nuevos requieren acuerdo comercial con Viber (~€100/mes). Funciona con bots creados antes de febrero de 2024. |
| **WhatsApp** | Mensajes directos a clientes vía Meta Cloud API — confirmaciones, recordatorios, agradecimientos, reactivación, cumpleaños. |
| **Notificaciones por Email** | Confirmación de reserva, recordatorios 24h y 1h antes, agradecimiento, reactivación, felicitación de cumpleaños. |
| **Configuración** | Servicios, empleados, horarios, información del negocio, canales de notificación. |
| **Multi-empresa** | Una sola instalación puede gestionar múltiples negocios (Supabase RLS). Las instalaciones propias incluyen dominio personalizado y logo de serie. |

---

## Tecnologías

- **Framework**: [Next.js 16](https://nextjs.org) — App Router, Server Actions, Server Components
- **Base de datos**: [Supabase](https://supabase.com) — PostgreSQL + Auth + Row Level Security
- **UI**: [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (Radix UI)
- **Email**: [Resend](https://resend.com) o cualquier servidor SMTP
- **Mensajería**: Telegram Bot API · Viber Bot API · Meta WhatsApp Cloud API
- **i18n**: [next-intl](https://next-intl-docs.vercel.app) — inglés por defecto, fácilmente extensible
- **Despliegue**: Docker + Docker Compose

---

## Requisitos

- Docker y Docker Compose v2.1+ instalados
- Compatible con Linux, Windows 10/11, macOS o cualquier VPS
- Mínimo: 1 GB de RAM, 10 GB de almacenamiento
- [Instalar Docker →](https://docs.docker.com/get-docker/)

---

## Inicio Rápido

### Opción 1 — Docker (recomendado para servidores propios)

**Requisitos:** Docker, Docker Compose v2.1+, una cuenta gratuita en [Supabase](https://supabase.com).

```bash
# 1. Clonar el repositorio
git clone https://github.com/SGrappelli/pronto.git
cd pronto

# 2. Copiar el archivo de entorno y completar los valores
cp .env.example .env
# Editar .env — ver la sección de Configuración más abajo

# 3. Desactivar confirmación de email en Supabase (obligatorio para instalación propia)
# Dashboard → Authentication → Providers → Email → desmarcar "Confirm email" → Save

# 4. Iniciar la aplicación — las migraciones se aplican automáticamente al primer inicio
docker-compose up -d

# La app estará en http://localhost:3000
# En el primer arranque, docker-compose ejecuta un servicio "migrate" que aplica
# todas las migraciones SQL y luego inicia la app. No se requieren pasos manuales en SQL.
```

### Opción 2 — Desarrollo local

```bash
git clone https://github.com/SGrappelli/pronto.git
cd pronto
npm install
cp .env.example .env
# Editar .env con tus credenciales de Supabase
npm run dev
# La app estará en http://localhost:3000
```

---

## Configuración

Copia `.env.example` a `.env` y completa los valores requeridos:

```env
# ── Obligatorios ──────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key
SUPABASE_SERVICE_ROLE_KEY=tu-service-role-key
NEXT_PUBLIC_APP_URL=https://tudominio.com   # o http://localhost:3000

# Cadena de conexión PostgreSQL (para migraciones automáticas)
# Supabase Dashboard → Project Settings → Database → Connection string (Session mode)
DATABASE_URL=postgresql://postgres.[ref]:[password]@[host]:5432/postgres

# ── Email (elige una opción) ──────────────────────────
# Opción A: Resend (la más fácil — nivel gratuito: 3.000 emails/mes)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=BookingPro <noreply@tudominio.com>

# Opción B: Tu propio servidor SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=tu@gmail.com
# SMTP_PASS=tu-contraseña-de-app
# SMTP_FROM=BookingPro <tu@gmail.com>

# ── Cron secret (protege /api/cron/notify) ───────────
CRON_SECRET=reemplazar-con-cadena-aleatoria

# ── WhatsApp (opcional) ───────────────────────────────
# META_WHATSAPP_PHONE_NUMBER_ID=
# META_WHATSAPP_ACCESS_TOKEN=
```

Consulta `.env.example` para la lista completa, incluyendo Telegram, Viber y configuración opcional para modo SaaS.

### Configuración de Supabase

1. Crea un proyecto gratuito en [supabase.com](https://supabase.com)
2. Copia tu **cadena de conexión a la base de datos** (modo Session, puerto 5432) desde  
   **Project Settings → Database → Connection string** y configúrala como `DATABASE_URL` en `.env`  
   Las migraciones se aplican automáticamente al ejecutar `docker-compose up`
3. **Personaliza las plantillas de email** — reemplaza los correos predeterminados de Supabase con los de BookingPro:
   - Ve a **Authentication → Email Templates** en tu Supabase Dashboard
   - Para cada plantilla, abre el archivo, copia el HTML y pégalo en Supabase:

   | Plantilla en Supabase | Archivo |
   |---|---|
   | Reset Password | `supabase/email-templates/reset-password.html` |
   | Confirm signup | `supabase/email-templates/confirm-signup.html` |
   | Change Email Address | `supabase/email-templates/email-change.html` |

4. **Configura el remitente** — en **Authentication → Email Settings**:
   - **Sender name**: `BookingPro` (o el nombre de tu marca)
   - **Reply-to**: tu email de soporte
5. Ve a **Authentication → Providers** y activa **Email** (opcionalmente Google OAuth)
6. Copia la URL de tu proyecto y las claves API a `.env`

---

## Checklist de seguridad después de la instalación

Después de desplegar, entra al dashboard de tu proyecto de Supabase y revisa **Advisors → Security Advisor**. Este proyecto sigue las mejores prácticas de RLS de Postgres/Supabase en cada migración, pero el propio advisor de Supabase es la única forma de confirmar el estado real de tu base de datos específica — incluyendo cualquier objeto que ya existiera en tu proyecto antes de ejecutar estas migraciones, o cambios personalizados que hayas hecho tú mismo. Corrige cualquier alerta que aparezca ahí antes de usar esto en producción con datos reales de clientes.

---

## Eventos de Notificación

BookingPro envía notificaciones automáticas por todos los canales configurados.

| Disparador | Destinatario | Canal |
|---|---|---|
| Reserva confirmada | Cliente | Email + WhatsApp |
| Reserva confirmada | Dueño del negocio | Telegram + Viber |
| 24h antes de la cita | Cliente | Email + WhatsApp + Telegram† + Viber† |
| 24h antes de la cita | Dueño del negocio | Telegram + Viber |
| 1h antes de la cita | Cliente | Email + WhatsApp + Telegram† + Viber† |
| 1h antes de la cita | Dueño del negocio | Telegram + Viber |
| Visita completada | Cliente (agradecimiento + enlace para volver a reservar) | Email + WhatsApp + Telegram† + Viber† |
| 30 días sin visita | Cliente (reactivación) | Email + WhatsApp |
| Cumpleaños | Cliente | Email + WhatsApp |
| Stock bajo | Dueño del negocio | Email + Telegram + Viber |

† El cliente recibe notificaciones por Telegram/Viber solo si vinculó su perfil con `/link {teléfono}` en el bot.

**Configuración del cron** — llama a este endpoint cada 15 minutos desde [cron-job.org](https://cron-job.org) (gratuito):
```
GET https://tudominio.com/api/cron/notify
Authorization: Bearer TU_CRON_SECRET
```

O usa el scheduler integrado pg_cron — ver [Configurar notificaciones cron](#configurar-el-cron-de-notificaciones) más abajo.

---

## Bot de Telegram

1. Abre [@BotFather](https://t.me/BotFather) → `/newbot` → copia el token
2. En BookingPro: **Configuración → Notificaciones** → pega el token → haz clic en **Conectar**
3. Abre tu bot en Telegram → envía `/start`

Comandos disponibles (para el dueño):
- `/today` — citas de hoy
- `/help` — lista de comandos

**Los clientes pueden vincular su perfil de Telegram:**

Si un cliente quiere recibir recordatorios por Telegram, envía un comando al bot:
```
/link +521234567890
```
Reemplaza con el número de teléfono que usó al hacer la reserva. Su ID de Telegram se guardará automáticamente.

También puedes ingresar el ID de Telegram manualmente en **CRM → ficha del cliente**.

Notificaciones automáticas para el dueño:
- 📅 Nueva reserva (con origen: interna / online)
- 🔔 Recordatorios de cita (24h y 1h antes)
- ⚠️ Alertas de stock bajo
- ✅ Confirmación de visita completada

---

## Bot de Viber

> ⚠️ **Importante:** Desde febrero de 2024, Viber requiere un acuerdo comercial para crear nuevos chatbots (~€100/mes). Esta integración funciona con bots creados antes de esa fecha o si tienes un acuerdo vigente. **Para nuevas instalaciones, se recomienda Telegram (gratuito).**

1. Inicia sesión en [partners.viber.com](https://partners.viber.com) con tu cuenta de bot → copia el token
2. En BookingPro: **Configuración → Notificaciones** → pega el token de Viber → haz clic en **Conectar**
3. Busca tu bot en Viber e inicia una conversación — recibirás un mensaje de bienvenida

Se entregan las mismas notificaciones que Telegram a través de Viber (nuevas reservas, recordatorios, stock bajo, visitas completadas).

**Los clientes pueden vincular su perfil de Viber:**

```
/link +521234567890
```
Reemplaza con el número de teléfono usado al reservar. Su ID de Viber se guardará automáticamente.

También puedes ingresarlo manualmente en **CRM → ficha del cliente → Viber ID**.

---

## WhatsApp (Meta Cloud API)

A diferencia de Telegram/Viber (que notifican al *dueño del negocio*), los mensajes de WhatsApp van directamente a los *clientes*: confirmaciones, recordatorios, agradecimientos, reactivación y felicitaciones de cumpleaños.

**Configuración:**

1. Ve a [developers.facebook.com](https://developers.facebook.com) → crea una Meta App → agrega el producto **WhatsApp**
2. En **WhatsApp → API Setup**, copia el *Phone Number ID* y el *Access Token*
3. **Recomendado: crea un token permanente** — en [Meta Business Manager](https://business.facebook.com) → Configuración → Usuarios → Usuarios del sistema → crea un usuario → asigna tu app → genera el token con permisos `whatsapp_business_messaging` + `whatsapp_business_management`. Este token no expira.
4. Agrega a tu `.env`:
   ```env
   META_WHATSAPP_PHONE_NUMBER_ID=tu-phone-number-id
   META_WHATSAPP_ACCESS_TOKEN=tu-token-permanente
   ```
5. Reinicia el servidor — Configuración → Notificaciones mostrará un badge verde "Conectado"
6. Agrega los números de WhatsApp de los clientes en **CRM → ficha del cliente → WhatsApp** — recibirán mensajes automáticamente

**Formato del número:** ingresa con o sin `+` — BookingPro lo normaliza automáticamente (ej. `+52 55 1234 5678` → `525512345678`).

> ⚠️ **Límites de mensajería de WhatsApp:** Los mensajes de texto libre (`type: text`) solo funcionan dentro de una **ventana de atención al cliente de 24 horas** que se abre cuando el cliente escribe primero al negocio. Los mensajes iniciados por el negocio — recordatorios, agradecimientos, reactivación, cumpleaños — requieren **Plantillas de Mensaje (HSM) aprobadas previamente** en Meta Business Manager. Sin plantillas aprobadas, estos mensajes son descartados silenciosamente por Meta. Para soporte completo de notificaciones cron vía WhatsApp, crea y envía tus plantillas en [business.facebook.com → Herramientas de cuenta → Plantillas de mensajes](https://business.facebook.com).

---

## Configurar el Cron de Notificaciones

El archivo `supabase/migrations/007_cron_jobs.sql` configura un programador automático dentro de Supabase que llama a `/api/cron/notify` cada 15 minutos.

**Por qué importa:** Sin esto, los recordatorios y mensajes de agradecimiento nunca se envían. El cron es el motor que impulsa todas las notificaciones automáticas.

### Paso 1 — Activar extensiones en Supabase Dashboard

1. Ve a tu [Supabase Dashboard](https://supabase.com) → abre tu proyecto
2. En la barra lateral izquierda haz clic en **Database** → luego en **Extensions**
3. Busca **pg_cron** → actívalo
4. Busca **pg_net** → actívalo (si no está ya activado)

### Paso 2 — Editar el archivo de migración

Abre `supabase/migrations/007_cron_jobs.sql` y reemplaza dos valores:

| Placeholder | Reemplazar con |
|---|---|
| `YOUR_APP_URL` | La URL de tu app desplegada, ej. `https://miapp.com` |
| `YOUR_CRON_SECRET` | El valor de `CRON_SECRET` en tu archivo `.env` |

### Paso 3 — Ejecutar la migración

SQL Editor → pega `007_cron_jobs.sql` → haz clic en **Run**.

Deberías ver `SELECT 1` en los resultados — el cron job fue creado.

### Paso 4 — Verificar

```sql
SELECT * FROM cron.job WHERE jobname = 'pronto-notify';
```

### Alternativa: cron externo (cron-job.org)

1. Crea una cuenta gratuita en [cron-job.org](https://cron-job.org)
2. Crea un nuevo trabajo:
   - **URL**: `https://tudominio.com/api/cron/notify`
   - **Programación**: cada 15 minutos
   - **Headers**: agrega `Authorization: Bearer TU_CRON_SECRET`
3. No se requieren cambios en la base de datos

---

## Despliegue

### VPS / Servidor

```bash
# En tu servidor
git clone https://github.com/SGrappelli/pronto.git
cd pronto
cp .env.example .env
# Editar .env
docker-compose up -d
```

Apunta tu dominio al servidor y configura un proxy inverso (Nginx, Caddy o Cloudflare Tunnel).

### Ejemplo de configuración Nginx

```nginx
server {
    listen 80;
    server_name tudominio.com;
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## Estructura del Proyecto

```
pronto/
├── app/
│   ├── (auth)/          # Login, Registro, Verificar email
│   ├── (dashboard)/     # POS, CRM, Inventario, Reservas, Configuración, Dashboard
│   ├── api/             # Email, webhooks Telegram/Viber, Cron, Facturación
│   ├── book/[slug]/     # Página pública de reservas (sin login)
│   └── onboarding/      # Asistente de configuración inicial
├── components/
│   ├── layout/          # Barra lateral, Header
│   └── ui/              # Button, Badge, Card, DatePicker...
├── lib/
│   ├── supabase/        # Helpers de cliente y servidor
│   ├── email.ts         # Plantillas de email + envío
│   ├── mailer.ts        # Transporte Resend / SMTP
│   ├── telegram.ts      # Telegram Bot API + plantillas
│   ├── viber.ts         # Viber Bot API + plantillas
│   ├── whatsapp.ts      # Meta WhatsApp Cloud API + plantillas
│   └── utils.ts         # Utilidades (formatCurrency, formatDate…)
├── messages/
│   └── en.json          # Textos de la UI (agrega nuevos idiomas aquí)
├── supabase/
│   └── migrations/      # Archivos SQL — se aplican automáticamente al iniciar con docker-compose
├── .env.example         # Plantilla de variables de entorno
└── docker-compose.yml
```

---

## Agregar un Nuevo Idioma

1. Copia `messages/en.json` a `messages/es.json` (o cualquier idioma)
2. Traduce todos los valores
3. Actualiza `i18n/request.ts` para detectar y servir el nuevo idioma

---

## Servicios Profesionales

¿Necesitas ayuda para empezar? Ofrezco:

- **Instalación y configuración** — instalo BookingPro en tu servidor, configuro todas las integraciones y te dejo todo funcionando ($100–200)
- **Personalización** — funciones a medida, branding o integraciones específicas para tu negocio ($150–400)
- **Hosting administrado** — ¿no quieres gestionar un servidor? Usa la versión en la nube en [trypronto.app](https://trypronto.app) desde $19/mes

  La versión en la nube incluye además algunas funciones que no forman parte del núcleo self-hosted: programa de fidelización y panel de analíticas.

Contacto: [ukv2179@gmail.com](mailto:ukv2179@gmail.com) o abre un issue con la etiqueta `services`.

---

## Contribuir

Consulta [CONTRIBUTING.md](../CONTRIBUTING.md) para la configuración de desarrollo y las pautas de contribución.

¡Los pull requests son bienvenidos! Por favor abre un issue primero para discutir cambios importantes.

---

## Licencia

[MIT](../LICENSE) — libre para usar, modificar y alojar en tu propio servidor.

---

## Hoja de Ruta

### ✅ v1.1 — Disponible ahora
- Punto de venta (POS) con modo sin conexión
- Gestión de clientes (CRM) con historial completo de visitas
- Control de inventario con alertas de stock bajo
- Calendario de citas con arrastrar y soltar
- Página de reservas online — sin registro para el cliente
- Horario con descanso/almuerzo configurable
- Notificaciones multicanal: Email · Telegram · WhatsApp · Viber
- PWA — instalable en cualquier dispositivo sin App Store
- Instalación con un solo comando mediante Docker
- Arquitectura multi-empresa

### 🔜 v1.5 — Q3 2026
- Panel de analíticas (ingresos, LTV, servicios más populares)
- Notificaciones por LINE (Japón, Tailandia, Taiwán)
- PWA para clientes (historial de reservas, tarjeta de fidelidad)
- Gestión de personal con nómina y comisiones
- Insights empresariales con inteligencia artificial
- Interfaz en múltiples idiomas (ES, RU, PT)

### 🌐 v2.0 — Q4 2026
- Canales de mensajería adicionales
- Acceso por API para integraciones externas

---

¿Tienes una sugerencia? [Abre un issue](https://github.com/SGrappelli/pronto/issues)
— el feedback de la comunidad define la hoja de ruta.
