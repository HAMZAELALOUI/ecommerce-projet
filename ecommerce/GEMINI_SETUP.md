# Configuration de l'API Gemini pour le ChatBot FreshMarket

## 🚀 Installation et Configuration

### 1. Obtenir une clé API Gemini

1. Allez sur [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Connectez-vous avec votre compte Google
3. Cliquez sur "Create API Key"
4. Copiez votre clé API

### 2. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_GEMINI_API_KEY=votre-clé-api-gemini-ici
```

### 3. Installation des dépendances

```bash
npm install
```

### 4. Démarrage du projet

```bash
npm run dev
```

## 🔧 Fonctionnalités du ChatBot

### Réponses Intelligentes
- Utilise Gemini 2.0 Flash pour des réponses contextuelles
- Mémorise l'historique de conversation
- Réponses personnalisées selon le contexte

### Filtrage des Questions
- Ne répond qu'aux questions liées à FreshMarket
- Ignore automatiquement les questions hors sujet
- Redirige vers les informations pertinentes

### Questions Fréquentes
- Réponses rapides pour les questions courantes
- Interface intuitive avec boutons de réponses rapides
- Informations sur commandes, livraison, paiement, etc.

## 📋 Questions Supportées

### ✅ Questions Acceptées
- Produits FreshMarket (fruits, légumes, desserts)
- Commandes et processus d'achat
- Livraison et frais de livraison
- Modes de paiement
- Horaires d'ouverture
- Informations de contact
- Qualité des produits
- Prix et promotions

### ❌ Questions Ignorées
- Questions hors sujet (politique, sports, etc.)
- Questions techniques non liées au commerce
- Questions personnelles ou privées
- Questions non liées à FreshMarket

## 🛠️ Personnalisation

### Modifier les Réponses Rapides
Éditez le tableau `quickReplies` dans `src/components/ChatBot.jsx`

### Modifier le Prompt Système
Éditez la constante `SYSTEM_PROMPT` dans `src/services/gminiservice.js`

### Ajouter de Nouvelles Fonctionnalités
Le service est modulaire et facilement extensible

## 🔒 Sécurité

- Clé API stockée dans les variables d'environnement
- Validation des questions avant envoi à l'API
- Réponses de fallback en cas d'erreur
- Paramètres de sécurité configurés

## 📞 Support

En cas de problème :
1. Vérifiez que votre clé API est correcte
2. Assurez-vous que le fichier `.env` est bien créé
3. Vérifiez la console pour les erreurs
4. Contactez le support technique 