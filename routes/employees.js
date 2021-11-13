const { Router } = require('express');
const {
    employeeMenu,
    getEmployees,
    showEmployeeForm,
    addEmployee, 
    editEmployee,
    updateEmployee,
    removeEmployee} = require('../controllers/employeesOperations');

const router = Router();

router.get('/employee-menu', employeeMenu);
router.get('/get-employees', getEmployees);
router.get('/show-form', showEmployeeForm);
router.post('/add-employee', addEmployee);
router.get('/update-employee/:id', editEmployee);
router.post('/update-employee/:id', updateEmployee);
router.get('/delete-employee/:id', removeEmployee);


module.exports = router;