import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ShoppingCart, Plus, Minus, X, MessageCircle, Phone, MapPin, Star, Bot } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppOrderForm from './components/WhatsAppOrderForm.jsx'
import ChatBot from './components/ChatBot.jsx'
import bananeImg from '@/assets/banane.jpeg'
import carotteImg from '@/assets/Carrote.jpeg'
import cornesDeGazelleImg from '@/assets/Cornes de Gazelle.jpeg'
import courgettesImg from '@/assets/Courgettes.jpeg'
import dessertsImg from '@/assets/desserts.jpg'
import foodImg from '@/assets/food.jpg'
import fraiseImg from '@/assets/fraise.jpeg'
import fruitsImg from '@/assets/fruits.jpg'
import logoImg from '@/assets/logo.jpeg'
import makroudhImg from '@/assets/Makroudh.jpeg'
import orangesImg from '@/assets/oranges.jpeg'
import poivronsImg from '@/assets/Poivrons.jpeg'
import pommerougeImg from '@/assets/pommerouge.jpeg'
import tomatesImg from '@/assets/tomates.jpg'
import vegetablesImg from '@/assets/vegetables.jpg'
import FloatingActions from './components/FloatingActions.jsx'
import heroBg from './assets/food.jpg'
import histoireImg from './assets/desserts.jpg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout.jsx'
import Dashboard from './pages/admin/Dashboard.jsx'
import ProductsAdmin from './pages/admin/ProductsAdmin.jsx'
import CategoriesAdmin from './pages/admin/CategoriesAdmin.jsx'
import { fetchProducts, fetchCategories } from './services/apiService.js'
import { toast } from 'sonner'

// Données des produits - SERONT REMPLACÉES PAR L'API
// const products = [ ... ];

// Données des catégories - SERONT REMPLACÉES PAR L'API
// const categories = [ ... ];

const packs = [
  {
    name: "Pack Essentiel",
    price: 129,
    fruits: [
      { label: "Citron", qty: "0.5 KG", emoji: "🍋" },
      { label: "Orange", qty: "1 KG", emoji: "🍊" },
      { label: "Banane", qty: "1 KG", emoji: "🍌" },
      { label: "Pomme", qty: "1 KG", emoji: "🍎" },
    ],
    legumes: [
      { label: "Pomme de terre", qty: "3 KG", emoji: "🥔" },
      { label: "Tomate", qty: "2 KG", emoji: "🍅" },
      { label: "Oignon", qty: "2 KG", emoji: "🧅" },
      { label: "Carotte", qty: "1.5 KG", emoji: "🥕" },
    ],
    highlight: "PLUS 17 KG DE FRUITS & LÉGUMES FRAIS"
  },
  {
    name: "Pack Famille",
    price: 179,
    fruits: [
      { label: "Citron", qty: "0.5 KG", emoji: "🍋" },
      { label: "Orange", qty: "1 KG", emoji: "🍊" },
      { label: "Banane", qty: "1 KG", emoji: "🍌" },
      { label: "Pomme", qty: "1 KG", emoji: "🍎" },
    ],
    legumes: [
      { label: "Pomme de terre", qty: "3 KG", emoji: "🥔" },
      { label: "Tomate", qty: "2 KG", emoji: "🍅" },
      { label: "Oignon", qty: "2 KG", emoji: "🧅" },
      { label: "Carotte", qty: "1 KG", emoji: "🥕" },
    ],
    highlight: "PLUS 19 KG DE FRUITS & LÉGUMES FRAIS"
  },
  {
    name: "Pack Prestige",
    price: 239,
    fruits: [
      { label: "Citron", qty: "0.5 KG", emoji: "🍋" },
      { label: "Orange", qty: "1 KG", emoji: "🍊" },
      { label: "Banane", qty: "1 KG", emoji: "🍌" },
      { label: "Pomme", qty: "1 KG", emoji: "🍎" },
      
    ],
    legumes: [
      { label: "Pomme de terre", qty: "3 KG", emoji: "🥔" },
      { label: "Tomate", qty: "2 KG", emoji: "🍅" },
      { label: "Oignon", qty: "2 KG", emoji: "🧅" },
      { label: "Carotte", qty: "1 KG", emoji: "🥕" },
      
    ],
    highlight: "PLUS 26 KG DE FRUITS & LÉGUMES FRAIS"
  },
  {
    name: "Pack Vitalité",
    price: 149,
    fruits: [
      { label: "Citron", qty: "1 KG", emoji: "🍋" },
      { label: "Orange", qty: "2 KG", emoji: "🍊" },
      { label: "Pomme", qty: "1 KG", emoji: "🍎" },
      { label: "Kiwi", qty: "1 KG", emoji: "🥝" },
    ],
    legumes: [
      { label: "Carotte", qty: "2 KG", emoji: "🥕" },
      { label: "Courgette", qty: "1 KG", emoji: "🥒" },
      { label: "Concombre", qty: "1 KG", emoji: "🥒" },
      { label: "Épinard", qty: "1 botte", emoji: "🥬" },
    ],
    highlight: "PACK BOOST VITAMINES & ANTIOXYDANTS"
  },
]

