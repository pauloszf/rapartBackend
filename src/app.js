import express from "express";
import routes from './routes';
const cors = require('cors');


class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use((req, res, next) => {
            //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
            res.header("Access-Control-Allow-Origin", "*");
            //Quais são os métodos que a conexão pode realizar na API
            res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
            next();
        });
        this.server.use(cors());
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

export default new App().server;