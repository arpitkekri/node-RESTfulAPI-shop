// Handle product related routes
const express = require('express');

// Set up express router
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, /*new Date().toISOString  +*/ file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
    // reject a file if it is not image
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('Please upload a image. Size < 5MB'), false);
    }
};



const upload = multer({ 
    storage: storage, 
    limits: {fileSize: 1024 * 1024 * 5 },// 5MB file limit 
    fileFilter: fileFilter
});

const Product = require('../models/product');

router.get('/', (req, res, next) => { // GET request on /products for showing all products
    Product.find()
    .select('name price _id productImage')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    productImage: doc.productImage,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    } 
                }
            })
        };
        // console.log(docs);
        // if(docs.length >= 0) {
            res.status(200).json(response);
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

router.post('/', upload.single('productImage'), (req, res, next) => { // POST request on /products
    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
    console.log(req.file);
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    // Use promise here
    product
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: 'Created product successfully',
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + result._id
                }
            }
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
    .select('name price _id productImage')
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    type: 'GET',
                    description: 'GET_ALL_PRODUCTS',
                    url: 'http://localhost:3000/products/'
                }
            });
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
        // console.log(result);
        res.status(200).json({
            message: "Product updated",
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products/' + id
            }
        });
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
        res.status(200).json({
            message: 'Product deleted',
            request: {
                type: 'POST',
                url: 'http://localhost:3000/products/',
                body: { name: 'String', price: 'Number' }
                
            }
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});


module.exports = router;