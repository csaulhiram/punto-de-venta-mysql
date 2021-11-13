const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const employeeMenu = (req, res) => {
    res.render('employees-menu');
}

const getEmployees = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empleados', (err, employees) => {
            if (err) {
                res.json(err);
            }

            res.render('employees-list', {
                employees
            });
        });
    });
}

const showEmployeeForm = (req, res) => {
    res.render('addEmployee');
}

const addEmployee = (req = request, res = response) => {
    const { Amaterno, Apaterno, nombres, nombreUsuario, telefono, correo, password:passw  } = req.body;
    // Encriptar contraseña
    let password = passw;
    const salt = bcryptjs.genSaltSync(12);
    password = bcryptjs.hashSync(password, salt);
    console.log(password);
    const data = {
        Amaterno,
        Apaterno,
        nombres,
        telefono,
        correo,
        nombreUsuario,
        password
    }

    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }
        // recibe un array de datos
        conn.query('INSERT INTO empleados set ?', [data], (err, data) => {
            if (err) {
                res.json(err);
            }

            //console.log(data);
            res.redirect('/api/employee/get-employees');
        });
    });

};


const removeEmployee = (req = request, res = response) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM  empleados WHERE idEmpleado = ?', [id], (err, rows) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            console.log("eliminado");
            res.redirect('/api/employee/get-employees');
        });
    });
};


const editEmployee = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM empleados WHERE idEmpleado = ?', [id], (err, rows, fields) => {
            console.log(rows);
            if (err) {
                res.json(err);
            }
            const data = rows[0];

            res.render('edit_Employee', {
                data
            });
        });
    });
};

const updateEmployee = (req = request, res = response) => {
    const { id } = req.params;
    const { Amaterno, Apaterno, nombres, nombreUsuario, telefono, correo, password:passw } = req.body;
    
    // Encriptar contraseña
    let password = passw;
    const salt = bcryptjs.genSaltSync(12);
    password = bcryptjs.hashSync(password, salt);

    // limpiar información
    const data = {
        Amaterno,
        Apaterno,
        nombres,
        telefono,
        correo,
        nombreUsuario,
        password
    }
    console.log(data);

    req.getConnection((err, conn) => {
        conn.query('UPDATE empleados set ? WHERE idEmpleado = ?', [data, id], (err, rows) => {
            console.log(rows);
            if (err) {
                res.json(err);
            }
            res.redirect('/api/employee/get-employees');

        });
    });
}

module.exports = {
    employeeMenu,
    getEmployees,
    showEmployeeForm,
    addEmployee,
    editEmployee,
    updateEmployee,
    removeEmployee
}

