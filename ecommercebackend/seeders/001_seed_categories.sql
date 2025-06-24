-- Seeder: Insertion des catégories de base
-- Date: 2024-01-01
-- Description: Données initiales pour les catégories

INSERT INTO categories (name, description, slug, is_active) VALUES
('Fruits', 'Fruits frais et de saison', 'fruits', TRUE),
('Légumes', 'Légumes frais et bio', 'legumes', TRUE),
('Viandes', 'Viandes fraîches et de qualité', 'viandes', TRUE),
('Poissons', 'Poissons et fruits de mer', 'poissons', TRUE),
('Produits laitiers', 'Lait, fromages et yaourts', 'produits-laitiers', TRUE),
('Céréales', 'Pains, riz et céréales', 'cereales', TRUE),
('Boissons', 'Jus, eaux et boissons', 'boissons', TRUE),
('Épices', 'Épices et condiments', 'epices', TRUE),
('Produits surgelés', 'Produits congelés', 'produits-surgeles', TRUE),
('Produits bio', 'Produits biologiques', 'produits-bio', TRUE)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  slug = VALUES(slug),
  is_active = VALUES(is_active),
  updated_at = CURRENT_TIMESTAMP; 