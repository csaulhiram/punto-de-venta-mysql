const { Router } = require('express');
const {
    supplierMenu,
    getSuppliers, 
    showSupplierForm,
    addSupplier,
    removeSupplier,
    editSupplier,
    updateSupplier} = require('../controllers/suppliersOperations');


const router = Router();

router.get('/supplier-menu', supplierMenu);
router.get('/get-supplier', getSuppliers);
router.get('/show-form', showSupplierForm);
router.post('/add-supplier', addSupplier);
router.get('/update-supplier/:id', editSupplier);
router.post('/update-supplier/:id', updateSupplier);
router.get('/delete-supplier/:id', removeSupplier);



module.exports = router;