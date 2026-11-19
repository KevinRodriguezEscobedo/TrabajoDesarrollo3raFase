const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'El nombre del producto es obligatorio'], trim: true },
  description: { type: String, required: [true, 'La descripción es obligatoria'] },
  price: { type: Number, required: [true, 'El precio es obligatorio'], min: [0, 'El precio no puede ser negativo'] },
  stock: { type: Number, required: [true, 'El stock es obligatorio'], min: [0, 'El stock no puede ser negativo'], default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);