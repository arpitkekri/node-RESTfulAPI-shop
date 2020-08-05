const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productsController = require('../controllers/products');

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

// Publicly accessiable
router.get('/', productsController.products_get_all);

// Protected
router.post('/', checkAuth, upload.single('productImage'), productsController.products_create_product);

// Targeting the specific productId. In express we use : to specify other variable(like product id is not a url its Id like 2568 kind of so its a variable)
router.get('/:productId', productsController.products_get_product);

router.patch('/:productId', checkAuth, productsController.products_update_product);

router.delete('/:productId', checkAuth, productsController.products_delete);

module.exports = router;