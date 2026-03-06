# Etapa de build
FROM node:22-slim AS builder

# Crear directorio de la app
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
# Si usas pnpm/yarn, copia sus archivos también
# COPY pnpm-lock.yaml ./
# COPY yarn.lock ./

# Instalar dependencias (incluyendo devDependencies para build)
RUN npm ci

# Copiar el resto del código
COPY . .

# Compilar front (Vite) si tu build genera carpeta dist
# Si usas Vite + Express en modo SSR o el server.ts sirve todo,
# mantén el paso de build igualmente
RUN npm run build

# Etapa final
FROM node:22-slim AS runner

WORKDIR /app

# Instalar sólo dependencias de producción
COPY package*.json ./
RUN npm ci --omit=dev

# Copiar código y artefactos de build desde la etapa anterior
COPY --from=builder /app ./

# Variables de entorno por defecto (puedes cambiarlas al hacer docker run)
ENV NODE_ENV=production \
    PORT=3000

# Exponer el puerto en el que escucha Express / Vite preview
EXPOSE 3000

# Comando de arranque
# Si en producción quieres correr el server TypeScript ya compilado,
# cambia a "node dist/server.js" (o la ruta que uses).
CMD ["npm", "run", "dev"]
