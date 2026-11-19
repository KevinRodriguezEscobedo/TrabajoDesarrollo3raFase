const Order = require('../models/order.model');
const Product = require('../models/product.model');

const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    let totalAmount = 0;
    const processedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Producto no encontrado: ${item.product}` });
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Stock insuficiente para el producto: ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();

      totalAmount += product.price * item.quantity;
      processedItems.push({ product: product._id, quantity: item.quantity, price: product.price });
    }

    const order = new Order({
      user: req.user.id,
      items: processedItems,
      totalAmount,
      status: 'completada'
    });

    await order.save();
    res.status(201).json({ message: 'Orden creada exitosamente y stock descontado', order });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la orden', error: error.message });
  }
};

const returnOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });
    if (order.status === 'devuelta') return res.status(400).json({ message: 'La orden ya fue devuelta previamente' });

    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stock += item.quantity;
        await product.save();
      }
    }

    order.status = 'devuelta';
    await order.save();

    res.status(200).json({ message: 'Orden devuelta exitosamente y stock restaurado', order });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la devolución', error: error.message });
  }
};

module.exports = { createOrder, returnOrder };