#!/bin/sh

sleep 5 # wait for database to start, this is a temporary solution

npx prisma migrate deploy

node dist/main.js
