const { Router } = require('express');
const {
    inventaryMenu, 
    getProducts, 
    showInventaryForm,
    addProduct,
    removeProduct,
    edidProduct,
    updateProduct} = require('../controllers/inventaryOperations');

const router = Router();

router.get('/inventary-menu', inventaryMenu);
router.get('/get-products', getProducts);
router.get('/show-form', showInventaryForm);
router.post('/add-product', addProduct);
router.get('/update-inventary/:id', edidProduct);
router.post('/update-product/:id', updateProduct);
router.get('/delete-inventary/:id', removeProduct); 


module.exports = router;