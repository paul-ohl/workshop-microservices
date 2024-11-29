FROM node:22.11.0-slim AS base

WORKDIR /vet-service

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

RUN npx prisma generate 
RUN npm run build

EXPOSE 3000-3100

# Add and set up the entrypoint script
COPY entrypoint.sh /vet-service/entrypoint.sh
RUN chmod +x /vet-service/entrypoint.sh

CMD ["/vet-service/entrypoint.sh"]