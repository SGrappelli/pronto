FROM node:20-alpine AS base

# ── Install app deps ───────────────────────────────
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ── Install migration script deps ─────────────────
FROM base AS script-deps
WORKDIR /app/scripts
COPY scripts/package.json ./
RUN npm install --production

# ── Build ─────────────────────────────────────────
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Allow overriding public env vars at build time (e.g. for staging)
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_DEPLOYMENT_MODE

RUN NODE_OPTIONS=--max-old-space-size=1536 npm run build

# ── Production runner ─────────────────────────────
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Migration runner and SQL files
COPY --from=script-deps --chown=nextjs:nodejs /app/scripts/node_modules ./scripts/node_modules
COPY --chown=nextjs:nodejs scripts/migrate.js ./scripts/migrate.js
COPY --chown=nextjs:nodejs supabase/migrations/ ./supabase/migrations/

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
