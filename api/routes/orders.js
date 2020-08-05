const express = require('express');
const router = express.Router(); 
const checkAuth = require('../middleware/check-auth');
const OrdersController =  require('../controllers/orders');

router.get('/', checkAuth, OrdersController.orders_get_all);

router.post('/', checkAuth, OrdersController.orders_create_order);

// Targeting the specific orderId. In express we use : to specify other variable(like order id is not a url its Id like 2568 kind of so its a variable)
router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;