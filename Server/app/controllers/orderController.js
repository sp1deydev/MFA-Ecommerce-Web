const express = require('express');
const Order = require('../models/order');
const Cart = require('../models/cart');

const orderController = {
    getAllOrders: (req, res) => {
        const page = parseInt(req.query.page) || 1; 
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const order = req.query.order === 'desc' ? -1 : 1;
    
        const skip = limit ? (page - 1) * limit : 0;
        let query = Order.find().sort({ createdAt: order }).skip(skip).select('_id address cityName districtName wardName status paymentMethod totalPrice');
    
        if (limit) {
            query = query.limit(limit);
        }
    
        query
            .then(result => {
                Order.countDocuments()
                    .then(totalCount => {
                        const totalPages = limit ? Math.ceil(totalCount / limit) : 1;
                        res.status(200).json({
                            data: result,
                            meta: {
                                totalCount, 
                                totalPages, 
                                currentPage: limit ? page : 1,
                                limit: limit || 'all',
                            }
                        });
                    })
                    .catch(err => res.status(500).json(err));
            })
            .catch(err => res.status(500).json(err));
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