var router = require('express').Router();


require('./local/setup.js');


router.use('/local', require('./local'));


module.exports = router;



