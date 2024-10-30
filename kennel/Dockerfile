FROM node:alpine
 
WORKDIR /kennel
 
COPY ./kennel/package*.json ./
 
RUN npm install
 
COPY ./kennel .
 
RUN npm run build
 
EXPOSE 3000
 
CMD ["npm", "run", "dev"]