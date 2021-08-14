const joi = require('joi');
const { sequelize } = require('../models');
const { Transaction } = require('../models');
const { User } = require('../models');

const create = async (req, res, next) => {
    const { error } = joi.object({
        description: joi.string().required(),
        value: joi.number().required(),
    })
        .validate(req.body);

    if (error) return next(error);

    const { description, value } = req.body;

    const { id } = req;

    const { balance } = await User.findOne({
        where: { id },
    });

    const newBalance = balance + value;

    if (newBalance <= 0) return next({ message: 'Insufficient funds', code: 400 });

    const transac = await sequelize.transaction(async (transaction) => {
        User.update({ balance: newBalance }, { where: { id } }, { transaction });
        return Transaction.create({ description, value, userId: id }, { transaction });
    });

    res.status(201).json({newBalance, ...transac.dataValues});
};

const getById = async (req, res) => {
    const { id } = req;

    const transactions = await Transaction.findAll({ where: { userId: id } });

    res.status(201).json(transactions);
};

module.exports = {
    create,
    getById
};