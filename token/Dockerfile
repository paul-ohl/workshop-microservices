# Utilise une version alpine de Node pour réduire la taille de l'image
FROM node:alpine

# Crée le répertoire de travail dans le conteneur
WORKDIR /app/token

# Copie uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json .


# Installe les dépendances
RUN npm install

# Copie tous les fichiers du projet dans le conteneur
COPY . .


RUN npm run build

# Expose le port de l'application
EXPOSE 3005

# Démarre l'application
CMD ["node", "dist/main.js"]
