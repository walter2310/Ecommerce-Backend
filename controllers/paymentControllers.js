const axios = require('axios');

const { request, response } = require('express');
const { client } = require('../DB/databasepg');

const createOrder = async (req = request, res = response ) => {
    try {
        const { userId } = req.params;

        const query = `SELECT SUM(products.price) FROM cart
                 JOIN products ON cart.product_id = products.productid
                 WHERE cart.user_id = $1`;
       
        const { rows } = await client.query(query, [userId]);

        //Creating an order which is an object
        const order = {
            intent: 'CAPTURE',
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: (rows[0].sum * 1.16).toFixed(2)
                    },
                    
                    description: "This is the amount of your purchase."
                }
            ],
            //Settings about what user is gonna see if accept the purschase
            application_context: {
                brand_name: "thefourcodersecommerce.com",
                landing_page: "LOGIN",
                user_action: "PAY_NOW",
                return_url: `http://localhost:8080/`,
                cancel_url: `${process.env.HOST}/payment/cancel-order`
            }
        }
        //Adding new params to my URLs
        const params = new URLSearchParams();
        params.append("grant_type","client_credentials");

        //Creating token
        const { data: { access_token } } = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: process.env.PAYPAL_API_CLIENT,
                password: process.env.PAYPAL_API_SECRET
            }
        })

        //Consuming the Paypal Api
        const orderResponse = await axios.post(`${process.env.PAYPAL_API_REST}/v2/checkout/orders`, order, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
            }
        })

        res.status(201).json(orderResponse.data);
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            data: {
                error: 'Could not process the purchase' 
            }
        })
    }
};

const captureOrder = async (req = request, res = response ) => {
    try {
        const { token } = req.query;
        
        console.log(token);
        //Processing order 
        const payment = await axios.post(`${process.env.PAYPAL_API_REST}/v2/checkout/orders/${token}/capture`, {}, {
            auth: {
                    username: process.env.PAYPAL_API_CLIENT,
                    password: process.env.PAYPAL_API_SECRET
                }            
        })
         //TODO
        //Once we process the payment we have to redirect the client to home. And show a message of payment success
        res.status(200).json({ status: 'OK', data: payment.data });
       
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            data: {
                error: 'Could not capture the order' 
            }
        })
    }
};

const cancelOrder = async (req = request, res = response ) => {
    //TODO
    //Once we have the frontend this function should redirect to home
    res.redirect('/')
};


module.exports = {
    createOrder,
    captureOrder,
    cancelOrder
}
