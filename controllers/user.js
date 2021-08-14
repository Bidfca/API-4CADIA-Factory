const joi = require('joi');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { sequelize } = require('../models');

const SALT_ROUNDS = 10;

const getById = async (req, res) => {
    const { id } = req;

    const { name, email, balance } = await User.findOne({ where: { id } });

    res.status(201).json({ name, email, balance });
};

const create = async (req, res, next) => {
    const { error } = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().min(6),
    })
        .validate(req.body);

    if (error) return next(error);

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) return next({ message: 'User already registered', code: 409 });

    bcrypt.hash(password, SALT_ROUNDS, async function (err, hash) {
        if (err) return next({ message: 'Something went wrong, try again later', code: 500 });

        const user = await sequelize.transaction(async (transaction) => (
            User.create({ name, email, password: hash }, { transaction })));

        const token = jwt.sign(user.dataValues, process.env.JWT_SECRET);

        res.status(201).json({ token });
    });
};

module.exports = {
    create,
    getById
};