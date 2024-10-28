const jwt = require('jsonwebtoken');
const _const = require('../config/constants');

module.exports = {
    isAdmin: (req, res, next) => {
        if (req.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to access this resource",
            });
        }
        next();
    },
    isSystemAdmin: (req, res, next) => {
        if (req.role !== "system") {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to access this resource",
            });
        }
        next();
    },
}