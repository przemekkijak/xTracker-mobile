const express = require('express');
const UserControl = require('../controllers/user-ctrl');
const router = express.Router();

router.post('/createUser', UserControl.createUser);
router.post('/login', UserControl.login);

module.exports = router;