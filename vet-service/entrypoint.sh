#!/bin/bash

# Attendre que la base de données soit prête
until pg_isready -h "${PG_HOST}" -p 5432 -U "${PG_USER}"; do
    echo "En attente de la base de données..."
    sleep 2
done

# Exécute les migrations Prisma
npx prisma migrate dev

npx prisma db push

# Lance l'application
exec "$@"
