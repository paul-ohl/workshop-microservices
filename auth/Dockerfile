FROM node:22.11.0-slim

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./ .

# Install additional tools: OpenSSL, PostgreSQL client, etc.
RUN apt-get update && apt-get install -y \
    bash \
    locales \
    openssl \
    libssl-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

RUN npx prisma generate \
    && npm run build

# Add and set up the entrypoint script
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000-3100

CMD [ "/app/entrypoint.sh" ]
