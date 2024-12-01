FROM node:22.11.0-slim

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000-3100

CMD ["node", "dist/main.js"]
