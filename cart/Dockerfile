FROM node:22.11.0-slim
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY . /app
WORKDIR /app

# Install binary dependencies: OpenSSL, PostgreSQL client, etc.
RUN apt-get update && apt-get install -y \
	bash \
	locales \
	openssl \
	libssl-dev \
	postgresql-client \
	&& rm -rf /var/lib/apt/lists/*

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile \
	&& npx prisma generate \
	&& pnpm run build

COPY ./entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

EXPOSE 3000-3100

CMD [ "sh", "-c", "/app/entrypoint.sh" ]
