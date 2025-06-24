import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { createProduct, updateProduct, fetchCategories } from '@/services/apiService';

const ProductForm = ({ isOpen, setIsOpen, product, onSave }) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  
  const categoryId = watch('category_id');

  useEffect(() => {
    fetchCategories()
      .then(response => setCategories(response.data.data))
      .catch(err => console.error("Failed to fetch categories for form", err));
  }, []);
  
  useEffect(() => {
    if (product) {
      reset(product);
    } else {
      reset({ name: '', description: '', price: '', category_id: '', image: '', unit: '', is_active: true, is_featured: false });
    }
  }, [product, reset, isOpen]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    // TODO: Handle file upload logic if necessary
    try {
      if (product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
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
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
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
            <Select onValueChange={(value) => setValue('category_id', value)} value={categoryId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">Image URL</Label>
            <Input id="image" {...register('image')} className="col-span-3" />
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
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Product'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm; 