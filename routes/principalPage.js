const { Router } = require('express');
const {
    principal,
    usersView, 
    financesView} = require('../controllers/principalPage');

const router = Router();

router.get('/', principal);
router.get('/operations', usersView);
router.get('/finances', financesView);



module.exports = router;