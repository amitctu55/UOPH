# Production image: API Gateway (npm workspace monorepo)
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY services/gateway/package.json ./services/gateway/

RUN npm ci --workspace=upchar-api-gateway --include-workspace-root

COPY services/gateway/nest-cli.json ./services/gateway/
COPY services/gateway/tsconfig.json ./services/gateway/
COPY services/gateway/src ./services/gateway/src

RUN npm run build --workspace=upchar-api-gateway

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY services/gateway/package.json ./services/gateway/

RUN npm ci --workspace=upchar-api-gateway --omit=dev --include-workspace-root

COPY --from=builder /app/services/gateway/dist ./services/gateway/dist

WORKDIR /app/services/gateway
EXPOSE 3000
CMD ["node", "dist/main.js"]
