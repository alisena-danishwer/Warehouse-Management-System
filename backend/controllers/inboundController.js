const { InboundOrder, InboundItem } = require('../models/Inbound');
const Product = require('../models/Product');
const sequelize = require('../config/db');

exports.createInbound = async (req, res) => {
  const t = await sequelize.transaction(); // Start a transaction

  try {
    const { supplier_name, reference_doc, items } = req.body;
    // items should be array: [{ product_id, quantity, unit_price }]

    // 1. Create the Order
    const order = await InboundOrder.create({
      supplier_name,
      reference_doc
    }, { transaction: t });

    // 2. Process each item
    for (const item of items) {
      // Add item record
      await InboundItem.create({
        InboundOrderId: order.id,
        ProductId: item.product_id,
        quantity: item.quantity,
        unit_price: item.unit_price
      }, { transaction: t });

      // Update Product Stock (Increment)
      const product = await Product.findByPk(item.product_id, { transaction: t });
      if (product) {
        product.total_quantity += parseInt(item.quantity);
        await product.save({ transaction: t });
      }
    }

    await t.commit(); // Save everything
    res.status(201).json({ message: 'Inbound processed successfully', order });

  } catch (error) {
    await t.rollback(); // Undo if error
    res.status(500).json({ error: error.message });
  }
};

exports.getInboundHistory = async (req, res) => {
  try {
    const orders = await InboundOrder.findAll({
      include: [{ model: InboundItem, include: [Product] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};