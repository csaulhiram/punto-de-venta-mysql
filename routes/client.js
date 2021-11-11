const { Router } = require('express');
const { addClient, getClient, removeClient } = require('../controllers/usersOperations');
const router = Router();


router.get('/get-clients', getClient);
router.post('/add-client', addClient);
router.delete('/delete-client/:id', removeClient);
 

module.exports = router;