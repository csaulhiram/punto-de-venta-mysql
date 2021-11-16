
const updateInventary = (req, idProducto) => {
    //update inventario table
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }
        conn.query('SELECT salidas, existencias FROM inventario WHERE idProducto = ?', [idProducto], (err, rows, fields) => {

            if (err) {
                res.json(err);
            }
            const data = rows[0];
            console.log("inventario ", data);
            data.salidas = data.salidas + 1;
            data.existencias = data.existencias - 1;
            conn.query('UPDATE inventario set ? WHERE idProducto = ?', [data, idProducto], (err, rows) => {
                console.log(rows);
                if (err) {
                    res.json(err);
                }

            });
            salidas = 0;
            existencias = 0;
        });
    });
}

module.exports = {
    updateInventary
}