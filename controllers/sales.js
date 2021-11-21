const { updateInventary } = require('../helpers/sales_helper');
const PDF = require('pdfkit-construct');

// Global variables
let productsCar = [];
let total = 0;
let precioVenta = 0;
let totalCompra = 0;

const salesView = (req, res) => {
    // get all suppliers
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM inventario', (err, products) => {
            if (err) {
                res.json(err);
            }
            res.render('sales', {
                productsCar,
                products,
                total
            });
        });
    });
}

// reder products in datalist of html file
const getProducts = (req, res) => {
    const { product } = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT idProducto, nombreArticulo, precioVenta FROM inventario WHERE nombreArticulo = ?', [product], (err, search) => {
            if (err) {
                res.json(err);
            }
            // add product to car
            const searchInformation = {
                idProducto: search[0].idProducto,
                nombreArticulo: search[0].nombreArticulo,
                precioVenta: search[0].precioVenta
            }
            //  sum total of sale and save in global variables
            precioVenta = parseFloat(searchInformation.precioVenta);
            totalCompra = precioVenta + totalCompra;
            total = totalCompra.toFixed(2);

            // add product buyed in a global variable array
            productsCar.push(searchInformation);
            console.log(total);
            console.log("carrito: ", productsCar);

            res.redirect('/api/sales/sales');
        });

    });
}

const charge = (req, res) => {

    const data = {
        total
    }

    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }
        // recibe un array de datos
        conn.query('INSERT INTO ventas set ?', [data], (err, data) => {
            if (err) {
                res.json(err);
            }
        });
        //  get last sale
        conn.query('SELECT * FROM ventas ORDER BY idVenta DESC LIMIT 1', (err, ventas) => {
            if (err) {
                res.json(err);
            }
            const idVenta = ventas[0].idVenta;

            // Add products to productosvendidos table
            for (const product of productsCar) {
                let idProducto = product.idProducto;
                conn.query('INSERT INTO productosvendidos set ?', [{ idVenta, idProducto }], (err, data) => {
                    if (err) {
                        res.json(err);
                    }
                });
            }

            // update inventary
            for (const product of productsCar) {
                let idProducto = product.idProducto;
                updateInventary(req, idProducto);
            }



            res.redirect('/api/sales/print-ticket');
        });

    });
}

const printTicket = (req, res) => {
    console.log('Imprimiendo');
    // print ticket
    const doc = new PDF({
        size: 'A4',
        margins: { top: 20, left: 100, right: 10, bottom: 20 },
        bufferPages: true,
    });

    const filename = `Ticket-${Date.now()}.pdf`;

    const stream = res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment;filename=${filename}`
    });

    doc.on('data', (data) => { stream.write(data) });
    doc.on('end', () => { stream.end() });


    doc.setDocumentHeader({
        heigth: '30%'
    }, () => {
        doc.fontSize(18).text('"Miscelánea Esmeralda"', {
            width: 420,
            align: 'center'
        });
        doc.fontSize(18).text('tel. 7228021175', {
            width: 420,
            align: 'center'
        });
        doc.fontSize(12);
        doc.text(`Calle: Juan de la Barrera 504, colonia Niños Héroes Cp. 50100, Toluca Edo Méx`, {
            width: 420,
            align: 'center'
        });
        doc.fontSize(20).text(`Total: ${total}`, {
            width: 420,
            align: 'right'
        });

    });
    // CREATE TABLE
    doc.addTable([
        { key: 'nombreArticulo', label: 'Descripción', align: 'center' },
        { key: 'precioVenta', label: 'Precio', align: 'center' }
    ], productsCar, {
        border: null,
        width: "fill_body",
        striped: true,
        stripedColors: ["#f6f6f6", "#d6c4dd"],
        cellsPadding: 10,
        marginLeft: 0,
        marginRight: 50,
        headAlign: 'center'
    });
    doc.render();
    doc.end();
    // restart global variables
    productsCar = [];
    total = 0;
    precioVenta = 0;
    totalCompra = 0;
    res.redirect('/api/sales/sales');
}



module.exports = {
    salesView,
    getProducts,
    charge,
    printTicket
}