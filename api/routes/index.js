const express = require('express');
const router = express.Router();
const ctrlUser = require('../controllers/UserController');

router.get('/', ctrlUser.index);



module.exports = router;