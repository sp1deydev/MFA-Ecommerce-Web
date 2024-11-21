const express = require('express');
const Category = require('../models/category');

const categoryController = {
    getAllCategories: (req, res) => {
        Category.find()
            .then(result => res.status(200).json({data: result, success: true}))
            .catch(err => res.status(500).json(err))
    },
    getCategoryCount: (req, res) => {
        Category.countDocuments()
        .then(totalCount => {
            res.status(200).json({
                data: totalCount, 
                success: true,
            });
        })
        .catch(err => res.status(500).json(err));
    },
    createCategory: (req, res) => {
        const { name, description } = req.body
        if( !name || !description ) {
            return res.status(400).json({message: "Name and Description is required", success: false});
        }
        const newCategory = {
            name: name,
            description: description
        }
        const category = new Category(newCategory);
        category.save()
            .then(result => res.status(200).json({data: result, success: true, message: "Category is created successfully"}))
            .catch(err => res.status(500).json(err))
    },
    deleteCategory: (req, res) => {
        const { id } = req.body;
        if( !id ) {
            return res.status(400).json({message: "Id is required", success: false});
        }
        Category.findByIdAndDelete(id)
            .then(result => {
                if(!result) {
                    return res.status(400).json({message: "Bad request", success: false});
                }
                return res.status(200).json({message:'Delete category successfully', success: true})
            })
            .catch(err => res.status(500).json(err))
    },
    updateCategory: (req, res) => {
        const { id, name, description,  } = req.body;
        if( !id || !name || !description ) {
            return res.status(400).json({message: "Id, Name and Description is required", success: false});
        }
        const newCategory = {
            name: name,
            description: description
        }
        Category.findByIdAndUpdate(id, newCategory, {new: true})
            .then(result => res.status(200).json({data:result, success: true, message: 'Update category successfully'}))
            .catch(err => res.status(500).json(err))
    }
}

module.exports = categoryController;