const { Router } = require('express');
const { loginForm, searchUser } = require('../controllers/login');

const router = Router();

router.get('/login', loginForm);
router.post('/login',searchUser);
 

module.exports = router;