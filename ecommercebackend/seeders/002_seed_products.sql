-- Seeder: Insertion des produits de base
-- Date: 2024-01-01
-- Description: Données initiales pour les produits

INSERT INTO products (name, description, price, sale_price, stock_quantity, sku, category_id, image_url, is_active, is_featured) VALUES
-- Fruits
('Pommes Golden', 'Pommes Golden fraîches et juteuses', 2.50, NULL, 100, 'FRU-001', 1, '/images/pommes-golden.jpg', TRUE, TRUE),
('Bananes', 'Bananes mûres et sucrées', 1.80, 1.50, 150, 'FRU-002', 1, '/images/bananes.jpg', TRUE, FALSE),
('Oranges', 'Oranges fraîches et vitaminées', 3.20, NULL, 80, 'FRU-003', 1, '/images/oranges.jpg', TRUE, FALSE),
('Fraises', 'Fraises bio de saison', 4.50, 3.90, 60, 'FRU-004', 1, '/images/fraises.jpg', TRUE, TRUE),

-- Légumes
('Tomates', 'Tomates fraîches et charnues', 2.80, NULL, 120, 'LEG-001', 2, '/images/tomates.jpg', TRUE, TRUE),
('Carottes', 'Carottes bio et croquantes', 1.90, NULL, 200, 'LEG-002', 2, '/images/carottes.jpg', TRUE, FALSE),
('Salade verte', 'Salade verte fraîche', 1.50, NULL, 90, 'LEG-003', 2, '/images/salade.jpg', TRUE, FALSE),
('Oignons', 'Oignons jaunes', 1.20, NULL, 150, 'LEG-004', 2, '/images/oignons.jpg', TRUE, FALSE),

-- Viandes
('Poulet entier', 'Poulet fermier frais', 8.90, NULL, 30, 'VIE-001', 3, '/images/poulet.jpg', TRUE, TRUE),
('Bœuf haché', 'Bœuf haché 15% MG', 6.50, 5.90, 50, 'VIE-002', 3, '/images/boeuf-hache.jpg', TRUE, FALSE),
('Porc côtelette', 'Côtelettes de porc', 7.20, NULL, 25, 'VIE-003', 3, '/images/cotelettes.jpg', TRUE, FALSE),

-- Poissons
('Saumon frais', 'Saumon frais du jour', 12.90, NULL, 20, 'POI-001', 4, '/images/saumon.jpg', TRUE, TRUE),
('Cabillaud', 'Cabillaud frais', 9.50, 8.90, 35, 'POI-002', 4, '/images/cabillaud.jpg', TRUE, FALSE),
('Crevettes', 'Crevettes décortiquées', 15.90, NULL, 40, 'POI-003', 4, '/images/crevettes.jpg', TRUE, TRUE),

-- Produits laitiers
('Lait entier', 'Lait entier bio 1L', 1.20, NULL, 200, 'LAI-001', 5, '/images/lait.jpg', TRUE, FALSE),
('Fromage Comté', 'Comté affiné 24 mois', 4.50, NULL, 80, 'LAI-002', 5, '/images/comte.jpg', TRUE, TRUE),
('Yaourt nature', 'Yaourt nature bio', 0.80, NULL, 300, 'LAI-003', 5, '/images/yaourt.jpg', TRUE, FALSE),

-- Céréales
('Pain complet', 'Pain complet bio', 2.20, NULL, 100, 'CER-001', 6, '/images/pain-complet.jpg', TRUE, FALSE),
('Riz basmati', 'Riz basmati 1kg', 3.50, NULL, 150, 'CER-002', 6, '/images/riz.jpg', TRUE, FALSE),
('Pâtes spaghetti', 'Spaghetti de qualité', 1.80, NULL, 200, 'CER-003', 6, '/images/pates.jpg', TRUE, FALSE),

-- Boissons
('Jus d\'orange', 'Jus d\'orange frais 1L', 2.90, NULL, 120, 'BOI-001', 7, '/images/jus-orange.jpg', TRUE, FALSE),
('Eau minérale', 'Eau minérale naturelle', 0.60, NULL, 500, 'BOI-002', 7, '/images/eau.jpg', TRUE, FALSE),
('Vin rouge', 'Vin rouge AOC', 8.90, 7.90, 80, 'BOI-003', 7, '/images/vin-rouge.jpg', TRUE, TRUE),

-- Épices
('Poivre noir', 'Poivre noir moulu', 2.50, NULL, 100, 'EPI-001', 8, '/images/poivre.jpg', TRUE, FALSE),
('Sel de mer', 'Sel de mer fin', 1.80, NULL, 150, 'EPI-002', 8, '/images/sel.jpg', TRUE, FALSE),
('Curry', 'Curry en poudre', 3.20, NULL, 80, 'EPI-003', 8, '/images/curry.jpg', TRUE, FALSE)
ON DUPLICATE KEY UPDATE
  description = VALUES(description),
  price = VALUES(price),
  sale_price = VALUES(sale_price),
  stock_quantity = VALUES(stock_quantity),
  image_url = VALUES(image_url),
  is_active = VALUES(is_active),
  is_featured = VALUES(is_featured),
  updated_at = CURRENT_TIMESTAMP; 