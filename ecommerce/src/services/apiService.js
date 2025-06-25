import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Logique de gestion des erreurs
    console.error('Erreur API:', error);
    return Promise.reject(error);
  }
);

// --- Catégories ---
export const fetchCategories = () => api.get('/categories');
export const getCategoryById = (id) => api.get(`/categories/${id}`);
export const createCategory = (categoryData) => api.post('/categories', categoryData);
export const updateCategory = (id, categoryData) => api.put(`/categories/${id}`, categoryData);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// --- Produits ---
export const fetchProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const fetchProductsByCategory = (categoryId) => api.get(`/products/category/${categoryId}`);

// --- Statistiques (Exemple) ---
export const getDashboardStats = async () => {
    const [products, categories] = await Promise.all([
        fetchProducts(),
        fetchCategories()
    ]);

    const productData = products.data.data;
    const categoryData = categories.data.data;

    // Calculate category distribution
    const categoryDistribution = categoryData.map(category => {
        const productsInCategory = productData.filter(product => product.category_id === category.id);
        return {
            name: category.name,
            count: productsInCategory.length,
            percentage: Math.round((productsInCategory.length / productData.length) * 100) || 0
        };
    });

    // Generate monthly data for the last 6 months
    const monthlyData = [];
    const currentDate = new Date();
    for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear();
        
        // Simulate some realistic data
        const productsAdded = Math.floor(Math.random() * 20) + 5;
        const revenue = Math.floor(Math.random() * 5000) + 1000;
        
        monthlyData.push({
            month: monthName,
            products: productsAdded,
            revenue: revenue,
            orders: Math.floor(revenue / 50) + 10
        });
    }

    // Get recent products (last 5)
    const recentProducts = productData
        .sort((a, b) => new Date(b.created_at || Date.now()) - new Date(a.created_at || Date.now()))
        .slice(0, 5);

    return {
        productCount: productData.length,
        categoryCount: categoryData.length,
        totalRevenue: monthlyData.reduce((sum, month) => sum + month.revenue, 0),
        totalOrders: monthlyData.reduce((sum, month) => sum + month.orders, 0),
        categoryDistribution,
        monthlyData,
        recentProducts,
        topCategories: categoryDistribution
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)
    }
}

export default api; 