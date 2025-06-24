const db = require('../config/db');

class Category {
  // Récupérer toutes les catégories
  static getAll(callback) {
    db.query('SELECT * FROM categories', callback);
  }

  // Récupérer une catégorie par ID
  static getById(id, callback) {
    db.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
      callback(err, results[0]);
    });
  }

  // Récupérer une catégorie par slug
  static getBySlug(slug, callback) {
    const query = 'SELECT * FROM categories WHERE slug = ? AND is_active = TRUE';
    db.query(query, [slug], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results[0]);
    });
  }

  // Créer une nouvelle catégorie
  static create(category, callback) {
    db.query('INSERT INTO categories (id, name) VALUES (?, ?)', [category.id, category.name], callback);
  }

  // Mettre à jour une catégorie
  static update(id, category, callback) {
    db.query('UPDATE categories SET name = ? WHERE id = ?', [category.name, id], callback);
  }

  // Supprimer une catégorie (soft delete)
  static delete(id, callback) {
    db.query('DELETE FROM categories WHERE id = ?', [id], callback);
  }

  // Supprimer définitivement une catégorie
  static hardDelete(id, callback) {
    const query = 'DELETE FROM categories WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  }

  // Récupérer les catégories avec le nombre de produits
  static getAllWithProductCount(callback) {
    const query = `
      SELECT 
        c.*,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = TRUE
      WHERE c.is_active = TRUE
      GROUP BY c.id
      ORDER BY c.name
    `;
    db.query(query, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }
}

module.exports = Category; 