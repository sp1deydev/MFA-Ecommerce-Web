const express = require('express')
const User = require('./../models/user')
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userController = {
    getAllUsers: (req, res) => {

    },
    getUserById: (req, res) => {
        User.findOne({_id: new mongoose.Types.ObjectId(req.params.id)})
        .then(result => {
            if (result) {
                    res.status(200).json({result, status: true });
                }
            else {
                res.json({message: "user not found"})
            }
        })
        .catch(err => console.error(err))
    },
    updateUser: (req, res) => {
        const { firstname, lastname, email } = req.body;
        User.findOneAndUpdate(
            {_id: new mongoose.Types.ObjectId(req.userId)},
            { firstname: firstname, lastname: lastname, email: email },
            {
                returnDocument: "after" // Return the updated document
                }
        )
        .then(result => {
            if (result) {
                    res.status(200).json({user: result, message: "user information updated",  success: true});
                }
            else {
                res.status(500).json({message: "user information not updated yet"})
            }
        })
        .catch(err => console.error(err))
    },
    changePassword: (req, res) => {
        const {password, newPassword} = req.body;
        const id = req.userId
        console.log(req.body)
        if (!password || !newPassword) {
            return res.status(400).json({
                message: 'Password and new password are required',
            });
        }
        User.findOne(
            {_id: new mongoose.Types.ObjectId(id)}
        )
        .then(result => {
            if (!result) {
                console.log("User not found");
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            const isMatch = bcrypt.compareSync(password, result.password)
            console.log(isMatch)
            if (!isMatch) {
               res.status(400).json({
                    message: 'The old password is incorrect',
                })
            }
            else {
                const salt = bcrypt.genSaltSync(10);
                const newHashPassword = bcrypt.hashSync(newPassword, salt);
                result.password = newHashPassword;
                const newUser = new User(result);
                newUser.save()
                    .then(result => {
                        res.status(200).json({success: true, message: 'Password changed successfully'})
                    })
                    .catch(err => res.status(500).json({message: 'Error changing password'}))
            }

        })
        .catch(err =>{
            console.error("Error finding user:", err);
            res.status(500).json({
                success: false,
                message: 'Error finding user',
                error: err.message,
            });
        });
    },
    deleteUser: (req, res) => {
        // const {id} = req.body;
        User.findOneAndDelete(
            {_id: new mongoose.Types.ObjectId(req.userId)},
        )
        .then(result => {
            if (result) {
                    res.status(200).json({user: result, message: "user deleted",  success: true});
                }
            else {
                res.status(500).json({message: "user not deleted yet"})
            }
        })
        .catch(err => console.error(err))
    },
    configUserMfaConfiguration: (req, res) => {
        const id = req.userId
        User.findOne(
            {_id: new mongoose.Types.ObjectId(id)}
        )
        .then(result => {
            if (!result) {
                console.log("User not found");
                return res.status(404).json({
                    message: 'User not found',
                });
            }
            else {
                result.relationtypes = req.body.relationtypes ? req.body.relationtypes: [];
                result.images = req.body.images ? req.body.images: [];
                result.relationships = req.body.relationships ? req.body.relationships: [];
                const newUser = new User(result);
                newUser.save()
                    .then(result => {
                        res.status(200).json({success: true, message: 'Config successfully', result: result})
                    })
                    .catch(err => res.status(500).json({message: 'Error Config'}))
            }

        })
        .catch(err =>{
            console.error("Error finding user:", err);
            res.status(500).json({
                success: false,
                message: 'Error finding user',
                error: err.message,
            });
        });
    },
    getUserMfaConfiguration: (req, res) => {
        User.findOne({_id: new mongoose.Types.ObjectId(req.userId)})
        .then(result => {
            if (result) {
                    const data = {
                        isConfig: result.isConfig,
                        relationships: result.relationships,
                        relationtypes: result.relationtypes,
                        images: result.images,
                    }
                    res.status(200).json({result: data, success: true, massage: "Get configuration successfully" });
                }
            else {
                res.json({ message: "User not found", success: false})
            }
        })
        .catch(err => console.error(err))
    },
}

module.exports = userController;