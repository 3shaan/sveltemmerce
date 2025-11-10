FROM node:22-alpine

WORKDIR /usr/src/app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@10.11.0 --activate

# Copy service package.json
COPY package.json ./

# Install only server dependencies (including dev for build)
RUN pnpm install

# Copy service source code
COPY . .

# Build the server
RUN pnpm build

# Clean dev dependencies for production
RUN pnpm prune --prod

EXPOSE 3000

# Run the server
CMD ["node", "dist/index.js"]
