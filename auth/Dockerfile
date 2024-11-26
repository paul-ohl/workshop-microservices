FROM node:22.11.0-slim AS base

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ .

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

# Add and set up the entrypoint script
COPY entrypoint.sh /vet/entrypoint.sh
RUN chmod +x /vet/entrypoint.sh

EXPOSE 3004

CMD [ "/vet/entrypoint.sh" ]
