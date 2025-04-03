const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const Order = require('../models/Order');
const Service = require('../models/Service');

// Get all services
router.get('/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit contact form
router.post('/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        const newMessage = new Message({
            name,
            email,
            subject,
            message
        });
        
        await newMessage.save();
        
        res.json({ success: true, message: 'Message sent successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Submit order
router.post('/orders', async (req, res) => {
    try {
        const { customer, items, subtotal, tax, total, paymentMethod } = req.body;
        
        const newOrder = new Order({
            customer,
            items,
            subtotal,
            tax,
            total,
            paymentMethod
        });
        
        await newOrder.save();
        
        res.json({ success: true, order: newOrder });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;