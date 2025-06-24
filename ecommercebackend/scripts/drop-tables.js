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

console.log('🗑️  Suppression des tables existantes...');

// Fonction pour exécuter une requête SQL
const executeQuery = (query, description) => {
  return new Promise((resolve, reject) => {
    console.log(`📄 ${description}`);
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error(`❌ Erreur: ${err.message}`);
        reject(err);
        return;
      }

      console.log(`✅ ${description} exécuté avec succès`);
      resolve(results);
    });
  });
};

// Fonction principale
const dropTables = async () => {
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

    // Désactiver les vérifications de clés étrangères
    await executeQuery('SET FOREIGN_KEY_CHECKS = 0', 'Désactivation des vérifications de clés étrangères');

    // Supprimer les tables dans l'ordre inverse des dépendances
    await executeQuery('DROP TABLE IF EXISTS order_items', 'Suppression de la table order_items');
    await executeQuery('DROP TABLE IF EXISTS orders', 'Suppression de la table orders');
    await executeQuery('DROP TABLE IF EXISTS products', 'Suppression de la table products');
    await executeQuery('DROP TABLE IF EXISTS categories', 'Suppression de la table categories');

    // Réactiver les vérifications de clés étrangères
    await executeQuery('SET FOREIGN_KEY_CHECKS = 1', 'Réactivation des vérifications de clés étrangères');

    console.log('\n🎉 Toutes les tables ont été supprimées avec succès!');
    console.log('\n📋 Tables supprimées:');
    console.log('   - order_items');
    console.log('   - orders');
    console.log('   - products');
    console.log('   - categories');

  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
    process.exit(1);
  } finally {
    connection.end();
  }
};

// Exécution du script
dropTables(); 