const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

// Configuration de la base de données
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ecommerce',
  multipleStatements: true
};

// Créer la connexion
const connection = mysql.createConnection(dbConfig);

console.log('🚀 Configuration de la base de données e-commerce...');

// Fonction pour lire et exécuter un fichier SQL
const executeSQLFile = (filePath, description) => {
  return new Promise((resolve, reject) => {
    console.log(`📄 Exécution: ${description}`);
    
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`❌ Erreur lors de la lecture de ${filePath}:`, err);
        reject(err);
        return;
      }

      connection.query(data, (err, results) => {
        if (err) {
          console.error(`❌ Erreur lors de l'exécution de ${filePath}:`, err);
          reject(err);
          return;
        }

        console.log(`✅ ${description} exécuté avec succès`);
        resolve(results);
      });
    });
  });
};

// Fonction principale
const setupDatabase = async () => {
  try {
    // Connexion à la base de données
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('❌ Erreur de connexion à MySQL:', err);
          reject(err);
          return;
        }
        console.log('✅ Connexion à MySQL réussie!');
        resolve();
      });
    });

    // Exécution des migrations
    console.log('\n📋 Exécution des migrations...');
    
    await executeSQLFile(
      path.join(__dirname, '../migrations/001_create_categories_table.sql'),
      'Création de la table categories'
    );
    
    await executeSQLFile(
      path.join(__dirname, '../migrations/002_create_products_table.sql'),
      'Création de la table products'
    );
    
    await executeSQLFile(
      path.join(__dirname, '../migrations/003_create_orders_table.sql'),
      'Création de la table orders'
    );
    
    await executeSQLFile(
      path.join(__dirname, '../migrations/004_create_order_items_table.sql'),
      'Création de la table order_items'
    );

    // Exécution des seeders
    console.log('\n🌱 Exécution des seeders...');
    
    await executeSQLFile(
      path.join(__dirname, '../seeders/001_seed_categories.sql'),
      'Insertion des catégories de base'
    );
    
    await executeSQLFile(
      path.join(__dirname, '../seeders/002_seed_products.sql'),
      'Insertion des produits de base'
    );

    console.log('\n🎉 Configuration de la base de données terminée avec succès!');
    console.log('\n📊 Tables créées:');
    console.log('   - categories');
    console.log('   - products');
    console.log('   - orders');
    console.log('   - order_items');
    console.log('\n🌱 Données insérées:');
    console.log('   - 10 catégories');
    console.log('   - 25 produits');

  } catch (error) {
    console.error('❌ Erreur lors de la configuration:', error);
    process.exit(1);
  } finally {
    connection.end();
  }
};

// Exécution du script
setupDatabase(); 