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

const addProduct = (req = request, res = response) => {
    const { idProveedor,nombreArticulo, precioCompra, precioVenta, entradas, codigoBarras } = req.body;
    
    const salidas = 0;
    const existencias = entradas;
    const data = {
        idProveedor,
        nombreArticulo,
        precioCompra,
        precioVenta,
        entradas,
        salidas,
        codigoBarras,
        existencias
    }

    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }
        // recibe un array de datos
        conn.query('INSERT INTO inventario set ?', [data], (err, data) => {
            if (err) {
                res.json(err);
            }
            console.log(data);
            res.redirect('/api/inventary/get-products');
        });
    });

};


const removeProduct = (req = request, res = response) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM  inventario WHERE idProducto = ?', [id], (err, rows) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            console.log(rows);
            res.redirect('/api/inventary/get-products');
        });
    });
};


const edidProduct = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM inventario WHERE idProducto = ?', [id], (err, rows, fields) => {

            if (err) {
                res.json(err);
            }
            const data = rows[0];

            res.render('edit_inventary', {
                data
            });
        });
    });
};

const updateProduct = (req = request, res = response) => {
    const { id } = req.params;

    const { nombreArticulo, precioCompra, precioVenta, entradas, codigoBarras } = req.body;
// Actualiza las existencias
    const existencias = entradas;

    const data = {
        nombreArticulo,
        precioCompra,
        precioVenta,
        entradas,
        codigoBarras,
        existencias
    }

    req.getConnection((err, conn) => {
        conn.query('UPDATE inventario set ? WHERE idProducto = ?', [data, id], (err, rows) => {
            console.log(rows);
            if (err) {
                res.json(err);
            }
            res.redirect('/api/inventary/get-products');
        });
    });
}

module.exports = {
    inventaryMenu,
    getProducts,
    showInventaryForm,
    addProduct,
    removeProduct,
    edidProduct,
    updateProduct
}