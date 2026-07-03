FROM node:20-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json turbo.json .npmrc ./
COPY apps/backend/package.json ./apps/backend/package.json

RUN npm ci

COPY . .

RUN npx turbo run build --filter=backend

EXPOSE 9000

WORKDIR /app/apps/backend
CMD ["npx", "medusa", "start"]
