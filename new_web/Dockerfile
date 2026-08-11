FROM oven/bun:1.3.14-alpine AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .

ARG VITE_CONSOLE_URL
ARG VITE_DOCS_URL
ARG VITE_CONTACT_EMAIL

ENV VITE_CONSOLE_URL=${VITE_CONSOLE_URL}
ENV VITE_DOCS_URL=${VITE_DOCS_URL}
ENV VITE_CONTACT_EMAIL=${VITE_CONTACT_EMAIL}

RUN bun run build

FROM nginx:1.30.0-alpine AS runtime

COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O - http://127.0.0.1/healthz >/dev/null 2>&1 || exit 1