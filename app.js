// This file spinning up this express application which will make handling requests a bit easiar for me

const express = require('express');
const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// app.use is a middleware

/*app.use((req, res, next) => {
    res.status(200).json({    // will send json response
        message : 'It works !'
    });
}); */

app.use('/products', productRoutes); // when /products come -> go to productRoutes which go to ./api/routes/products
app.use('/orders', orderRoutes); // when /orders come -> go to orderRoutes which go to ./api/routes/orders

module.exports = app;