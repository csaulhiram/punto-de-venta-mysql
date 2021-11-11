const date = new Date();
const fecha = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`

const getClient = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes', (err, client) => {
            if (err) {
                res.json(err);
            }

            /*             res.render('index', {
                            users
                        }) */
            res.json(client);
        });
    });
}

const addClient = (req, res) => {
    const { Amaterno, Apaterno, nombres, telefono, correo } = req.body;

    const data = {
        Amaterno,
        Apaterno,
        nombres,
        telefono,
        correo
    }
   

    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
        }
        // recibe un array de datos
        conn.query('INSERT INTO clientes set ?', [data], (err, data) => {
            if (err) {
                res.json(err);
            }

            //console.log(data);
            res.json(data);
        });
    });

};

const removeClient = (req, res) => {
    const { id } = req.params;
    console.log();
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM  clientes WHERE idCliente = ?', [id], (err, rows) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            console.log(rows);
            res.json(rows);
        });
    });
};

module.exports = {
    addClient,
    getClient,
    removeClient
}

