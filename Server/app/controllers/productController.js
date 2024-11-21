const express = require('express');
const Product = require('../models/product');

const productController = {
    getAllProducts: (req, res) => {
        const page = parseInt(req.query.page) || 1; 
        const limit = req.query.limit ? parseInt(req.query.limit) : null;
        const order = req.query.order === 'desc' ? -1 : 1;
    
        const skip = limit ? (page - 1) * limit : 0;
        let query = Product.find().sort({ createdAt: order }).skip(skip);
    
        if (limit) {
            query = query.limit(limit);
        }
    
        query
            .then(result => {
                result.forEach(product => {
                    if (product.image) {
                        product.image = `http://localhost:3001/${product.image}`;
                    }
                });
    
                Product.countDocuments()
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
    
    getProdutById: (req, res) => {
        Product.findById(req.query.id)
            .then(result => res.status(200).json({data: result}))
            .catch(err => res.status(500).json(err))
    },
    createProduct: (req, res) => {
        // console.log(req.file)
        const product = new Product(req.body);
        product.save()
            .then(result => res.status(200).json({data: result}))
            .catch(err => res.status(500).json(err))
    },
    deleteProduct: (req, res) => {
        const id = req.query.id;
        Product.findByIdAndDelete(id)
            .then(result => res.status(200).json('Delete product successfully'))
            .catch(err => res.status(500).json(err))
    },
    updateProduct: (req, res) => {
        const { id, name, price, description, quantity, category, image } = req.body;
        Product.findByIdAndUpdate(id, { name, price, description, image, quantity, category }, {new: true})
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json(err))
    },
    getProductCount: (req, res) => {
        Product.countDocuments()
        .then(totalCount => {
            res.status(200).json({
                data: totalCount, 
                success: true
            });
        })
        .catch(err => res.status(500).json(err));
    },
}

module.exports = productController;