const bcryptjs = require('bcryptjs')

const loginForm = (req, res) => {
    res.render('login');
}

const searchUser = (req, res) => {

    const { nombreUsuario, password } = req.body;
    console.log(req.body);


    req.getConnection((err, conn) => {
        conn.query('SELECT password FROM empleados WHERE nombreUsuario = ?', [nombreUsuario], (err, passwordDB) => {
            if (err) {
                console.log(err);
                res.redirect('/login');
            }

            const validPassword = bcryptjs.compareSync(password, passwordDB[0].password);
            if (!validPassword) {
                console.log("No son correctos");
                res.redirect('/login');
            } else {
                console.log("correctos");
                res.redirect('/index');
            }
        });
    })





}





module.exports = {
    loginForm,
    searchUser
}