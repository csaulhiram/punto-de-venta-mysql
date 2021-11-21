const { Router } = require('express');
const {
    showInvoiceForm,
    addInvoice,
    getInvoices,
    invoiceClientForm, 
    generateInvoice,
    salesDay} = require('../controllers/financesOperations');

const router = Router();

router.get('/form-invoice', showInvoiceForm);
router.post('/add-invoice', addInvoice);
router.get('/get-invoices', getInvoices);
router.get('/invoice-client-form', invoiceClientForm);
router.post('/generate-invoice',generateInvoice);
router.get('/sales-day',salesDay);


module.exports = router;