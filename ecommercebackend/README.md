# 🛒 E-commerce Backend (Architecture MVC)

Backend Node.js avec Express et MySQL pour la gestion d'un site e-commerce. Architecture MVC avec migrations et seeders.

## 🚀 Quick Setup for Collaborators

**New to the project?** Check out the detailed setup guide: **[SETUP.md](./SETUP.md)**

### Quick Start (for experienced developers):
```bash
# Clone and install
git clone <your-repo-url>
cd ecommercebackend
npm install

# Start MySQL and create database
brew services start mysql  # macOS
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ecommerce;"

# Start the server
npm run dev
```

**For detailed setup instructions, troubleshooting, and platform-specific guides, see [SETUP.md](./SETUP.md)**

## 📁 Structure du projet

```
ecommerce-backend/
├── config/
│   └── db.js              # Configuration de la base MySQL
├── controllers/
│   ├── category.js        # Contrôleur des catégories
│   └── product.js         # Contrôleur des produits
├── models/
│   ├── Category.js        # Modèle pour les catégories
│   └── Product.js         # Modèle pour les produits
├── routes/
│   ├── category.js        # Routes pour les catégories
│   └── product.js         # Routes pour les produits
├── migrations/            # Scripts de migration
│   ├── 001_create_categories_table.sql
│   ├── 002_create_products_table.sql
│   ├── 003_create_orders_table.sql
│   └── 004_create_order_items_table.sql
├── seeders/               # Données initiales
│   ├── 001_seed_categories.sql
│   └── 002_seed_products.sql
├── scripts/
│   └── setup-database.js  # Script d'installation de la DB
├── app.js                 # Point d'entrée principal
└── package.json
```

## 🚀 Installation

### Prérequis

1. **Node.js** (version 14 ou supérieure)
2. **XAMPP** avec MySQL activé
3. **Base de données MySQL** nommée `ecommerce`

### Étapes d'installation

1. **Cloner ou télécharger le projet**
   ```bash
   cd ecommerce-backend
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer la base de données**
   - Démarrer XAMPP et activer MySQL
   - Créer une base de données nommée `ecommerce`
   - Exécuter les migrations et seeders :
   ```bash
   npm run setup-db
   ```

4. **Créer le fichier .env** (optionnel)
   ```env
   PORT=3000
   NODE_ENV=development
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=ecommerce
   ```

5. **Démarrer le serveur**
   ```bash
   npm start
   # ou pour le développement avec nodemon
   npm run dev
   ```

## 📊 Base de données

### Tables créées automatiquement

#### Table `categories`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `name` (VARCHAR(100), UNIQUE)
- `description` (TEXT)
- `slug` (VARCHAR(100), UNIQUE)
- `is_active` (BOOLEAN, DEFAULT TRUE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Table `products`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `name` (VARCHAR(200))
- `description` (TEXT)
- `price` (DECIMAL(10,2))
- `sale_price` (DECIMAL(10,2))
- `stock_quantity` (INT, DEFAULT 0)
- `sku` (VARCHAR(100), UNIQUE)
- `category_id` (INT, FOREIGN KEY)
- `image_url` (VARCHAR(500))
- `is_active` (BOOLEAN, DEFAULT TRUE)
- `is_featured` (BOOLEAN, DEFAULT FALSE)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Table `orders`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `order_number` (VARCHAR(50), UNIQUE)
- `customer_name` (VARCHAR(100))
- `customer_email` (VARCHAR(100))
- `customer_phone` (VARCHAR(20))
- `customer_address` (TEXT)
- `total_amount` (DECIMAL(10,2))
- `status` (ENUM)
- `payment_method` (VARCHAR(50))
- `payment_status` (ENUM)
- `notes` (TEXT)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

#### Table `order_items`
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `order_id` (INT, FOREIGN KEY)
- `product_id` (INT, FOREIGN KEY)
- `product_name` (VARCHAR(200))
- `product_price` (DECIMAL(10,2))
- `quantity` (INT)
- `subtotal` (DECIMAL(10,2))
- `created_at` (TIMESTAMP)

## 🔌 API Endpoints

### Catégories

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/categories` | Récupérer toutes les catégories |
| GET | `/api/categories/:id` | Récupérer une catégorie par ID |
| POST | `/api/categories` | Créer une nouvelle catégorie |
| PUT | `/api/categories/:id` | Mettre à jour une catégorie |
| DELETE | `/api/categories/:id` | Supprimer une catégorie |

