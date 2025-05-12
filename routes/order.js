const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

router.post('/place-order', async (req, res) => {
  const { userEmail, products, totalAmount } = req.body;
  console.log('Received order details:', req.body);  // Log the incoming request body

  if (!userEmail || !products || !totalAmount) {
    return res.status(400).json({ message: 'Invalid order details' });
  }

  const newOrder = new Order({
    userEmail,
    products,
    totalAmount,
  });

  try {
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Error placing order' });
  }
});

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Error fetching orders' });
  }
});

module.exports = router;
