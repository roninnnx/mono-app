const User = require("../models/user")
 const getAllUsers = async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            next(error);
        }
    };

   const getUserById = async (req, res, next) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            next(error);
        }
    };

    const createUser = async (req, res, next) => {
        try {
            const { username, email, password } = req.body;
            console.log(req.body);

            const user = await User.create({
                username: username,
                email: email,
                password: password,
            });

            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    };


    module.exports = {
       getAllUsers,
        createUser,
        getUserById
    };
