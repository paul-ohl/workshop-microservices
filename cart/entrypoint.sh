#!/bin/sh

# Attendre que la base de données soit prête
until pg_isready -h "${PG_HOST}" -p 5432 -U "${PG_USER}"; do
    echo "En attente de la base de données..."
    sleep 2
done

npx prisma migrate deploy

node dist/main.js
