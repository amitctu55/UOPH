FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json ./
RUN npm install --ignore-scripts
COPY nest-cli.json tsconfig.json tsconfig.build.json ./
COPY src ./src
RUN npx nest build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV USE_MEMORY_MONGO=false
COPY package.json ./
RUN npm install --omit=dev --ignore-scripts
COPY --from=builder /app/dist ./dist
EXPOSE 4000
CMD ["node", "dist/main.js"]
