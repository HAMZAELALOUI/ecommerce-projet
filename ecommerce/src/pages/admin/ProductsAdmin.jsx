import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct, fetchCategories } from '@/services/apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  PlusCircle, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Eye,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown
} from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import bananeImg from '@/assets/banane.jpeg';
import carotteImg from '@/assets/Carrote.jpeg';
import cornesDeGazelleImg from '@/assets/Cornes de Gazelle.jpeg';
import courgettesImg from '@/assets/Courgettes.jpeg';
import dessertsImg from '@/assets/desserts.jpg';
import foodImg from '@/assets/food.jpg';
import fraiseImg from '@/assets/fraise.jpeg';
import fruitsImg from '@/assets/fruits.jpg';
import logoImg from '@/assets/logo.jpeg';
import makroudhImg from '@/assets/Makroudh.jpeg';
import orangesImg from '@/assets/oranges.jpeg';
import poivronsImg from '@/assets/Poivrons.jpeg';
import pommerougeImg from '@/assets/pommerouge.jpeg';
import tomatesImg from '@/assets/tomates.jpg';
import vegetablesImg from '@/assets/vegetables.jpg';

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchTerm, categoryFilter]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [productsRes, categoriesRes] = await Promise.all([
        fetchProducts(),
        fetchCategories()
      ]);
      setProducts(productsRes.data.data.map(p => ({
        ...p,
        image_url: `http://localhost:8000${p.image_url}`.replace(/\\/g, '/')
      })));
      setCategories(categoriesRes.data.data);
    } catch(err) {
      console.error("Failed to load initial data", err);
    } finally {
      setLoading(false);
    }
  }

  const loadProducts = async () => {
    try {
      const response = await fetchProducts();
      setProducts(response.data.data.map(p => ({
        ...p,
        image_url: `http://localhost:8000${p.image_url}`.replace(/\\/g, '/')
      })));
    } catch(err) {
      console.error("Failed to load products", err);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category_id === parseInt(categoryFilter));
    }

    setFilteredProducts(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        console.error('Failed to delete product:', error);
        alert('Failed to delete product. It might be linked to existing orders.');
      }
    }
  };
  
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const getStatusBadge = (product) => {
    if (product.stock > 10) {
      return <Badge className="bg-green-100 text-green-800 border border-green-200 capitalize"><CheckCircle className="h-3 w-3 mr-1.5" />In Stock</Badge>;
    } else if (product.stock > 0) {
      return <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200 capitalize"><AlertTriangle className="h-3 w-3 mr-1.5" />Low Stock</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800 border border-red-200 capitalize"><XCircle className="h-3 w-3 mr-1.5" />Out of Stock</Badge>;
    }
  };

  const getCategories = () => {
    const categories = [...new Set(products.map(p => p.category_name))];
    return categories.filter(Boolean);
  };

  const stats = {
    total: products.length,
    inStock: products.filter(p => p.stock > 10).length,
    lowStock: products.filter(p => p.stock > 0 && p.stock <= 10).length,
    outOfStock: products.filter(p => p.stock === 0).length,
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Products Management</h1>
          <p className="text-gray-500">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all">
          <PlusCircle className="h-5 w-5" />
          Add Product
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Products</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In Stock</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.inStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Out of Stock</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.outOfStock}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Table */}
      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <Filter className="h-5 w-5" />
            Product List
          </CardTitle>
          <div className="flex gap-4 pt-4 flex-col md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[240px] rounded-lg">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%]">Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-gray-500">
                      <Package className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      No products found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-4">
                           <img 
                              src={getProductImage(product.name)} 
                              alt={product.name} 
                              className="w-12 h-12 object-cover rounded-lg shadow-sm"
                           />
                          <div>
                            <p className="font-semibold text-gray-800">{product.name}</p>
                            <p className="text-sm text-gray-500 truncate max-w-[250px]">
                              {product.description || 'No description'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.category_name || 'Uncategorized'}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-700">
                        ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                      </TableCell>
                      <TableCell className="font-medium">{product.stock || 0}</TableCell>
                      <TableCell>{getStatusBadge(product)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="icon" className="hover:bg-gray-200 rounded-full" onClick={() => handleEdit(product)}>
                            <Edit className="h-4 w-4 text-gray-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-red-100 rounded-full" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {isFormOpen && (
          <ProductForm 
            isOpen={isFormOpen} 
            setIsOpen={setIsFormOpen}
            product={selectedProduct}
            onSave={loadInitialData}
            categories={categories}
          />
      )}
    </div>
  );
};

export default ProductsAdmin; 