### Produits

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/products` | Récupérer tous les produits |
| GET | `/api/products/:id` | Récupérer un produit par ID |
| GET | `/api/products/category/:categoryId` | Récupérer les produits par catégorie |
| GET | `/api/products/search/:term` | Rechercher des produits |
| GET | `/api/products/featured` | Récupérer les produits en vedette |
| POST | `/api/products` | Créer un nouveau produit |
| PUT | `/api/products/:id` | Mettre à jour un produit |
| DELETE | `/api/products/:id` | Supprimer un produit |

## 📝 Exemples d'utilisation

### Créer une catégorie
```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Fruits",
    "description": "Fruits frais et de saison",
    "slug": "fruits"
  }'
```

### Créer un produit
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pomme Golden",
    "description": "Pommes Golden fraîches et juteuses",
    "price": 2.50,
    "stock_quantity": 100,
    "sku": "FRU-001",
    "category_id": 1,
    "is_featured": true
  }'
```

### Récupérer tous les produits
```bash
curl http://localhost:3000/api/products
```

### Rechercher des produits
```bash
curl http://localhost:3000/api/products/search/pomme
```

### Récupérer les produits en vedette
```bash
curl http://localhost:3000/api/products/featured
```

## 🛠️ Scripts disponibles

- `npm start` : Démarre le serveur en mode production
- `npm run dev` : Démarre le serveur en mode développement avec nodemon
- `npm run setup-db` : Configure la base de données (migrations + seeders)
- `npm run migrate` : Exécute les migrations
- `npm run seed` : Exécute les seeders
- `npm test` : Lance les tests (à implémenter)

## 🔍 Test de l'API

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Informations du serveur
```bash
curl http://localhost:3000/
```

## 🚨 Gestion des erreurs

L'API retourne des réponses JSON standardisées :

### Succès
```json
{
  "success": true,
  "data": [...],
  "message": "Opération réussie"
}
```

### Erreur
```json
{
  "success": false,
  "message": "Message d'erreur",
  "error": "Détails de l'erreur (en développement)"
}
```

## 🔒 Sécurité

- Validation des données d'entrée
- Gestion des erreurs MySQL
- Protection contre les injections SQL (via mysql2)
- Configuration CORS pour les requêtes cross-origin
- Soft delete pour les catégories et produits

## 📈 Fonctionnalités avancées

- **Recherche de produits** : Recherche par nom et description
- **Filtrage par catégorie** : Récupération des produits par catégorie
- **Produits en vedette** : Système de produits mis en avant
- **Gestion du stock** : Suivi des quantités disponibles
- **Prix de vente** : Support des prix promotionnels
- **Slugs** : URLs SEO-friendly pour les catégories
- **Soft delete** : Suppression logique des données
- **Timestamps** : Suivi des dates de création et modification

## 🔄 Intégration avec le frontend

Ce backend est conçu pour s'intégrer facilement avec un frontend React, Vue.js ou Angular. Les réponses JSON sont standardisées et incluent les informations nécessaires pour l'affichage.

### Exemple d'intégration React
```javascript
// Récupération des produits
const fetchProducts = async () => {
  const response = await fetch('http://localhost:3000/api/products');
  const data = await response.json();
  if (data.success) {
    setProducts(data.data);
  }
};

// Récupération des produits en vedette
const fetchFeaturedProducts = async () => {
  const response = await fetch('http://localhost:3000/api/products/featured');
  const data = await response.json();
  if (data.success) {
    setFeaturedProducts(data.data);
  }
};
```

## 🗄️ Gestion de la base de données

### Migrations
Les migrations sont stockées dans le dossier `migrations/` et créent la structure de la base de données :
- `001_create_categories_table.sql`
- `002_create_products_table.sql`
- `003_create_orders_table.sql`
- `004_create_order_items_table.sql`

### Seeders
Les seeders sont stockés dans le dossier `seeders/` et insèrent les données initiales :
- `001_seed_categories.sql` : 10 catégories de base
- `002_seed_products.sql` : 25 produits de base

### Script d'installation
Le script `scripts/setup-database.js` automatise l'installation :
```bash
npm run setup-db
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commiter vos changements
4. Pousser vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence ISC.

## 🆘 Support

Pour toute question ou problème :
1. Vérifiez que XAMPP est démarré et MySQL actif
2. Vérifiez que la base de données `ecommerce` existe
3. Exécutez `npm run setup-db` pour configurer la base
4. Consultez les logs du serveur pour les erreurs
5. Testez l'endpoint `/api/health` pour vérifier la connectivité

---

**Développé avec ❤️ pour l'e-commerce - Architecture MVC** # ecommercebackend
