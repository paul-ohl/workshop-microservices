# Utilise une image Node officielle
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers
COPY . .

# Compiler le projet NestJS
RUN npm run build

# Exposer le port 3000 (ou le port utilisé dans ton application NestJS)
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]
