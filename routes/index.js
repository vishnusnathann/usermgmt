const router = require('express').Router();

router.use('/api/userlist', require('./userlist'));

module.exports = router;