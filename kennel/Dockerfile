FROM node:alpine

WORKDIR /kennel

COPY ./kennel/package*.json ./

RUN npm install

COPY ./kennel .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000-3100

CMD ["npm", "run", "dev"]
