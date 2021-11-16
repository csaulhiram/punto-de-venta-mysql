const { Router } = require('express');
const { salesView, getProducts, charge } = require('../controllers/sales');

const router = Router();

router.get('/sales', salesView);
router.post('/get-products', getProducts);
router.get('/charge', charge);
 

module.exports = router;