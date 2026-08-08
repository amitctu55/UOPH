# Production image: API Gateway with shared workspace libraries
FROM node:20-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY libs/shared/package.json ./libs/shared/
COPY services/gateway/package.json ./services/gateway/

RUN npm ci --workspace=upchar-shared --workspace=upchar-api-gateway --include-workspace-root --ignore-scripts

COPY libs/shared/tsconfig.json ./libs/shared/
COPY libs/shared/src ./libs/shared/src
COPY services/gateway/nest-cli.json services/gateway/tsconfig.json ./services/gateway/
COPY services/gateway/src ./services/gateway/src

RUN npm run build --workspace=upchar-shared && npm run build --workspace=upchar-api-gateway

FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
COPY libs/shared/package.json ./libs/shared/
COPY services/gateway/package.json ./services/gateway/

RUN npm ci --workspace=upchar-shared --workspace=upchar-api-gateway --omit=dev --include-workspace-root --ignore-scripts

COPY --from=builder /app/libs/shared/dist ./libs/shared/dist
COPY --from=builder /app/services/gateway/dist ./services/gateway/dist

WORKDIR /app/services/gateway
EXPOSE 3000
CMD ["node", "dist/main.js"]
