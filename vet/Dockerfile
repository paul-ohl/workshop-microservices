FROM node:alpine

WORKDIR /vet

COPY ./vet/package.json ./

RUN npm install

EXPOSE 4000
 
COPY ./vet .

RUN npm run build

CMD ["npm", "run", "dev"]
