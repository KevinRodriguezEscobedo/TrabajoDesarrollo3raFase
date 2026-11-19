const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: [1, 'La cantidad mínima es 1'] },
  price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'La orden debe estar asociada a un usuario'] },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['pendiente', 'completada', 'devuelta'], default: 'pendiente' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);