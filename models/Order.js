const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  products: [{
    productId: { type: Number, required: true },  // ID of the product
    productName: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },  // Default to current date
});

module.exports = mongoose.model('Order', orderSchema);
