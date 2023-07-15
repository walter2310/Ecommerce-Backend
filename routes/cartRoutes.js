
const express = require('express');
const router = express.Router();

const cartControllers = require('../controllers/cartControllers');

router.get('/:userId', cartControllers.getCartData);

router.post('/:product_id/:user_id', cartControllers.addToCart);

router.get('/total-price/:userId', cartControllers.payAmount);

router.delete('/:userId/:productId', cartControllers.removeProductFromCart);

router.delete('/:userId', cartControllers.emptyCart);

module.exports = router;