// Handle product related routes
const express = require('express');

// Set up express router
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

router.get('/', (req, res, next) => { // GET request on /products for showing all products
    Product.find()
    .exec()
    .then(docs => {
        console.log(docs);
        // if(docs.length >= 0) {
            res.status(200).json(docs);
        // }
        // else {
        //     res.status(404).json({
        //         message: 'No entry found'
        //     });
        // }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => { // POST request on /products
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });  
    // Use promise here
    product
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Handling POST request to /products',
            createdProduct: result
        });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
});
 
// Targeting the specific productId. In express we use : to specify other variable(like product id is not a url its Id like 2568 kind of so its a variable)
router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json(doc);
        }
        else {
            res.status(404).json({message: "No valid entry found for provided ID"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
    
    // if(id == 'special') {
    //     res.status(200).json({
    //         message : 'You discovered the special ID',
    //         id : id
    //     });
    // }
    // else {
    //     res.status(200).json({
    //         message : 'You passed an ID',
    //         id: id
    //     });
    // }
});

// PATCH
router.patch('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update( {_id: id}, {$set:updateOps} )
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

// DELETE
router.delete('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    Product.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


module.exports = router;