const express = require('express');
const Cart = require('../models/cart');
const bcrypt = require("bcrypt");

const otpController = {
    
    getCartByUserId: async (req, res) => {
        const {userId} = req 
        if(!userId) {
            return res.status(400).json({message:'UserId is required', success: false})
        }
        Cart.findOne({userId})
            .then(async (result) => {
                if(!result) {
                    let cart = new Cart({userId, products: []});
                    await cart.save();
                    return res.status(200).json({data: cart, test:'1', success: true})
                }
                return res.status(200).json({data: result, success: true})

            })
            .catch(err => res.status(500).json(err))
    },
    deleteProduct: async (req, res) => {
        const {id, productId} = req.body
        try {
            const cart = await Cart.findByIdAndUpdate(
                id, // Find the cart for the user
                { $pull: { products: { productId } } }, // Remove the product with matching productId
                { new: true } // Return the updated cart
            );
    
            return res.status(200).json({message:'Delete product successfully', result: cart, success: true})
        } catch (error) {
            console.error('Error deleting product from cart:', error);
            throw error;
        }
    },
    updateCart: async (req, res) => {
        const {id, products} = req.body
        console.log(id, products)
        try {
            const updatedCart = await Cart.findByIdAndUpdate(
                id, 
                { products: products },
                { new: true } // Return the updated document
            );
            console.log(updatedCart)
            return res.status(200).json({data: updatedCart, success: true})
        } catch (error) {
            return res.status(500).json(err)
        }
    },
    addToCart: async (req, res) => {
        const { product } = req.body;
        try {
            // Find the cart by its ID
            const cart = await Cart.findOne({userId:req.userId});
    
            // Check if the product already exists in the cart
            const existingProductIndex = cart.products.findIndex(
                (p) => p.productId.toString() === product.productId
            );
    
            if (existingProductIndex > -1) {
                // If the product exists, update its quantity
                cart.products[existingProductIndex].quantity += product.quantity;
            } else {
                // If the product doesn't exist, add it to the cart
                cart.products.push(product);
            }
    
            // Save the updated cart
            console.log(cart);
            const updatedCart = await cart.save();
    
            return res.status(200).json({ data: updatedCart, success: true });
        } catch (error) {
            console.error("Error adding to cart:", error);
            return res.status(500).json({ success: false, error: error.message });
        }
    },
}

module.exports = otpController;