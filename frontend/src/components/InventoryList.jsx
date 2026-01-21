import { useEffect, useState } from 'react';
import api from '../services/api';
import Barcode from 'react-barcode';
import { Pencil, Trash2, QrCode, Plus } from 'lucide-react'; // Import icons

export default function InventoryList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const userRole = localStorage.getItem('role');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing
  const [currentId, setCurrentId] = useState(null);  // Track which ID we are editing
  
  const [formData, setFormData] = useState({
    name: '', sku: '', category: '', description: '', price: '', low_stock_threshold: 10
  });

  const [viewBarcode, setViewBarcode] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/api/products');
      setProducts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setLoading(false);
    }
  };

  // Open Modal for Creating
  const openCreateModal = () => {
    setFormData({ name: '', sku: '', category: '', description: '', price: '', low_stock_threshold: 10 });
    setIsEditing(false);
    setCurrentId(null);
    setIsModalOpen(true);
  };

  // Open Modal for Editing (Pre-fill data)
  const openEditModal = (product) => {
    setFormData({
      name: product.name,
      sku: product.sku,
      category: product.category,
      description: product.description || '',
      price: product.price,
      low_stock_threshold: product.low_stock_threshold
    });
    setIsEditing(true);
    setCurrentId(product.id);
    setIsModalOpen(true);
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/api/products/${id}`);
      fetchProducts(); // Refresh list
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update API Call
        await api.put(`/api/products/${currentId}`, formData);
        alert('Product Updated!');
      } else {
        // Create API Call
        await api.post('/api/products', formData);
        alert('Product Created!');
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      alert('Error: ' + (error.response?.data?.error || error.message));
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading Inventory...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Inventory Management</h1>
        
        {userRole !== 'Operator' && (
          <button 
            onClick={openCreateModal}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        )}
      </div>

      <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              {['SKU', 'Name', 'Category', 'Price', 'Stock', 'Actions'].map((head) => (
                <th key={head} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-slate-600">{product.sku}</td>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-slate-900 font-medium">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    product.total_quantity <= product.low_stock_threshold 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {product.total_quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex items-center space-x-3">
                  <button onClick={() => setViewBarcode(product)} className="text-slate-400 hover:text-slate-700 transition-colors" title="View Barcode">
                    <QrCode className="w-5 h-5" />
                  </button>

                  {userRole !== 'Operator' && (
                    <>
                      <button onClick={() => openEditModal(product)} className="text-indigo-400 hover:text-indigo-600 transition-colors" title="Edit">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit/Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md border border-slate-100">
            <h2 className="text-xl font-bold mb-6 text-slate-800">
              {isEditing ? 'Edit Product' : 'Add New Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Product Name</label>
                <input type="text" name="name" required className="w-full rounded-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500" value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
                  <input type="text" name="sku" required disabled={isEditing} className={`w-full rounded-lg border-slate-300 ${isEditing ? 'bg-slate-100 text-slate-500' : ''}`} value={formData.sku} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <input type="text" name="category" className="w-full rounded-lg border-slate-300 focus:border-blue-500" value={formData.category} onChange={handleInputChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Price ($)</label>
                <input type="number" name="price" step="0.01" className="w-full rounded-lg border-slate-300 focus:border-blue-500" value={formData.price} onChange={handleInputChange} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Low Stock Threshold</label>
                <input type="number" name="low_stock_threshold" className="w-full rounded-lg border-slate-300 focus:border-blue-500" value={formData.low_stock_threshold} onChange={handleInputChange} />
              </div>
              <div className="flex justify-end space-x-3 mt-8">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{isEditing ? 'Update Product' : 'Save Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Barcode Modal (Same as before) */}
      {viewBarcode && (
        <div className="fixed inset-0 bg-slate-900/50 flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
            <h3 className="text-xl font-bold mb-2 text-slate-800">{viewBarcode.name}</h3>
            <div className="flex justify-center py-4">
              <Barcode value={viewBarcode.sku} width={2} height={60} fontSize={16} />
            </div>
            <p className="text-2xl font-bold text-emerald-600 mt-2">${viewBarcode.price}</p>
            <button onClick={() => setViewBarcode(null)} className="mt-6 bg-slate-800 text-white px-6 py-2 rounded-lg hover:bg-slate-900 w-full">Close Label</button>
          </div>
        </div>
      )}
    </div>
  );
}