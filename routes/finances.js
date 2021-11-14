const { Router } = require('express');
const { showInvoiceForm, addInvoice, getInvoices } = require('../controllers/financesOperations');

const router = Router();

router.get('/form-invoice', showInvoiceForm);
router.post('/add-invoice', addInvoice);
router.get('/get-invoices', getInvoices);



module.exports = router;