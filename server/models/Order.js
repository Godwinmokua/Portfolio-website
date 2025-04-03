const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const customerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    }
});

const orderSchema = new mongoose.Schema({
    customer: customerSchema,
    items: [orderItemSchema],
    subtotal: {
        type: Number,
        required: true
    },
    tax: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true,
        enum: ['credit-card', 'paypal', 'bank-transfer']
    },
    status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);