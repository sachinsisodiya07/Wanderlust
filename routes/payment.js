// routes/payment.js
require('dotenv').config();
const express = require('express');
const Razorpay = require('razorpay');
const router = express.Router();

const razorpay = new Razorpay({
  key_id: 'process.env.PAYMENT_ID',
  key_secret: 'process.env.PAYMENT_KEY',
});

router.post('/create-order', async (req, res) => {
  const options = {
    amount: 50000, // ₹500 in paise
    currency: 'INR',
    receipt: `rcpt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating order');
  }
});

module.exports = router;
