

const showInvoiceForm = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT idProveedor, nombreEmpresa FROM proveedores', (err, suppliers) => {
            if (err) {
                res.json(err);
            }


            res.render('addInvoice', {
                suppliers
            });
        });
    });
}

const addInvoice = (req = request, res = response) => {
    let { idProveedor, subtotal, descuento = 0, IEPS = 0, IVA = 0, } = req.body;

    // Si los valores llegan vacíos asigna 0
    if (subtotal == '' || descuento == '' || IEPS == '' || IVA == '') {
        subtotal = 0;
        descuento = 0;
        IEPS = 0;
        IVA = 0;
    }

    // Conversión a tipo flotante
    const total = parseFloat(subtotal, 10) + parseFloat(IEPS, 10) + parseFloat(IVA, 10) - parseFloat(descuento, 10);

    const data = { idProveedor, subtotal, descuento, IEPS, IVA, total };

    req.getConnection((err, conn) => {
        // recibe un array de datos
        conn.query('INSERT INTO facturasProveedores set ?', [data], (err, data) => {
            if (err) {
                res.json(err);
            }
            res.redirect('/api/finances/get-invoices');
        });
    });
};

const getInvoices = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM facturasproveedores', (err, invoiceData) => {
            if (err) {
                res.json(err);
            }


            res.render('invoices_list', {
                invoiceData
            });
        });
    });
}

const invoiceClientForm = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes', (err, clients) => {
            if (err) {
                res.json(err);
            }
            res.render('invoice-client-form', {
                clients
            });
        });
    });
}

// TO DO:
const generateInvoice = (req, res) => {
    const { client, idVenta } = req.body;


    req.getConnection((err, conn) => {
        conn.query('SELECT idProducto FROM productosVendidos WHERE idVenta = ?', [idVenta], (err, productosId) => {
            if (err) {
                res.json(err);
            }

            let arrProduct = [];
            for (const producto of productosId) {
                conn.query('SELECT nombreArticulo, precioVenta from inventario  WHERE idProducto = ?', [producto], (err, productos) => {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    }
                    arrProduct.push(productos);
                });
            }

        });



        /*         //regist invoice
                conn.query('INSERT INTO facturaCliente set ?', [{client, idVenta}], (err, data) => {
                    if (err) {
                        console.log(err);
                        res.json(err);
                    }
                    console.log(data);
            
                }); */
    });



}



const salesDay = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * from VENTAS', (err, sales) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            res.render('sales-list', { sales });
        })
    })
}


module.exports = {
    showInvoiceForm,
    addInvoice,
    getInvoices,
    invoiceClientForm,
    generateInvoice,
    salesDay
}