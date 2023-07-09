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
        let { name } = req.query;
        name = name.trim();
        //Making the first letter UpperCase and the rest LowerCase
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

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
        const { name, price, description, img } = req.body;

        await client.query(
            `INSERT INTO "products"("name", "price", "description", "img")
            VALUES($1, $2, $3, $4)`, [name, price, description, img]
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
        const { developer, category, age } = req.body;
        const query = 'UPDATE products SET developer = $1, category = $2, age = $3 WHERE ProductId = $4';

        await client.query(query, [developer, category, age, id])

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