# Utilise l'image Node
FROM node:16

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de configuration et installe les dépendances
COPY package*.json ./
RUN npm install

# Copie le reste du code de l'API Gateway
COPY . .

# Compile le projet NestJS en mode production
RUN npm run build

# Expose le port de l'API Gateway
EXPOSE 3000

# Commande pour démarrer l'application en mode production
CMD ["npm", "run", "start:prod"]
