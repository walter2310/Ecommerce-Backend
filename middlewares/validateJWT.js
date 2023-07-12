const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const { client } = require('../DB/databasepg');

const validateJWT = async( req = request, res = response, next ) => {
    const token = req.header('x-token');
    
    if ( !token ) {
        return res.status(401).json({ 
            status: 'FAILED',
            data: {
                error: 'You do not have any token',
            }
        });
    };
 
    try {  
        //Checking if the token is valid
        const { id } = jwt.verify( token, process.env.JWT_SECRET );
    
        if( !id ) {
            return res.status(401).json({
                msg: 'Token not valid - user do not exists in DB'
            })
        }
    
        //Searching the user with the found id
        const user = await client.query('Select * from users Where id = $1', [id]);
        req.user = user.rows[0];
        
        next();

    } catch (error) {
        console.log(error);
        res.status(403)
    }
}

module.exports = {
    validateJWT
}