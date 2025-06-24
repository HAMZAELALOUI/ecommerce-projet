const db = require('../config/db');

class Product {
  // Récupérer tous les produits avec leurs catégories
  static getAll(callback) {
    db.query('SELECT * FROM products', callback);
  }

  // Récupérer un produit par ID
  static getById(id, callback) {
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
      callback(err, results[0]);
    });
  }

  // Récupérer les produits par catégorie
  static getByCategory(categoryId, callback) {
    db.query('SELECT * FROM products WHERE category = ?', [categoryId], callback);
  }

  // Récupérer les produits par slug de catégorie
  static getByCategorySlug(categorySlug, callback) {
    const query = `
      SELECT 
        p.id, 
        p.name, 
        p.description,
        p.price,
        p.sale_price,
        p.stock_quantity,
        p.sku,
        p.category_id,
        p.image_url,
        p.is_active,
        p.is_featured,
        p.created_at,
        p.updated_at,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE c.slug = ? AND p.is_active = TRUE
      ORDER BY p.name
    `;
    db.query(query, [categorySlug], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  // Rechercher des produits par nom
  static search(searchTerm, callback) {
    const query = `
      SELECT 
        p.id, 
        p.name, 
        p.description,
        p.price,
        p.sale_price,
        p.stock_quantity,
        p.sku,
        p.category_id,
        p.image_url,
        p.is_active,
        p.is_featured,
        p.created_at,
        p.updated_at,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE (p.name LIKE ? OR p.description LIKE ?) AND p.is_active = TRUE
      ORDER BY p.name
    `;
    const searchPattern = `%${searchTerm}%`;
    db.query(query, [searchPattern, searchPattern], (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  // Récupérer les produits en vedette
  static getFeatured(callback) {
    const query = `
      SELECT 
        p.id, 
        p.name, 
        p.description,
        p.price,
        p.sale_price,
        p.stock_quantity,
        p.sku,
        p.category_id,
        p.image_url,
        p.is_active,
        p.is_featured,
        p.created_at,
        p.updated_at,
        c.name as category_name,
        c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_featured = TRUE AND p.is_active = TRUE
      ORDER BY p.created_at DESC
      LIMIT 10
    `;
    db.query(query, (err, results) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, results);
    });
  }

  // Créer un nouveau produit
  static create(product, callback) {
    db.query(
      'INSERT INTO products (name, category, price, image, description, unit) VALUES (?, ?, ?, ?, ?, ?)',
      [product.name, product.category, product.price, product.image, product.description, product.unit],
      callback
    );
  }

  // Mettre à jour un produit
  static update(id, product, callback) {
    db.query(
      'UPDATE products SET name = ?, category = ?, price = ?, image = ?, description = ?, unit = ? WHERE id = ?',
      [product.name, product.category, product.price, product.image, product.description, product.unit, id],
      callback
    );
  }

  // Supprimer un produit (soft delete)
  static delete(id, callback) {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
  }

  // Supprimer définitivement un produit
  static hardDelete(id, callback) {
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  }

  // Mettre à jour le stock
  static updateStock(id, quantity, callback) {
    const query = 'UPDATE products SET stock_quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    db.query(query, [quantity, id], (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  }

  static deleteByCategory(categoryId, callback) {
    db.query('DELETE FROM products WHERE category = ?', [categoryId], callback);
  }
}

module.exports = Product; 