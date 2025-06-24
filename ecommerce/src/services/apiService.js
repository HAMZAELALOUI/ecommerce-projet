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

    return {
        productCount: products.data.data.length,
        categoryCount: categories.data.data.length
    }
}


export default api; 