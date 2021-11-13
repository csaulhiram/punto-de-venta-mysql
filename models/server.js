const express = require('express');
const cors = require('cors');

const path = require('path');
const { connectDB } = require('../database/connection');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            client: '/api/client',
            employee: '/api/employee',
            supplier: '/api/supplier',
            inventary: '/api/inventary'
        }
        this.settings();

        // Conectar a la base de datos
        //this.conectarDb();
        // Ejecuta Middlewares
        this.middlewares();

        // Ejecuta Rutas de mi aplicación
        this.routes();
    }


    settings() {
        this.app.set('view engine', 'ejs'); //Le decimos donde está nuestro motor de plantillas
        this.app.set('views', path.join(__dirname, '../public/views'));
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(express.urlencoded());
        // Directorio Público
        this.app.use(express.static(path.join(__dirname, '../public/')));
        // Connection db
        this.app.use(connectDB);

    }

    routes() {
        this.app.use(this.paths.client, require('../routes/client'));
        this.app.use(this.paths.employee, require('../routes/employees'));
        this.app.use(this.paths.supplier, require('../routes/supplier'));
        this.app.use(this.paths.inventary, require('../routes/inventary'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;