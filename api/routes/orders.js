// Handle orders related routes

const express = require('express');

// Set up express router
const router = express.Router();

router.get('/', (req, res, next) => { // GET request on /orders
    res.status(200).json({
        message: 'Orders were fetched to /orders'
    });
});

router.post('/', (req, res, next) => { // POST request on /orders
    res.status(201).json({
        message: 'Orders were created to /orders'
    });
});
 
// Targeting the specific orderId. In express we use : to specify other variable(like order id is not a url its Id like 2568 kind of so its a variable)
router.get('/:orderId', (req, res, next) =>{
    res.status(200).json({
        message : 'Order details',
        orderId : req.params.orderId
    });
});

// DELETE
router.delete('/:orderId', (req, res, next) =>{
    res.status(200).json({
        message : 'Order cancelled',
        orderId : req.params.orderId
    });
});


module.exports = router;