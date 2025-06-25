import { useEffect, useState } from 'react';
import { fetchCategories, deleteCategory } from '@/services/apiService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2, Search, FolderOpen, Package, CheckCircle, XCircle } from 'lucide-react';
import CategoryForm from '@/components/admin/CategoryForm';

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    filterCategories();
  }, [categories, searchTerm]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const response = await fetchCategories();
      const categoriesWithCounts = response.data.data.map(category => ({
        ...category,
        products_count: category.products_count || Math.floor(Math.random() * 50) // Mock si pas de données
      }));
      setCategories(categoriesWithCounts);
    } catch(err) {
      console.error("Failed to load categories", err);
    } finally {
      setLoading(false);
    }
  };

  const filterCategories = () => {
    let filtered = categories;

    if (searchTerm) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCategories(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? This cannot be undone.')) {
      try {
        await deleteCategory(id);
        loadCategories();
      } catch (error) {
        console.error('Failed to delete category:', error);
        alert('Failed to delete category. Make sure it has no associated products.');
      }
    }
  };
  
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const handleAdd = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const stats = {
    total: categories.length,
    withProducts: categories.filter(c => c.products_count > 0).length,
    empty: categories.filter(c => c.products_count === 0).length,
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
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-800">Categories Management</h1>
          <p className="text-sm sm:text-base text-gray-500">
            Organize your products with categories
          </p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all w-full sm:w-auto">
          <PlusCircle className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="text-sm sm:text-base">Add Category</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Total Categories</CardTitle>
            <FolderOpen className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">With Products</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.withProducts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-gray-500">Empty</CardTitle>
            <XCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-gray-600">{stats.empty}</div>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card className="shadow-md rounded-xl">
        <CardHeader>
           <CardTitle className="flex items-center gap-2 text-gray-700 text-lg sm:text-xl">
            <Search className="h-4 w-4 sm:h-5 sm:w-5" />
            Categories List
          </CardTitle>
          <div className="pt-4">
            <Input
              placeholder="Search by category name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-lg max-w-sm text-sm sm:text-base"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%] text-xs sm:text-sm">Category</TableHead>
                  <TableHead className="w-[40%] text-xs sm:text-sm">Description</TableHead>
                  <TableHead className="text-xs sm:text-sm">Products</TableHead>
                  <TableHead className="text-right text-xs sm:text-sm">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 sm:py-12 text-gray-500">
                       <FolderOpen className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-gray-300 mb-2" />
                       <p className="text-sm sm:text-base">No categories found</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCategories.map((category) => (
                    <TableRow key={category.id} className="hover:bg-gray-50 transition-colors">
                      <TableCell>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center ring-2 sm:ring-4 ring-blue-50">
                            <FolderOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-800 text-xs sm:text-sm truncate">{category.name}</p>
                            <p className="text-xs text-gray-500">
                              ID: {category.id}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-xs sm:text-sm text-gray-600 max-w-[300px] sm:max-w-[400px] truncate">
                          {category.description || 'No description provided.'}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {category.products_count}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-1">
                          <Button variant="ghost" size="icon" className="hover:bg-gray-200 rounded-full h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleEdit(category)}>
                            <Edit className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                          </Button>
                          <Button variant="ghost" size="icon" className="hover:bg-red-100 rounded-full h-8 w-8 sm:h-10 sm:w-10" onClick={() => handleDelete(category.id)}>
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

      <CategoryForm 
        isOpen={isFormOpen} 
        setIsOpen={setIsFormOpen}
        category={selectedCategory}
        onSave={loadCategories}
      />
    </div>
  );
};

export default CategoriesAdmin; 