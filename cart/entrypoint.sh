#!/bin/sh

# Attendre que la base de données soit prête
until pg_isready -h "${PG_HOST}" -p 5432 -U "${PG_USER}"; do
    echo "En attente de la base de données..."
    sleep 2
done

# Create the database if it doesn't already exist
echo "Checking if database <${PG_NAME}> exists..."
DB_EXISTS=$(PGPASSWORD="${PG_PASSWORD}" psql -h "${PG_HOST}" -U "${PG_USER}" -tAc "SELECT 1 FROM pg_database WHERE datname='${PG_NAME}'")

if [ "$DB_EXISTS" != "1" ]; then
    echo "Database ${PG_NAME} does not exist. Creating..."
    PGPASSWORD="${PG_PASSWORD}" psql -h "${PG_HOST}" -U "${PG_USER}" -c "CREATE PG_NAME};"
else
    echo "Database ${PG_NAME} already exists."
fi

export DATABASE_URL=postgres://${PG_USER}:${PG_PASSWORD}@${PG_HOST}/${PG_NAME}?schema=public

npx prisma migrate deploy

node dist/main.js
