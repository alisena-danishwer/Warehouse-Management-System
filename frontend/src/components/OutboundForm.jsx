import { useEffect, useState } from 'react';
import api from '../services/api';

export default function OutboundForm() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customer_name: '',
    reference_doc: '',
    product_id: '',
    quantity: '',
    unit_price: ''
  });

  // Fetch products to show current stock
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        customer_name: formData.customer_name,
        reference_doc: formData.reference_doc,
        items: [{
          product_id: formData.product_id,
          quantity: parseInt(formData.quantity),
          unit_price: parseFloat(formData.unit_price || 0)
        }]
      };

      await api.post('/api/outbound', payload);
      alert('Order Shipped Successfully!');
      setFormData({ customer_name: '', reference_doc: '', product_id: '', quantity: '', unit_price: '' });
      fetchProducts(); // Refresh to update stock counts in dropdown
    } catch (error) {
      alert('Error shipping order: ' + (error.response?.data?.error || error.message));
    }
  };

  // Helper to find selected product's stock
  const selectedProduct = products.find(p => p.id == formData.product_id);

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8 mt-10 border-t-4 border-red-500">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Ship Stock (Outbound)</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Customer Name</label>
            <input 
              type="text" name="customer_name" required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
              value={formData.customer_name} onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sales Order #</label>
            <input 
              type="text" name="reference_doc"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
              value={formData.reference_doc} onChange={handleChange}
            />
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Item Details</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700">Select Product</label>
              <select 
                name="product_id" 
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                value={formData.product_id} onChange={handleChange}
                required
              >
                <option value="">-- Choose Product --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Stock: {p.total_quantity})
                  </option>
                ))}
              </select>
              {selectedProduct && (
                <p className={`text-xs mt-1 ${selectedProduct.total_quantity === 0 ? 'text-red-600' : 'text-gray-500'}`}>
                  Available: {selectedProduct.total_quantity}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input 
                type="number" name="quantity" min="1" required
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                value={formData.quantity} onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Unit Price ($)</label>
              <input 
                type="number" name="unit_price" step="0.01"
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm"
                value={formData.unit_price} onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 transition"
        >
          Confirm Shipment
        </button>
      </form>
    </div>
  );
}