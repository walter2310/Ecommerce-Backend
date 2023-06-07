
const express = require('express');
const router = express.Router();

const cartControllers = require('../controllers/cartControllers');
const { check } = require('express-validator');
const { checkId } = require('../helpers/db-validation');

router.get('/:id', [
    check('id').custom(checkId),
],cartControllers.getCartData);

router.get('/total-price/:id', cartControllers.payAmount);

module.exports = router;