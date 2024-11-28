FROM node:22.11.0-slim AS base

WORKDIR /vet

COPY ./package*.json ./

RUN npm install

COPY ./ .

FROM base AS build

ARG DATABASE_URL
# ENV DATABASE_URL=$DATABASE_URL

ENV DATABASE_URL=postgres://admin:admin@postgres/microservices-db-vet?schema=public

RUN npx prisma generate

RUN npm run build

# Install additional tools: OpenSSL, PostgreSQL client, etc.
RUN apt-get update && apt-get install -y \
    bash \
    locales \
    openssl \
    libssl-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 3000 

# Add and set up the entrypoint script
COPY entrypoint.sh /vet/entrypoint.sh
RUN chmod +x /vet/entrypoint.sh

ENTRYPOINT ["/vet/entrypoint.sh"]
CMD ["npm", "run", "dev"]
