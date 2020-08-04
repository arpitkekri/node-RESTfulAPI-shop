// This file spinning up this express application which will make handling requests a bit easiar for me

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// app.use is a middleware

/*app.use((req, res, next) => {
    res.status(200).json({    // will send json response
        message : 'It works !'
    });
}); */

app.use(morgan('dev')); // In terminal print ` GET /orders/454512 200 2.319 ms - 46 ` basically log for developer
app.use(bodyParser.urlencoded({extended: false})); // only support simple encoded url encoded data
app.use(bodyParser.json()); // extract json data

// For append headers  
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Headers has key value pair
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-with, Content-Type, Accept, Authorization'); // Define which kind of headers we want to accept
    // All above mention headers can be appended to request
    if(req.method === 'OPTIONS') { // when we send POST request or a PUT request 
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    } 
    // If not block then next() 
    next();
});



// Routes which should handle request
app.use('/products', productRoutes); // when /products come -> go to productRoutes which go to ./api/routes/products
app.use('/orders', orderRoutes); // when /orders come -> go to orderRoutes which go to ./api/routes/orders

// Error Handling
// If we reach here means we do not found /products or /orders or a valid URL so other than valid url just print error
app.use((req, res, next) => {   
    const error = new Error('Not Found'); // Error() object is available by default
    // error.status(404); // Error() function return its message object
    error.status = 404;  // Custom message "Not Found" so its proves that this is my custom 404 handler
    // So both `error.status(404);` or `error.status = 404;` both will work
    next(error); // Forward this error request instead of original one
});

// When connect to database and get error we want to send 500 internal server error so use this
app.use((error, req, res, next) => { // This handle all kind of errors
    res.status(error.status || 500); // we have error.status then send it or assign it 5-00 internal server error
    res.json({ // send a json format for error
        error:{   // Error object
            message: error.message   // we get `error.status is not a function` and its not seted up by me 
        } // so proves that Error() has a message property 
    });
});

module.exports = app;