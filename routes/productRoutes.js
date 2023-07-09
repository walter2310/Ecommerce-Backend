const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const productControllers = require('../controllers/productsControllers');

router.get('/', productControllers.getAllProducts);

router.get('/search-game', productControllers.getProductByName);

router.post('/', [
    check('name', 'The name of the product can not be empty').notEmpty().isString(),
    check('price', 'The price of the product can not be empty').notEmpty().isNumeric(),
    check('description', 'The description of the product can not be empty').notEmpty().isString()
],productControllers.createProduct);

router.patch('/upload-product/:id', productControllers.uplaodProduct);

router.delete('/remove-product/:id', productControllers.deleteProduct);

module.exports = router;