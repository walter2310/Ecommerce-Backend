const { request, response } = require('express');
const { client } = require('../DB/databasepg');
const { ConnectionError, ValidationFieldError } = require('../ERR/Errors');

const getAllProducts = async (req = request, res = response) => {
    try {
        const products = await client.query('SELECT * FROM products');

        res.status(200).json({ status: 'OK', data: products.rows });

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    };
};

const getProductByName = async (req = request, res = response) => {
    try {
        let { name } = req.body;
      
        const query = 'SELECT * FROM products WHERE name LIKE $1';

        const productByName = await client.query(query, [`%${name}%`]);

        res.status(200).json({ status: 'OK', data: productByName.rows });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    };
};

const createProduct = async (req = request, res = response) => {
    try {
        const { name, price, description, img, developer, category, age } = req.body;

        await client.query(
            `INSERT INTO "products"("name", "price", "description", "img", "developer","category","age")
            VALUES($1, $2, $3, $4, $5, $6, $7)`, [name, price, description, img, developer, category, age]
        );

        res.status(201).json({ status: 'OK' });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            error: new ValidationFieldError
        });
    }
};

const uplaodProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { developer, category, age, name } = req.body;
        const query = 'UPDATE products SET developer = $1, category = $2, age = $3, name = $4 WHERE ProductId = $5';

        await client.query(query, [developer, category, age, name,id])

        res.status(200).json({ status: 'OK' });

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
};

const deleteProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM products WHERE ProductId = $1';

        await client.query(query, [id]);
        res.status(200).json({ status: 'OK', msg: `Product deleted with id: ${id}` });

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
};

module.exports = {
    getAllProducts,
    getProductByName,
    createProduct,
    uplaodProduct,
    deleteProduct,
}