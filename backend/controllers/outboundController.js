const { OutboundOrder, OutboundItem } = require('../models/Outbound');
const Product = require('../models/Product');
const sequelize = require('../config/db');

exports.createOutbound = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { customer_name, reference_doc, items } = req.body;

    // 1. Create the Order Header
    const order = await OutboundOrder.create({
      customer_name,
      reference_doc
    }, { transaction: t });

    // 2. Process items
    for (const item of items) {
      const product = await Product.findByPk(item.product_id, { transaction: t });

      if (!product) {
        throw new Error(`Product ID ${item.product_id} not found`);
      }

      // CRITICAL: Check stock availability
      if (product.total_quantity < item.quantity) {
        throw new Error(`Insufficient stock for Product: ${product.name}. Available: ${product.total_quantity}`);
      }

      // Add Item Record
      await OutboundItem.create({
        OutboundOrderId: order.id,
        ProductId: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price
      }, { transaction: t });

      // Update Product Stock (Decrement)
      product.total_quantity -= parseInt(item.quantity);
      await product.save({ transaction: t });
    }

    await t.commit();
    res.status(201).json({ message: 'Order shipped successfully', order });

  } catch (error) {
    await t.rollback();
    res.status(400).json({ error: error.message });
  }
};