# 🛒 FreshMarket - Site eCommerce avec Commande WhatsApp

Un site web eCommerce moderne et responsive pour la vente de produits alimentaires frais avec système de commande via WhatsApp.

## 🌟 Aperçu

FreshMarket est une solution eCommerce complète développée avec React et Tailwind CSS, spécialement conçue pour les vendeurs de produits alimentaires qui souhaitent offrir une expérience d'achat moderne tout en conservant la simplicité de WhatsApp pour les commandes.

**🔗 Site en ligne :** https://rcmcllnr.manus.space

## ✨ Fonctionnalités

### 🛍️ Catalogue Produits
- **3 catégories** : Fruits frais, Légumes, Desserts marocains
- **Filtrage dynamique** par catégorie
- **12 produits** avec images, descriptions et prix
- **Interface responsive** optimisée mobile et desktop

### 🛒 Système de Panier
- **Ajout/suppression** de produits en temps réel
- **Gestion des quantités** avec contrôles intuitifs
- **Calcul automatique** du total
- **Panier latéral** avec animations fluides

### 📱 Commande WhatsApp
- **Formulaire de commande** complet
- **Génération automatique** du message WhatsApp
- **Informations client** : nom, téléphone, adresse, notes
- **Résumé de commande** détaillé

### 🤖 Chatbot Assistant IA
- **IA Gemini 2.0 Flash** pour des réponses intelligentes
- **Filtrage automatique** des questions hors sujet
- **Mémorisation** de l'historique de conversation
- **Réponses contextuelles** et personnalisées
- **Questions fréquentes** avec réponses rapides
- **Support client** intégré et intelligent

### 🎨 Design & Animations
- **Design moderne** inspiré de Mama Saida
- **Animations Framer Motion** pour les interactions
- **Transitions fluides** entre les états
- **Palette de couleurs** verte et orange

## 🚀 Démarrage Rapide

### Prérequis
- Node.js 20+
- npm ou pnpm
- Clé API Gemini (optionnel pour le chatbot IA)

### Installation
```bash
# Cloner le projet
git clone [url-du-repo]
cd food-ecommerce

# Installer les dépendances
npm install

# Configurer l'API Gemini (optionnel)
# Créez un fichier .env et ajoutez votre clé API
echo "VITE_GEMINI_API_KEY=votre-clé-api-ici" > .env

# Démarrer le serveur de développement
npm run dev
```

### Build de Production
```bash
npm run build
```

## 🛠️ Technologies

- **React 18** - Framework JavaScript
- **Tailwind CSS** - Framework CSS utilitaire
- **Framer Motion** - Animations et transitions
- **Lucide React** - Icônes modernes
- **shadcn/ui** - Composants UI
- **Google Gemini 2.0 Flash** - IA pour le chatbot
- **Vite** - Bundler et serveur de développement

## 📁 Structure du Projet

```
food-ecommerce/
├── src/
│   ├── assets/                 # Images et ressources
│   │   ├── fruits.jpg
│   │   ├── vegetables.jpg
│   │   └── desserts.jpg
│   ├── components/             # Composants React
│   │   ├── ui/                # Composants UI (shadcn/ui)
│   │   ├── ChatBot.jsx        # Composant chatbot IA
│   │   └── WhatsAppOrderForm.jsx # Formulaire commande
│   ├── services/              # Services
│   │   └── gminiservice.js    # Service API Gemini
│   ├── App.jsx                # Composant principal
│   ├── App.css                # Styles globaux
│   └── main.jsx               # Point d'entrée
├── public/                    # Fichiers statiques
├── dist/                      # Build de production
├── GUIDE_UTILISATION.md       # Guide détaillé
├── GEMINI_SETUP.md           # Configuration IA
└── README.md                  # Ce fichier
```

## ⚙️ Personnalisation

### Modifier les Produits
Éditez le tableau `products` dans `src/App.jsx` :

```javascript
const products = [
  {
    id: 1,
    name: 'Nom du Produit',
    category: 'fruits', // 'fruits', 'vegetables', 'desserts'
    price: 25,
    image: fruitsImg,
    description: 'Description du produit',
    unit: 'kg'
  }
  // ...
]
```

### Configurer WhatsApp
Modifiez le numéro de téléphone dans `src/components/WhatsAppOrderForm.jsx` :

```javascript
const phoneNumber = "212600000000" // Votre numéro au format international
```

### Configurer l'IA Chatbot
1. Obtenez une clé API sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Créez un fichier `.env` avec votre clé :
```env
VITE_GEMINI_API_KEY=votre-clé-api-gemini
```
3. Personnalisez le prompt système dans `src/services/gminiservice.js`

### Personnaliser les Couleurs
Modifiez les variables CSS dans `src/App.css` pour adapter la palette de couleurs.

## 📱 Utilisation

1. **Navigation** : Utilisez les boutons de catégories pour filtrer les produits
2. **Ajout au panier** : Cliquez sur "Ajouter au Panier" pour sélectionner des articles
3. **Gestion du panier** : Modifiez les quantités et supprimez des articles
4. **Commande** : Remplissez le formulaire et envoyez via WhatsApp
5. **Assistance IA** : Utilisez le chatbot intelligent pour obtenir de l'aide

## 🎯 Cas d'Usage

Ce site est parfait pour :
- **Vendeurs de fruits et légumes** locaux
- **Pâtisseries traditionnelles** marocaines
- **Commerces alimentaires** de proximité
- **Livraison à domicile** de produits frais

## 📞 Support

Pour toute question ou personnalisation :
- Consultez le `GUIDE_UTILISATION.md` pour des instructions détaillées
- Consultez le `GEMINI_SETUP.md` pour la configuration de l'IA

## 📄 Licence

Ce projet est développé pour un usage commercial. Tous droits réservés.

---

**Développé avec ❤️ pour les commerçants locaux**

# ecommerce
