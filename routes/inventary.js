const { Router } = require('express');
const {
    inventaryMenu, 
    getProducts, 
    showInventaryForm} = require('../controllers/inventaryOperations');

const router = Router();

router.get('/inventary-menu', inventaryMenu);
router.get('/get-products', getProducts);
router.get('/show-form', showInventaryForm);
/*router.post('/add-client', addClient);
router.get('/update-client/:id', editClient);
router.post('/update-client/:id', updateClient);
router.get('/delete-client/:id', removeClient); */


module.exports = router;