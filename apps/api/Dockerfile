FROM node:22-alpine

WORKDIR /usr/src/app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy root packages
COPY pnpm-lock.yaml ./
COPY package.json ./
COPY pnpm-workspace.yaml ./

#copy the api package.json
COPY apps/api/package.json ./apps/api/package.json

# Install only server dependencies (including dev for build)
RUN pnpm install

# Copy service source code
COPY . .

# Build the server
RUN pnpm build --filter=api

# Clean dev dependencies for production
# RUN pnpm prune --prod

EXPOSE 3000

# Run the server
# CMD ["node", "dist/index.js"]
# RUN pnpm db:migrate

# CMD ["node", "dist/index.js"]
CMD ["sh", "-c", "pnpm db:migrate && node apps/api/dist/index.js"]