// Définir les variants d'animation pour le stagger
const packGridVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.13,
    },
  },
}
const packCardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 60, damping: 18 } },
}

const categoryIcons = {
  'Fruits': '🍎',
  'Légumes': '🥕',
  'Desserts Marocains': '🍰',
  'Poissons': '🐟',
  'Viandes': '🥩',
};

// Fonction utilitaire pour associer un nom de produit à une image locale
const getProductImage = (productName) => {
  const name = productName.toLowerCase();
  if (name.includes('banane')) return bananeImg;
  if (name.includes('carotte')) return carotteImg;
  if (name.includes('courgette')) return courgettesImg;
  if (name.includes('fraise')) return fraiseImg;
  if (name.includes('pomme')) return pommerougeImg;
  if (name.includes('orange')) return orangesImg;
  if (name.includes('poivron')) return poivronsImg;
  if (name.includes('tomate')) return tomatesImg;
  if (name.includes('makroudh')) return makroudhImg;
  if (name.includes('cornes')) return cornesDeGazelleImg;
  if (name.includes('dessert')) return dessertsImg;
  if (name.includes('légume') || name.includes('legume')) return vegetablesImg;
  if (name.includes('fruit')) return fruitsImg;
  return foodImg;
};

function PacksPage() {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={packGridVariants}
      transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
      className="container mx-auto px-4 py-16 min-h-[60vh]"
    >
      <motion.h2
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, type: 'spring', stiffness: 60 }}
        className="text-4xl md:text-5xl font-serif font-extrabold text-orange-600 mb-10 text-center tracking-tight drop-shadow-lg"
      >
        Nos Packs
      </motion.h2>
      <div className="grid md:grid-cols-2 gap-10">
        {packs.map((pack, idx) => (
          <motion.div
            key={pack.name}
            variants={packCardVariants}
            className="flex h-full"
          >
            <Card className="flex flex-col flex-1 min-h-[520px] h-full shadow-xl rounded-2xl overflow-hidden border bg-white/90">
              <CardHeader className="bg-yellow-400/80 text-center py-6">
                <CardTitle className="text-3xl md:text-4xl font-serif font-bold text-orange-700 tracking-wide drop-shadow-sm">
                  {pack.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-yellow-600 mb-2">Fruits</h3>
                    <ul className="space-y-2">
                      {pack.fruits.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-lg font-medium text-gray-800">
                          {item.image ? <img src={item.image} alt={item.label} className="w-6 h-6 rounded-full object-cover" /> : <span className="text-2xl">{item.emoji}</span>}
                          <span className="font-serif">{item.label} : <span className="font-bold font-sans text-black">{item.qty}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold text-yellow-600 mb-2">Légumes</h3>
                    <ul className="space-y-2">
                      {pack.legumes.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-lg font-medium text-gray-800">
                          {item.image ? <img src={item.image} alt={item.label} className="w-6 h-6 rounded-full object-cover" /> : <span className="text-2xl">{item.emoji}</span>}
                          <span className="font-serif">{item.label} : <span className="font-bold font-sans text-black">{item.qty}</span></span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 text-center">
                  <div className="bg-yellow-300 text-orange-800 font-bold text-lg rounded-lg py-3 px-6 inline-block shadow-md animate-pulse font-serif tracking-wide">
                    {pack.highlight}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

function ProductsPage() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 60 }}
      className="container mx-auto px-4 pb-16"
    >
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {products.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 bg-white/60 backdrop-blur-md">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={getProductImage(product.name)}
                      alt={product.name}
                      className="w-full h-48 object-cover transition-transform hover:scale-110"
                    />
                    <Badge className="absolute top-2 right-2 bg-green-600">
                      {product.price} MAD/{product.unit}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
                  <CardDescription className="text-sm text-gray-600">
                    {product.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button
                    onClick={() => addToCart(product)}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter au Panier
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  )
}

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const histoireRef = useRef(null)
  const [productTypeFilter, setProductTypeFilter] = useState('all'); // 'all', 'fruits', 'legumes'

  const API_BASE_URL = 'http://localhost:8000';

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsRes = await fetchProducts();
        const productsData = productsRes.data.data.map(p => ({
          ...p,
          image: `${API_BASE_URL}${p.image_url}`
        }));
        setProducts(productsData);

        const categoriesRes = await fetchCategories();
        const fetchedCategories = categoriesRes.data.data.map(cat => ({
          ...cat,
          icon: categoryIcons[cat.name] || '📦'
        }));
        
        const allCategory = { id: 'all', name: 'Tous les Produits', icon: '🛒' };
        setCategories([allCategory, ...fetchedCategories]);

      } catch (error) {
        console.error("Erreur lors du chargement des données depuis l'API:", error);
      }
    };

    loadData();
  }, []);

  // Fonction pour déterminer si un produit est un fruit ou un légume
  const isFruit = (name) => {
    const n = name.toLowerCase();
    return (
      n.includes('banane') || n.includes('fraise') || n.includes('pomme') || n.includes('orange') || n.includes('fruit')
    );
  };
  const isLegume = (name) => {
    const n = name.toLowerCase();
    return (
      n.includes('carotte') || n.includes('courgette') || n.includes('poivron') || n.includes('tomate') || n.includes('légume') || n.includes('legume')
    );
  };

  // Filtrage combiné
  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category_id !== selectedCategory) return false;
    if (productTypeFilter === 'fruits') return isFruit(product.name);
    if (productTypeFilter === 'legumes') return isLegume(product.name);
    return true;
  });

  // Ajouter au panier
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  // Retirer du panier
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Modifier la quantité
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // Calculer le total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Ouvrir le formulaire de commande WhatsApp
  const openOrderForm = () => {
    setIsOrderFormOpen(true)
    setIsCartOpen(false)
  }

  // Hauteur de la navbar (pour calcul dynamique)
  const NAVBAR_HEIGHT = 88 // px (ajuster si besoin)

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  
  // Scroll vers la section Notre Histoire
  const scrollToHistoire = (e) => {
    e.preventDefault()
    if (histoireRef.current) {
      histoireRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Ajouter un pack au panier
  const addPackToCart = (pack) => {
    const packCartItem = {
      id: `pack-${pack.name}`,
      name: pack.name,
      price: pack.price,
      unit: 'pack',
      quantity: 1,
      isPack: true,
      details: pack,
    };
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === packCartItem.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === packCartItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, packCartItem];
    });
    toast.success(`${pack.name} ajouté au panier !`);
  };

  return (
    <motion.div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-40">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logoImg} alt="FreshMarket Logo" className="h-12 w-12 rounded-full" />
            <span className="text-xl font-bold font-serif text-stone-800">FreshMarket</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({isActive}) => isActive ? "text-emerald-600 font-bold" : "text-gray-600 hover:text-emerald-600 transition-colors"}>Accueil</NavLink>
            
            <a href="#histoire" onClick={scrollToHistoire} className="text-gray-600 hover:text-emerald-600 transition-colors">Notre Histoire</a>
            <NavLink to="/#products" className="text-gray-600 hover:text-emerald-600 transition-colors">Produits</NavLink>
            <NavLink to="/#packs" className="text-gray-600 hover:text-emerald-600 transition-colors">Nos Packs</NavLink>
            <NavLink to="/admin" className="text-gray-600 hover:text-emerald-600 transition-colors">Admin</NavLink>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              className="relative hover:bg-emerald-50 rounded-full"
            >
              <ShoppingCart className="w-6 h-6 text-stone-700" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 bg-stone-50">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-88px)] flex items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={heroBg}
              alt="Fresh Food Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10"></div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-10 text-center text-white px-4"
          >
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 drop-shadow-lg">
              FreshMarket
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              La fraîcheur de la nature, livrée à votre porte. Goûtez la différence.
            </p>
            <motion.a
              href="#products"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-full text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              Découvrir nos Produits
            </motion.a>
          </motion.div>
        </section>  {/* Histoire Section */}
        <section id="histoire" ref={histoireRef} className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: -30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <img
                  src={fruitsImg}
                  alt="Fruits et Légumes"
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl shadow-xl"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold font-serif text-stone-800 mb-6">Notre Histoire</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Depuis plus de 20 ans, FreshMarket s'engage à vous offrir les meilleurs produits frais et les desserts marocains les plus authentiques. Notre passion pour la qualité et le service client nous pousse à sélectionner avec soin chaque produit.
                </p>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Nous travaillons directement avec les producteurs locaux pour garantir la fraîcheur et la qualité de nos fruits et légumes. Nos desserts sont préparés selon les recettes traditionnelles marocaines, transmises de génération en génération.
                </p>
                <div className="flex items-center space-x-6 mt-8">
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-yellow-400 mr-2" />
                    <span className="font-semibold text-lg">4.9/5</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-lg">
                    <span>+1000 clients satisfaits</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

    

        {/* Products Section */}
        <section id="products" className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 60 }}
                className="text-4xl md:text-5xl font-serif font-extrabold text-orange-600 mb-10 text-center tracking-tight drop-shadow-lg"
              >
                Nos Trésors Naturels
              </motion.h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Chaque produit est une promesse de fraîcheur et de qualité, directement du producteur à votre table.
              </p>
            </motion.div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Button
                onClick={() => setProductTypeFilter('all')}
                variant={productTypeFilter === 'all' ? 'default' : 'outline'}
                className={productTypeFilter === 'all' ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-emerald-500'}
              >
                Tous les Produits
              </Button>
              <Button
                onClick={() => setProductTypeFilter('fruits')}
                variant={productTypeFilter === 'fruits' ? 'default' : 'outline'}
                className={productTypeFilter === 'fruits' ? 'bg-orange-500 text-white shadow-md' : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-orange-400'}
              >
                <span className="mr-2">🍎</span> Fruits
              </Button>
              <Button
                onClick={() => setProductTypeFilter('legumes')}
                variant={productTypeFilter === 'legumes' ? 'default' : 'outline'}
                className={productTypeFilter === 'legumes' ? 'bg-green-600 text-white shadow-md' : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100 hover:border-green-400'}
              >
                <span className="mr-2">🥕</span> Légumes
              </Button>
            </div>

            {/* Products Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts
                .map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 60 }}
                    whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(16, 185, 129, 0.12)' }}
                    className="h-full group overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80 bg-white/60 backdrop-blur-md"
                  >
                    <CardHeader className="p-0">
                      <motion.div
                        className="relative overflow-hidden rounded-t-lg"
                        whileHover={{ scale: 1.06 }}
                        transition={{ type: 'spring', stiffness: 80 }}
                      >
                        <motion.img
                          src={getProductImage(product.name)}
                          alt={product.name}
                          className="w-full h-48 object-cover transition-transform"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.7, delay: index * 0.08 }}
                          whileHover={{ scale: 1.12 }}
                        />
                        <Badge className="absolute top-2 right-2 bg-green-600">
                          {product.price} MAD/{product.unit}
                        </Badge>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="p-5">
                      <CardTitle className="text-lg font-serif mb-2 text-stone-800">{product.name}</CardTitle>
                      <CardDescription className="mb-4 text-sm">{product.description}</CardDescription>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-emerald-600">{product.price} MAD</span>
                        <Button
                          onClick={() => addToCart(product)}
                          size="sm"
                          className="bg-emerald-100 text-emerald-700 hover:bg-emerald-600 hover:text-white rounded-full transition-all"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Ajouter
                        </Button>
                      </div>
                    </CardContent>
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </section>

        {/* Packs Section */}
        <section id="packs" className="py-24 bg-stone-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold font-serif text-stone-800 mb-4">Nos Packs Composés</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Des combinaisons parfaites de fruits et légumes pour simplifier votre quotidien avec gourmandise.
              </p>
            </motion.div>

            <motion.div
              variants={packGridVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {packs.map((pack, index) => (
                <motion.div
                  key={pack.name}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.12, type: 'spring', stiffness: 60 }}
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(251, 191, 36, 0.13)' }}
                  className="relative"
                >
                  <Card className="h-full flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-200/80">
                    <CardHeader className="text-center pb-4 pt-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: index * 0.12 }}
                      >
                        <CardTitle className="text-2xl font-serif text-emerald-700">{pack.name}</CardTitle>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="space-y-4 flex-grow">
                      {/* Fruits */}
                      <div>
                        <h4 className="font-semibold text-stone-600 mb-3 flex items-center justify-center text-lg border-b pb-2">
                          <span className="mr-2">🍎</span> Fruits
                        </h4>
                        <div className="space-y-2 text-sm text-stone-700">
                          {pack.fruits.map((fruit, fruitIndex) => (
                            <div key={fruitIndex} className="flex justify-between items-center px-2">
                              <span className="flex items-center">
                                <span className="mr-2 text-xl">{fruit.emoji}</span>
                                {fruit.label}
                              </span>
                              <Badge variant="secondary" className="font-mono text-xs bg-stone-100 text-stone-800">
                                {fruit.qty}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Légumes */}
                      <div>
                        <h4 className="font-semibold text-stone-600 mb-3 flex items-center justify-center text-lg border-b pb-2">
                          <span className="mr-2">🥕</span> Légumes
                        </h4>
                        <div className="space-y-2 text-sm text-stone-700">
                          {pack.legumes.map((legume, legumeIndex) => (
                            <div key={legumeIndex} className="flex justify-between items-center px-2">
                              <span className="flex items-center">
                                <span className="mr-2 text-xl">{legume.emoji}</span>
                                {legume.label}
                              </span>
                              <Badge variant="secondary" className="font-mono text-xs bg-stone-100 text-stone-800">
                                {legume.qty}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Highlight */}
                      <div className="pt-4 mt-auto">
                        <p className="text-xs text-emerald-700 font-semibold text-center bg-emerald-50 py-2 rounded-lg">
                          {pack.highlight}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4">
                      <Button
                        className="w-full bg-green-600 hover:bg-green-700 rounded-full py-3 text-lg font-bold shadow-lg transition-all mt-4"
                        onClick={() => addPackToCart(pack)}
                      >
                        Commander ce Pack
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

       
      </main>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-white/60 backdrop-blur-md shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 flex-shrink-0">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif font-bold text-stone-800">Mon Panier</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCartOpen(false)}
                    className="rounded-full hover:bg-stone-100"
                  >
                    <X className="w-5 h-5 text-stone-600" />
                  </Button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500">Votre panier est vide</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 flex-grow overflow-y-auto px-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-3 bg-white/40 backdrop-blur rounded-lg">
                          <div className="flex space-x-2">
                            <img
                              src={getProductImage(item.name)}
                              alt={item.name}
                              className="w-14 h-14 object-cover rounded-md"
                            />
                            <img
                              src={getProductImage(item.name)}
                              alt={item.name + ' 2'}
                              className="w-14 h-14 object-cover rounded-md"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-stone-800">{item.name}</h4>
                            <p className="text-sm text-gray-500">{item.price} MAD/{item.unit}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center text-md font-semibold">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-500 hover:text-red-500 hover:bg-red-100 rounded-full w-8 h-8"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-6 mt-auto flex-shrink-0">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-bold text-stone-800">Total:</span>
                        <span className="text-2xl font-bold text-emerald-600">{total} MAD</span>
                      </div>
                      <Button
                        onClick={openOrderForm}
                        className="w-full bg-emerald-600/80 hover:bg-emerald-700/80 text-lg py-6 rounded-lg backdrop-blur-md"
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Commander via WhatsApp
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Actions (audio, email, plus) en bas à gauche */}
      <FloatingActions />

      {/* Chatbot Button en bas à droite (bleu, robot) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsChatbotOpen(!isChatbotOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center z-50 chatbot-glow"
        style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
      >
        <Bot className="w-8 h-8" />
        <style>{`
          .chatbot-glow:hover {
            box-shadow: 0 0 0 0 #2563eb, 0 0 16px 4px #2563eb66, 0 4px 16px rgba(0,0,0,0.18);
            animation: chatbot-glow-anim 1.5s infinite alternate;
          }
          @keyframes chatbot-glow-anim {
            0% { box-shadow: 0 0 0 0 #2563eb, 0 0 16px 4px #2563eb66, 0 4px 16px rgba(0,0,0,0.18); }
            100% { box-shadow: 0 0 0 8px #2563eb44, 0 0 32px 8px #2563eb66, 0 4px 16px rgba(0,0,0,0.18); }
          }
        `}</style>
      </motion.button>

      {/* ChatBot : positionné juste au-dessus du bouton, aligné à droite, stable */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.35, type: 'spring', stiffness: 80 }}
            className="fixed right-6 bottom-[88px] z-50 w-full"
            style={{ minWidth: 320, maxWidth: 384 }}
          >
            <ChatBot
              isOpen={isChatbotOpen}
              onClose={() => setIsChatbotOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7, type: 'spring', stiffness: 60 }}
        className="bg-stone-900 text-white py-12"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-4">FreshMarket</h3>
              <p className="text-stone-300">
                Votre source de confiance pour des produits frais et des desserts marocains authentiques.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Contact</h4>
              <div className="space-y-2 text-stone-300">
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+212 6 00 00 00 00</span>
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>Casablanca, Maroc</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-lg">Horaires</h4>
              <div className="text-stone-300">
                <p>Lun - Sam: 8h00 - 20h00</p>
                <p>Dimanche: 9h00 - 18h00</p>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-700 mt-8 pt-8 text-center text-stone-400">
            <p>&copy; 2024 FreshMarket. Tous droits réservés.</p>
          </div>
        </div>
      </motion.footer>

      {/* WhatsApp Order Form */}
      <WhatsAppOrderForm
        cart={cart}
        total={total}
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
      />

    </motion.div>
  )
}

function Root() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="categories" element={<CategoriesAdmin />} />
        </Route>
      </Routes>
    </Router>
  )
}

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default Root

