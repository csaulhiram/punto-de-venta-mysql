const { Router } = require('express');
const { 
    addClient, 
    getClient, 
    removeClient, 
    editClient, 
    updateClient, 
    clientMenu,
    showClietForm} = require('../controllers/usersOperations');
const router = Router();

router.get('/client-menu', clientMenu);
router.get('/get-clients', getClient);
router.get('/show-form', showClietForm);
router.post('/add-client', addClient);
router.get('/update-client/:id', editClient);
router.post('/update-client/:id', updateClient);
router.get('/delete-client/:id', removeClient);
 

module.exports = router;