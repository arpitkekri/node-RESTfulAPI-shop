// Handle product related routes

const express = require('express');

// Set up express router
const router = express.Router();

router.get('/', (req, res, next) => { // GET request on /products
    res.status(200).json({
        message: 'Handling GET request to /products'
    });
});

router.post('/', (req, res, next) => { // POST request on /products
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: 'Handling POST request to /products',
        createdProduct: product   // pass the above created product
    });
});
 
// Targeting the specific productId. In express we use : to specify other variable(like product id is not a url its Id like 2568 kind of so its a variable)
router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    if(id == 'special') {
        res.status(200).json({
            message : 'You discovered the special ID',
            id : id
        });
    }
    else {
        res.status(200).json({
            message : 'You passed an ID',
            id: id
        });
    }
});

// PATCH
router.patch('/:productId', (req, res, next) =>{
    res.status(200).json({
        message : 'Updated product!'
    });
});

// DELETE
router.delete('/:productId', (req, res, next) =>{
    res.status(200).json({
        message : 'Deleted product!'
    });
});


module.exports = router;