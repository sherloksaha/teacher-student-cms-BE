FROM node:22-bookworm-slim AS base
WORKDIR /app

# Install dependencies in a cached layer. package-lock.json keeps installs reproducible.
FROM base AS build-deps
COPY package.json package-lock.json ./
RUN npm ci

# Compile the NestJS application.
FROM build-deps AS build
COPY . .
RUN npm run build

# Keep only runtime dependencies in the final image.
FROM base AS production-deps
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM base AS runtime
ENV NODE_ENV=production \
    PORT=9000

WORKDIR /app
COPY --from=production-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist
COPY --chown=node:node package.json ./package.json

USER node
EXPOSE 9000
CMD ["node", "dist/main.js"]
