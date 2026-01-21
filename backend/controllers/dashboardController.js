const Product = require('../models/Product');
const { InboundOrder } = require('../models/Inbound');
const { OutboundOrder } = require('../models/Outbound');
const { Op } = require('sequelize');

exports.getStats = async (req, res) => {
  try {
    const totalProducts = await Product.count();

    const lowStockCount = await Product.count({
      where: { total_quantity: { [Op.lte]: 10 } } // Less than or equal to 10 is low stock
    });

    const totalInbound = await InboundOrder.count();
    const totalOutbound = await OutboundOrder.count();

    // NEW: Calculate Total Inventory Value
    // We fetch all products and sum up (Quantity * Price)
    const allProducts = await Product.findAll();
    const totalValue = allProducts.reduce((sum, product) => {
      return sum + (product.total_quantity * parseFloat(product.price));
    }, 0);

    res.json({
      totalProducts,
      lowStockCount,
      totalInbound,
      totalOutbound,
      totalValue: totalValue.toFixed(2) // Send formatted value
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};