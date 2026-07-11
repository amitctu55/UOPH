FROM node:24-alpine AS builder
WORKDIR /app
COPY package.json package*.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm install --production
EXPOSE 4000
CMD ["node", "dist/main.js"]