const express = require('express');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoDB_URI = require('./app/config/db.config');
const _const = require('./app/config/constants');
// const session = require('express-session');
require('dotenv').config();
const cors = require('cors');
// const MongoDBSession = require('connect-mongodb-session')(session);

//config port
const PORT = process.env.PORT || 3001;

//connect to database
const mongodbURI = MongoDB_URI.URI
mongoose.connect(mongodbURI)
    .then(() => console.log('Connected to database'))
    .catch((error) => console.error('MongoDB connection error:', error));

//create session db
// const store = new MongoDBSession({
//     uri: mongodbURI,
//     collection: 'Sessions',
// })


app.use(cors());
app.use(cookieParser());
app.use('/uploads',express.static('uploads'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// app.use(
//     session({
//         secret: _const.SESSION_ACCESS_KEY,
//         resave: false,
//         saveUninitialized: false,
//         cookie: { maxAge: 10000 },
//         store: store,
//     })
// );

//routers 
const productsRoute = require('./app/routers/product');
const authRoute = require('./app/routers/auth');
const userRoute = require('./app/routers/user'); 
const imageRoute = require('./app/routers/image'); 
const systemRoute = require('./app/routers/systemConfig'); 
const otpRoute = require('./app/routers/otp'); 
const categoryRoute = require('./app/routers/category'); 
const cartRoute = require('./app/routers/cart'); 
const orderRoute = require('./app/routers/order'); 



app.get('/payment/config', (req, res) => {
    res.status(200).json({
        success: true,
        clientId: process.env.CLIENT_ID
    });
}) //config client id for paypad payment
app.use('/products', productsRoute);
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/images', imageRoute);
app.use('/system', systemRoute);
app.use('/otp', otpRoute);
app.use('/categories', categoryRoute);
app.use('/carts', cartRoute);
app.use('/orders', orderRoute);




app.listen(PORT);
console.log(`Listening on port ${PORT}`);