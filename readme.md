# Lien pour télecharger l'API :

### [https://github.com/KraKss/projet_web](https://github.com/KraKss/projet_web)

# Pour la DB : 

### Le fichier sql se trouve a la racine du projet -> dumpmobile.sql

# Commande d'installation :

1. **Ouvrir un terminal et exécuter la commande suivante** :  
   `docker run --name postgres_projet_web -e POSTGRES_PASSWORD=password -e POSTGRES_USER=john -e POSTGRES_DB=projet_web -p 5432:5432 --rm -d postgres`
   
   ##### Il faut ensuite créer un .env a la racine du dossier back (pas du projet web car il y a le dossier front)
   Et y copier les valeurs suivantes : 
   > PORT=3001

   > DB_USER=john

   > DB_HOST=localhost

   > DB_NAME=projet_web

   > DB_PASSWORD=password

   > DB_PORT=5432

   > JWT_SECRET=cecinestpasunsecret

   > PEPPER=cecinestpasunpepper
   
   > DATABASE_URL="postgresql://john:password@localhost:5432/projet_web?schema=public"
2. **Ouvrir un terminal** :
    - Naviguer dans le dossier `back` : `cd back`
    - Installer les dépendances : `npm i`
    - Remplacer le fichier /back/script/SQL/initAndInsertDB.sql par le fichier dumpmobile.sql
    - Ouvrir le fichier /back/script/JS/initAndInsertDB.js et remplacer le nom du script SQL ligne 5 par ./scripts/SQL/dumpmobile.sql
    - Initialiser et insérer les données dans la base de données : `npm run initAndInsertDB`
    - Lancer le serveur de développement : `npm run dev`

# Connexion à l'API depuis EXPO

#### Etant donné que l'API est hosted en localhost, expo a besoin de l'adresse machine  

> Ouvrez un terminal et tapez ipconfig pour récuperer votre IPV4

#### Avec votre IPV4, dans le .env, changez les routes API 
> EXPO_PUBLIC_BASE_API_ROUTE=http://192.168.1.7:3001/api/v1

et 

> EXPO_PUBLIC_BASE_IMAGE_ROUTE=http://192.168.1.7:3001

par http://votre-ipv4:3001

(oui c'est pas bien de mettre le .env sur github mais par simplicité pour vous nous l'avons mis la (ce qu'on aurait du faire pour l'api aussi d'ailleurs))

# Installation mobile

### Naviguez ensuite dans le dossier du projet PrintIt et installez les dépendances avec la commande :
> npm i

### Vous pouvez maintenant lancer l'application et créer un compte avec la commande :
> npx expo start

ou alors vous connectez avec 
mail: alexprint@gmail.com
password: password