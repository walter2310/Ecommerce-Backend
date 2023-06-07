
const { request, response } = require('express');
const { client } = require('../DB/databasepg');
const { ConnectionError, PaymentTransitionError } = require('../ERRORS/Errors');

const getCartData = async (req = request, res = response) => {
    try {
        const query = 'Select * From "cart" where user_id = $1';
        const { id } = req.params;

        const cart = await client.query(query, [id]);
        res.status(200).json({ status: 'OK', data: cart.rows });
    
    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
         });
    }
};


const payAmount = async (req = request, res = response) => {
    try {
        const query = 'Select * From "cart" where user_id = $1';
        const { id } = req.params;

        const payment = await client.query(query, [id]);
        let finalAmount = 0;

        for(let i = 0; i < payment.rows.length; i++) {
            finalAmount += payment.rows[i].total;
        }

        res.status(200).json({ status: 'OK', total: finalAmount })

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
}


module.exports = {
    getCartData,
    payAmount
}