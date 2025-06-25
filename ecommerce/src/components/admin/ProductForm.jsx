import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { createProduct, updateProduct, fetchCategories, createProductWithFormData, updateProductWithFormData } from '@/services/apiService';
import { Upload, X } from 'lucide-react';

const ProductForm = ({ isOpen, setIsOpen, product, onSave }) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  
  const categoryId = watch('category_id');

  useEffect(() => {
    fetchCategories()
      .then(response => setCategories(response.data.data))
      .catch(err => console.error("Failed to fetch categories for form", err));
  }, []);
  
  useEffect(() => {
    if (product) {
      reset({
        ...product,
        category: product.category || product.category_id || '',
      });
      if (product.image) {
        setImagePreview(product.image);
      }
    } else {
      reset({ name: '', description: '', price: '', category: '', unit: '', is_active: true, is_featured: false });
      setSelectedImage(null);
      setImagePreview('');
    }
  }, [product, reset, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview('');
    setValue('image', '');
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Créer un FormData avec tous les champs
      const formData = new FormData();
      
      // Ajouter tous les champs du formulaire
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('price', data.price);
      formData.append('category', data.category);
      formData.append('unit', data.unit);
      formData.append('is_active', data.is_active);
      formData.append('is_featured', data.is_featured);
      
      // Ajouter l'image si une nouvelle est sélectionnée
      if (selectedImage) {
        formData.append('image', selectedImage);
      } else if (imagePreview && !selectedImage) {
        // Garder l'image existante si pas de nouvelle image
        formData.append('image', imagePreview);
      }
      
      console.log('FormData envoyé au backend:', {
        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        unit: data.unit,
        is_active: data.is_active,
        is_featured: data.is_featured,
        hasImage: selectedImage ? 'Nouvelle image' : (imagePreview ? 'Image existante' : 'Aucune image')
      });
      
      // Envoyer le FormData au backend
      if (product) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }
      
      onSave();
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[625px] max-h-[90vh] overflow-y-auto" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#d1d5db #f3f4f6'
      }}>
        <style jsx>{`
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 3px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 3px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
        `}</style>
        <DialogHeader className="sticky top-0 bg-white z-10 pb-4 border-b">
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-6">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input id="name" {...register('name', { required: true })} className="col-span-3" />
            {errors.name && <p className="text-red-500 col-span-4 text-center">Name is required.</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">Description</Label>
            <Textarea id="description" {...register('description')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">Price</Label>
            <Input id="price" type="number" step="0.01" {...register('price', { required: true })} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <Select onValueChange={(value) => setValue('category', value)} value={watch('category')}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          
          {/* Image Upload Section */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image</Label>
            <div className="col-span-3 space-y-2">
              {imagePreview ? (
                <div className="relative">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 rounded-full w-6 h-6 p-0"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">Cliquez pour sélectionner une image</p>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('image').click()}
                  >
                    Choisir une image
                  </Button>
                </div>
              )}
              {!imagePreview && (
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="col-span-3"
                />
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="unit" className="text-right">Unit</Label>
            <Input id="unit" {...register('unit')} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_active" className="text-right">Active</Label>
            <Switch id="is_active" {...register('is_active')} defaultChecked={true} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="is_featured" className="text-right">Featured</Label>
            <Switch id="is_featured" {...register('is_featured')} />
          </div>
          <DialogFooter className="sticky bottom-0 bg-white z-10 pt-4 border-t mt-6">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Product'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm; 