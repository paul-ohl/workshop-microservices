#!/bin/sh

# Wait for PostgreSQL to be ready
sleep 10


# Run Prisma migrations
npx prisma migrate deploy

# Push the database schema
npx prisma db push

# Start the application
npm run dev
