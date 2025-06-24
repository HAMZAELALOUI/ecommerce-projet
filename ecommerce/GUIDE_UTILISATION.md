# Guide d'Utilisation - Site eCommerce FreshMarket

## 🌟 Présentation du Projet

FreshMarket est un site web eCommerce moderne développé avec React et Tailwind CSS, spécialement conçu pour la vente de produits alimentaires frais avec commande via WhatsApp. Le site est inspiré du design de Mama Saida et offre une expérience utilisateur intuitive et responsive.

## 🚀 URL du Site Déployé

**Site en ligne :** https://rcmcllnr.manus.space

## ✨ Fonctionnalités Principales

### 1. **Catalogue de Produits**
- **3 Catégories principales :**
  - 🍎 Fruits Frais (pommes, bananes, oranges, fraises)
  - 🥕 Légumes (tomates, carottes, courgettes, poivrons)
  - 🧁 Desserts Marocains (chebakia, makroudh, cornes de gazelle, baklawa)
- **Filtrage par catégorie** avec navigation intuitive
- **Cartes produits** avec images, descriptions et prix

### 2. **Système de Panier**
- **Ajout/suppression** de produits
- **Modification des quantités** avec boutons + et -
- **Calcul automatique** du total
- **Panier latéral** avec animation fluide

### 3. **Commande via WhatsApp**
- **Formulaire de commande** avec informations client
- **Génération automatique** du message WhatsApp
- **Envoi direct** vers le numéro du vendeur
- **Résumé de commande** intégré

### 4. **Chatbot Assistant**
- **Questions fréquentes** prédéfinies
- **Réponses automatiques** sur les commandes, livraisons, paiements
- **Interface conversationnelle** moderne
- **Support client** intégré

### 5. **Design et Animations**
- **Design responsive** optimisé mobile et desktop
- **Animations Framer Motion** pour les interactions
- **Transitions fluides** entre les pages
- **Interface moderne** avec Tailwind CSS

## 🛠️ Personnalisation du Site

### Modifier les Produits

Pour ajouter ou modifier des produits, éditez le fichier `src/App.jsx` :

```javascript
const products = [
  {
    id: 1,
    name: 'Nom du Produit',
    category: 'fruits', // 'fruits', 'vegetables', 'desserts'
    price: 25, // Prix en MAD
    image: fruitsImg, // Image du produit
    description: 'Description du produit',
    unit: 'kg' // Unité de mesure
  }
  // Ajouter d'autres produits...
]
```

### Modifier les Informations de Contact

Dans `src/App.jsx`, modifiez :

```javascript
// Numéro WhatsApp (format international)
const phoneNumber = "212600000000" // Remplacer par votre numéro

// Dans le footer
<span>+212 6 00 00 00 00</span> // Votre numéro d'affichage
<span>Casablanca, Maroc</span> // Votre adresse
```

### Personnaliser les Couleurs

Dans `src/App.css`, modifiez les variables CSS :

```css
:root {
  --primary: oklch(0.205 0 0); /* Couleur principale */
  --secondary: oklch(0.97 0 0); /* Couleur secondaire */
  /* Autres couleurs... */
}
```

### Ajouter des Images

1. Placez vos images dans `src/assets/`
2. Importez-les dans `src/App.jsx` :
```javascript
import nouvelleImage from './assets/nouvelle-image.jpg'
```

### Modifier le Chatbot

Dans `src/components/ChatBot.jsx`, personnalisez les réponses :

```javascript
const quickReplies = [
  {
    id: 1,
    text: 'Votre question',
    response: 'Votre réponse personnalisée'
  }
  // Ajouter d'autres questions...
]
```

## 📱 Utilisation pour les Clients

### 1. **Navigation**
- Utilisez les boutons de catégories pour filtrer les produits
- Cliquez sur "Ajouter au Panier" pour sélectionner des articles

### 2. **Gestion du Panier**
- Cliquez sur l'icône panier (avec le nombre d'articles)
- Modifiez les quantités avec les boutons + et -
- Supprimez des articles avec le bouton X

### 3. **Passer Commande**
- Cliquez sur "Commander via WhatsApp" dans le panier
- Remplissez le formulaire avec vos informations
- Cliquez sur "Envoyer la Commande via WhatsApp"
- Votre application WhatsApp s'ouvrira avec le message pré-rempli

### 4. **Assistance**
- Cliquez sur le bouton chatbot (icône message en bas à gauche)
- Sélectionnez une question fréquente ou tapez votre message

## 🔧 Développement Local

### Prérequis
- Node.js 20+
- npm ou pnpm

### Installation
```bash
cd food-ecommerce
npm install
npm run dev
```

### Build de Production
```bash
npm run build
```

## 📊 Structure du Projet

```
food-ecommerce/
├── src/
│   ├── assets/          # Images et ressources
│   ├── components/      # Composants React
│   │   ├── ui/         # Composants UI (shadcn/ui)
│   │   ├── ChatBot.jsx # Composant chatbot
│   │   └── WhatsAppOrderForm.jsx # Formulaire commande
│   ├── App.jsx         # Composant principal
│   ├── App.css         # Styles globaux
│   └── main.jsx        # Point d'entrée
├── public/             # Fichiers statiques
└── dist/              # Build de production
```

## 🎨 Technologies Utilisées

- **React 18** - Framework JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations et transitions
- **Lucide React** - Icônes modernes
- **shadcn/ui** - Composants UI
- **Vite** - Bundler et serveur de développement

## 📞 Support

Pour toute question ou personnalisation avancée, le code source est entièrement commenté et modulaire pour faciliter les modifications.

## 🚀 Déploiement

Le site est actuellement déployé sur : **https://rcmcllnr.manus.space**

Pour redéployer après modifications :
1. Effectuez vos changements
2. Testez localement avec `npm run dev`
3. Construisez avec `npm run build`
4. Déployez le dossier `dist/`

