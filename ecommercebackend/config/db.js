const mysql = require('mysql2');
require('dotenv').config();

// Configuration de la connexion à la base de données MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce'
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err);
    return;
  }
  console.log('✅ Connexion à MySQL réussie!');
});

// Création des tables si elles n'existent pas
const createTables = () => {
  // Table des catégories
  const createCategoriesTable = `
    CREATE TABLE IF NOT EXISTS categories (
      id VARCHAR(50) PRIMARY KEY,
      name VARCHAR(100) NOT NULL
    )
  `;

  // Table des produits
  const createProductsTable = `
    CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      category VARCHAR(50),
      price DECIMAL(10,2) NOT NULL,
      image VARCHAR(255),
      description TEXT,
      unit VARCHAR(20),
      FOREIGN KEY (category) REFERENCES categories(id)
    )
  `;

  db.query(createCategoriesTable, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table categories:', err);
    } else {
      console.log('✅ Table categories créée ou déjà existante');
    }
  });

  db.query(createProductsTable, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table products:', err);
    } else {
      console.log('✅ Table products créée ou déjà existante');
    }
  });
};

// Exécuter la création des tables au démarrage
createTables();

module.exports = db; 