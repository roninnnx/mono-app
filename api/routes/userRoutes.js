const express = require('express');
const {getUserById, getAllUsers, createUser} = require ('../controllers/userController')

const router = express.Router();


router.get('/', getAllUsers);
router.get('/:id',getUserById);
router.post('/', createUser);
/*
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser); */

module.exports = router;
