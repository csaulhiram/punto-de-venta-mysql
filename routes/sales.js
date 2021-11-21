const { Router } = require('express');
const {
    salesView,
    getProducts,
    charge,
    printTicket} = require('../controllers/sales');

const router = Router();

router.get('/sales', salesView);
router.post('/get-products', getProducts);
router.get('/charge', charge);
router.get('/print-ticket', printTicket);


module.exports = router;