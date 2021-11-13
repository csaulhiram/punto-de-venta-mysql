const { request, response } = require('express');

const inventaryMenu = (req, res) => {
    res.render('inventary-menu');
}

const getProducts = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM inventario', (err, products) => {
            if (err) {
                res.json(err);
            }

            res.render('inventary-list', {
                products
            });
        });
    });
}

const showInventaryForm = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT idProveedor, nombreEmpresa FROM proveedores', (err, suppliers) => {
            if (err) {
                res.json(err);
            }
            

            res.render('addInventary', {
                suppliers
            });
        });
    });
}

const addSupplier = (req = request, res = response) => {
        const { nombreEmpresa, telefono, correo } = req.body;
        const data = {
            nombreEmpresa,
            telefono,
            correo
        }

        req.getConnection((err, conn) => {
            if (err) {
                res.json(err);
            }
            // recibe un array de datos
            conn.query('INSERT INTO proveedores set ?', [data], (err, data) => {
                if (err) {
                    res.json(err);
                }
                console.log(data);
                res.redirect('/api/supplier/get-supplier');
            });
        });

    };


    const removeSupplier = (req = request, res = response) => {
        const { id } = req.params;

        req.getConnection((err, conn) => {
            conn.query('DELETE FROM  proveedores WHERE idProveedor = ?', [id], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json(err);
                }
                console.log(rows);
                res.redirect('/api/supplier/get-supplier');
            });
        });
    };


    const editSupplier = (req, res) => {
        const { id } = req.params;

        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM proveedores WHERE idProveedor = ?', [id], (err, rows, fields) => {

                if (err) {
                    res.json(err);
                }
                const data = rows[0];

                res.render('edit_supplier', {
                    data
                });
            });
        });
    };

    const updateSupplier = (req = request, res = response) => {
        const { id } = req.params;
        const { nombreEmpresa, telefono, correo } = req.body;
        console.log(id);
        const data = {
            nombreEmpresa,
            telefono,
            correo
        }
        console.log("id: " + id);
        req.getConnection((err, conn) => {
            conn.query('UPDATE proveedores set ? WHERE idProveedor = ?', [data, id], (err, rows) => {
                console.log(rows);
                if (err) {
                    res.json(err);
                }
                res.redirect('/api/supplier/get-supplier');
            });
        });
    }

    module.exports = {
        inventaryMenu,
        getProducts,
        showInventaryForm
    }