const express = require('express');
const SystemConfig = require('../models/systemConfig');

const systemController = {
    
    getSystemConfig: (req, res) => {
        SystemConfig.findOne()
            .then((result) => {
                if (!result) {
                    return res.status(200).json({ data: {}, success: true });
                }
                const { numOfAuthenticatedImages, numOfImageEachRelationType, numOfRelationTypes, numOfUploadedImages, _id } = result;
                res.status(200).json({
                    data: { numOfAuthenticatedImages, numOfImageEachRelationType, numOfRelationTypes, numOfUploadedImages, id: _id },
                    success: true
                });
            })
            .catch((err) => res.status(500).json(err));
    },
    createSystemConfig: (req, res) => {
        const systemConfig = new SystemConfig(req.body);
        console.log(req.body);
        systemConfig.save()
            .then(result => res.status(200).json({data: result}))
            .catch(err => res.status(500).json(err))
   },
   updateSystemConfig: (req, res) => {
       SystemConfig.findByIdAndUpdate(req.body.id, req.body, {new: true})
           .then(result => res.status(200).json(result))
           .catch(err => res.status(500).json(err))
   }
}

module.exports = systemController;