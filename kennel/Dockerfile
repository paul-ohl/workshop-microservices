FROM node:22.11.0-slim

WORKDIR /kennel

COPY ./kennel/package*.json ./

RUN npm install

COPY ./kennel .

RUN npx prisma generate \
	&& npm run build

EXPOSE 3000-3100

CMD ["npm", "run", "start:prod"]
