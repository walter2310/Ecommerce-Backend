const { request, response } = require('express');
const { client } = require('../DB/databasepg');
const { ConnectionError, ValidationFieldError  } = require('../ERR/Errors');

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

const getProductById = async (req = request, res = response) => {
    
};

const createProduct = async (req = request, res = response) => {
    try {
        const { name, price, description } = req.body;

        await client.query(
            `INSERT INTO "products"("name", "price", "description")
            VALUES($1, $2, $3)`, [name, price, description]
        );

        res.status(201).json({ status: 'OK'});
        
    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ValidationFieldError
        });
    }
};

const uplaodProduct = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { description, price } = req.body;
        const query = 'UPDATE products SET description = $1, price = $2 WHERE ProductId = $3';

        await client.query(query, [description, price, id])

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
    getProductById,
    createProduct,
    uplaodProduct,
    deleteProduct,
}