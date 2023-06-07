
const { client } = require('../DB/databasepg');
const { ValidationUserError, ValidationFieldError } = require('../ERRORS/Errors');

const verifyEmail = async (email = '') => {
    const query = `SELECT email FROM "users" WHERE "email" = $1`;        
    
    const checkEmail  = await client.query(query, [email]);
    
    if(checkEmail) {
        throw new ValidationUserError;
    }
};

//TODO: I have to re-do this function, it is not working at all. 
//It still allows sending an id that do not exist in database.
const checkId = async(id) => {
    const SQL = 'Select * From "cart" where user_id = $1';
    const values = [id];

    return client.query(SQL,values)
      .then(result => {
        return result.rows[0];
      })
      .catch(err => console.log(err));
}


module.exports = {
    verifyEmail,
    checkId
};