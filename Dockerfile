# Production image: API Gateway with shared workspace libraries
FROM node:20-bookworm-slim AS builder
WORKDIR /app

COPY . .

RUN npm ci --workspace=upchar-shared --workspace=upchar-api-gateway --include-workspace-root --ignore-scripts
RUN npm run build --workspace=upchar-shared && npm run build --workspace=upchar-api-gateway
RUN npm prune --omit=dev --ignore-scripts

WORKDIR /app/services/gateway
ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "dist/main.js"]
