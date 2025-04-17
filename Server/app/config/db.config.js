require('dotenv').config();
module.exports = {
    URI: process.env.DATABASE || 'mongodb://localhost:27017/mfa-ecommerce'
}