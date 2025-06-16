# Étape 1 : Image de base
FROM node:bookworm

# Étape 2 : Définir le répertoire de travail
WORKDIR /app

# Étape 3 : Copier les fichiers package.json et lock (si existant)
COPY package*.json ./

# Étape 5 : Copier le reste du projet
COPY . .

# Étape 4 : Installer les dépendances
RUN npm install --force


# Étape 6 : Exposer le port utilisé par Vite
EXPOSE 3000

# Étape 7 : Lancer Vite en mode dev
CMD ["npm", "run", "dev"]