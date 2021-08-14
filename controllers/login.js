const jwt = require('jsonwebtoken');
const joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = async (req, res, next) => {
    const { error } = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required(),
    }).validate(req.body);

    if (error) return next(error);

    const { email, password } = req.body;

    const user = await User.findOne({
        where: { email },
    });

    const hash = user? user.password : '';

    bcrypt.compare(password, hash, function(err, result) {
        if (err) return next({ message: 'Something went wrong, try again later', code: 500 });

        if (!user || !result) {
            return next({ message: 'Invalid fields', code: 400 });
        }
    
        const token = jwt.sign(user.dataValues, process.env.JWT_SECRET);
    
        res.status(200).json({ token });
    });
};