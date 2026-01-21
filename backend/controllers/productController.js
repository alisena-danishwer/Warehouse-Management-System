const Product = require('../models/Product');
const ActivityLog = require('../models/ActivityLog');

// 1. Export getAllProducts
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Export createProduct
exports.createProduct = async (req, res) => {
  try {
    // NEW: We added 'price' to this list
    const { sku, name, description, category, price, low_stock_threshold } = req.body;
    
    // Check for duplicate SKU
    const existing = await Product.findOne({ where: { sku } });
    if (existing) {
      return res.status(400).json({ error: 'SKU already exists' });
    }

    // Create the product (saving the Price now)
    const newProduct = await Product.create({
      sku,
      name,
      description,
      category,
      price: price || 0, // Default to 0 if no price entered
      low_stock_threshold
    });

    // Log the action if the user is logged in
    if (req.user) {
      await ActivityLog.create({
        username: req.user.username || 'Unknown',
        action: 'Created Product',
        details: `Added ${name} (${sku}) - Price: $${price || 0}`
      });
    }

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ... existing imports and functions ...

// 3. Update a Product
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, sku, category, description, price, low_stock_threshold } = req.body;

    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.update({
      name, sku, category, description, price, low_stock_threshold
    });

    // Log Activity
    if (req.user) {
      await ActivityLog.create({
        username: req.user.username || 'Unknown',
        action: 'Updated Product',
        details: `Updated ${name} (SKU: ${sku})`
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Delete a Product
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    
    if (!product) return res.status(404).json({ error: 'Product not found' });

    await product.destroy(); // Delete from DB

    // Log Activity
    if (req.user) {
      await ActivityLog.create({
        username: req.user.username || 'Unknown',
        action: 'Deleted Product',
        details: `Deleted Product ID: ${id}`
      });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};