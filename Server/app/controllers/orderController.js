const express = require('express');
const Order = require('../models/order');
const Cart = require('../models/cart');

const orderController = {
    getAllOrders: (req, res) => {
        Order.find().select('_id address cityName districtName wardName status paymentMethod totalPrice')
        .then(result => {
            if (result) {
                return res.status(200).json({ data: result, status: true });
            } else {
                return res.status(400).json({ message: "Bad Request", status: false });
            }
        })
        .catch(err => res.status(400).json({ message: "Internal Server Err" }));
    },
    getOrdersByUserId: async (req, res) => {
        const {userId} = req 
        if(!userId) {
            return res.status(400).json({message:'UserId is required', success: false})
        }
        Order.find({userId})
            .then(async (result) => {
                if(!result) {
                    return res.status(200).json({data: [], success: true})
                }
                return res.status(200).json({data: result, success: true})
            })
            .catch(err => res.status(500).json(err))
    },
    deleteOrder: async (req, res) => {
        const {id} = req.body
        try {
            await Order.deleteOne({_id: id});
            return res.status(200).json({message:'Delete order successfully', success: true})
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    },
    updateStatus: async (req, res) => {
        const {id, status} = req.body
        console.log(id, status)
        try {
            await Order.findByIdAndUpdate(
                id, 
                { status: status },
            );
            return res.status(200).json({message:'Update Order Status Successfully', success: true})
        } catch (error) {
            return res.status(500).json({error: error, success: false})
        }
    },
    createOrder: async (req, res) => {
        const {requestOrder, cartId} = req.body
        const {userId} = req
        const newOrder = {...requestOrder, userId}
        console.log(newOrder)
        const order = new Order(newOrder);
        order.save()
            .then(async (result) => {
                await Cart.findByIdAndUpdate(
                    cartId, 
                    { products: [] },
                );
                res.status(200).json({data: result, success: true})
            })
            .catch(err => res.status(500).json({error: err, success: false}))
    }
}

module.exports = orderController;