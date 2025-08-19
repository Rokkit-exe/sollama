# --- Stage 1: Dev Environment ---
FROM oven/bun:1 AS dev
WORKDIR /app

# Install dependencies
COPY package.json bun.lockb* ./
RUN bun install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Run Vite dev server
CMD ["bun", "run", "dev", "--host", "0.0.0.0"]

# --- Stage 2: Build ---
FROM oven/bun:1 AS build
WORKDIR /app
COPY package.json bun.lockb* ./
RUN bun install
COPY . .
RUN bun run build

# --- Stage 3: Production ---
FROM nginx:alpine AS prod
# Copy built files to Nginx HTML directory
COPY --from=build /app/dist /usr/share/nginx/html
# Expose Nginx default port
EXPOSE 80

