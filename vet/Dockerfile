FROM node:alpine

WORKDIR /vet

COPY ./vet/package*.json ./

RUN npm install

COPY ./vet .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "dev"]
