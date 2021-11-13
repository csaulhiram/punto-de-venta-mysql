const { request, response } = require('express');

const clientMenu = (req, res) => {
    res.render('client-menu');
}

const getClient = (req, res) => {

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes', (err, client) => {
            if (err) {
                res.json(err);
            }

            res.render('client-list', {
                client
            });
        });
    });
}

const showClietForm = (req, res) => {
    res.render('addClient');
}
const addClient = (req = request, res = response) => {
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
            res.redirect('/api/client/get-clients');
        });
    });

};


const removeClient = (req = request, res = response) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM  clientes WHERE idCliente = ?', [id], (err, rows) => {
            if (err) {
                console.log(err);
                res.json(err);
            }
            res.redirect('/api/client/get-clients');
        });
    });
};


const editClient = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM clientes WHERE idCliente = ?', [id], (err, rows, fields) => {
            console.log(rows);
            if (err) {
                res.json(err);
            }
            const data = rows[0];
            res.render('edit_client', {
                data
            });
        });
    });
};

const updateClient = (req = request, res = response) => {
    const { id } = req.params;
    const { Amaterno, Apaterno, nombres, telefono, correo } = req.body;
    console.table(req.body);
    const data = {
        Amaterno,
        Apaterno,
        nombres,
        telefono,
        correo
    }
    console.log(data);
    req.getConnection((err, conn) => {
        conn.query('UPDATE clientes set ? WHERE idCliente = ?', [data, id], (err, rows) => {
            console.log(rows);
            if (err) {
                res.json(err);
            }
            res.redirect('/api/client/get-clients');
        });
    });
}

module.exports = {
    clientMenu,
    addClient,
    getClient,
    removeClient,
    editClient,
    updateClient,
    showClietForm
}