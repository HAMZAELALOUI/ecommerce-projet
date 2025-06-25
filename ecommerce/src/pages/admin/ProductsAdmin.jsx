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

  // Modifier la fonction getProductImage pour retourner le chemin public assets
  const getProductImage = (productName) => {
    const name = productName.toLowerCase();
    if (name.includes('banane')) return '/assets/banane.jpeg';
    if (name.includes('carotte')) return '/assets/Carrote.jpeg';
    if (name.includes('courgette')) return '/assets/Courgettes.jpeg';
    if (name.includes('fraise')) return '/assets/fraise.jpeg';
    if (name.includes('pomme')) return '/assets/pommerouge.jpeg';
    if (name.includes('orange')) return '/assets/oranges.jpeg';
    if (name.includes('poivron')) return '/assets/Poivrons.jpeg';
    if (name.includes('tomate')) return '/assets/tomates.jpg';
    if (name.includes('makroudh')) return '/assets/Makroudh.jpeg';
    if (name.includes('cornes')) return '/assets/Cornes de Gazelle.jpeg';
    if (name.includes('dessert')) return '/assets/desserts.jpg';
    if (name.includes('légume') || name.includes('legume')) return '/assets/vegetables.jpg';
    if (name.includes('fruit')) return '/assets/fruits.jpg';
    return '/assets/food.jpg';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 p-3 sm:p-4 md:p-8 bg-gray-50 min-h-screen ml-0 md:ml-12 px-2 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">Products Management</h1>
          <p className="text-sm sm:text-base text-gray-500">
            Manage your product catalog and inventory
          </p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all w-full sm:w-auto">
          <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm sm:text-base">Add Product</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Total Products</CardTitle>
            <Package className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">In Stock</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.inStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.lowStock}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Out of Stock</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-red-600">{stats.outOfStock}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Table */}
      <Card className="shadow-md rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-700 text-lg sm:text-xl">
            <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
            Product List
          </CardTitle>
          <div className="flex gap-3 sm:gap-4 pt-4 flex-col sm:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <Input
                  placeholder="Search by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-lg text-sm sm:text-base"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[240px] rounded-lg">
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
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[40%] text-xs sm:text-sm">Product</TableHead>
                  <TableHead className="text-xs sm:text-sm">Category</TableHead>
                  <TableHead className="text-xs sm:text-sm">Price</TableHead>
                  <TableHead className="text-xs sm:text-sm">Stock</TableHead>
                  <TableHead className="text-xs sm:text-sm">Status</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 sm:py-12 text-gray-500">
                      <Package className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-sm sm:text-base">No products found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                           <img 
                              src={getProductImage(product.name)} 
                              alt={product.name} 
                              className="w-8 h-8 sm:w-12 sm:h-12 object-cover rounded-lg shadow-sm"
                           />
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{product.name}</p>
                            <p className="text-xs text-gray-500 truncate max-w-[200px] sm:max-w-[250px]">
                              {product.description || 'No description'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {product.category_name || 'Uncategorized'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-700 text-xs sm:text-sm">
                        ${product.price ? parseFloat(product.price).toFixed(2) : '0.00'}
                      </TableCell>
                      <TableCell className="font-medium text-xs sm:text-sm">{product.stock || 0}</TableCell>
                      <TableCell>{getStatusBadge(product)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="icon" className="hover:bg-gray-200 rounded-full h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleEdit(product)}>
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-red-100 rounded-full h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleDelete(product.id)}>
                            <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
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