# Build stage
FROM node:23-alpine AS builder

# Enable corepack for pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Accept build arguments
ARG VITE_APP_AUTH_BASEURL
ENV VITE_APP_AUTH_BASEURL=$VITE_APP_AUTH_BASEURL

# Copy package files first for layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# Production stage
FROM nginx:alpine AS runner

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# Copy build output from builder
COPY --from=builder /app/dist .

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
