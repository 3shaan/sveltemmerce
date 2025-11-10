# ---------
#  build stage
# ------
FROM node:22-alpine AS build
WORKDIR /usr/src/app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build --filter=api

# ---------
#  production stage
# ------
FROM node:22-alpine AS production
WORKDIR /usr/src/app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/pnpm-workspace.yaml ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

COPY --from=builder /usr/src/app/apps/api/dist ./apps/api/dist
EXPOSE 3000
CMD ["pnpm", "start", "--filter=api"]


# ---------
#  development stage
# ------
FROM node:22-alpine AS development
WORKDIR /usr/src/app
RUN corepack enable && corepack prepare pnpm@10.20.0 --activate
COPY pnpm-lock.yaml package.json pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/package.json
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev", "--filter=api"]
