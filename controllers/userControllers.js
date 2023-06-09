const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const { ValidationUserError, ConnectionError } = require('../ERR/Errors');
const jwt = require('jsonwebtoken');

const { client } = require('../DB/databasepg');

const getAllUsers = async (req = request, res = response) => {
    try {
        const users = await client.query('SELECT * FROM users');

        res.status(200).json({ status: 'OK', data: users.rows });

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
}

const getUserById = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const userById = await client.query('SELECT * FROM users HHERE id = $1', [id]);

        res.status(200).json({ status: 'OK', data: userById.rows });

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
}

const createUser = async (req = request, res = response) => {
    try {
        const { name, email, password, date } = req.body;
        const encyptedPassword = bcryptjs.hashSync(password, 10);

        await client.query(
            `INSERT INTO "users"("name", "email", "password", "date")
            VALUES($1, $2, $3, $4)`, [name, email, encyptedPassword, date]
        );

        res.status(201).json({ status: 'OK' });

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ValidationUserError
        });
    }
}

const loginUser = async (req = request, res = response) => {
    try {
        const { email, password } = req.body;
        const query = `SELECT * FROM "users" WHERE "email" = $1`;
        const user = await client.query(query, [email]);

        if (!user) {
            return res.status(400).json({ msg: 'The email do not exists in DB' });
        }

        const validPassword = bcryptjs.compareSync(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(400).json({ msg: 'The email or the password do not exists in DB' });
        }

        const salt = bcryptjs.genSaltSync();
        user.rows[0].password = bcryptjs.hashSync(password, salt);

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(200).json({ status: 'OK', data: user.rows, token });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: 'FAILED',
            error: new ValidationUserError
        });
    }
};

const patchUser = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3';

        await client.query(query, [name, email, id])

        res.status(200).json({ status: 'OK' });

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
};

const deleteUser = async (req = request, res = response) => {
    try {
        const { id } = req.params;
        const query = 'DELETE FROM users WHERE id = $1';

        console.log(req.user);

        await client.query(query, [id]);
        res.status(200).json({ status: 'OK', msg: `User deleted with id: ${id}` });

    } catch (error) {
        res.status(400).json({
            status: 'FAILED',
            error: new ConnectionError
        });
    }
};

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    getUserById,
    patchUser,
    deleteUser
};