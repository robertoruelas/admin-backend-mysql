
import express ,{ Application } from 'express';
import userRoutes from '../routes/usuario';
import loginRoutes from '../routes/auth';
import cors from 'cors';
import db from '../db/connection';

class Server {

    private app: Application;
    private port: String;
    private apiPaths = {
        usuarios: '/api/usuarios',
        auth: '/api/login'
    }
    constructor(){

        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        //Llamar middlewares
        this.middlewares();

        // Definir Rutas
        this.routes();

    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log('la base de datos esta conectada..');
        } catch (error) {
            throw new Error( 'Hay un error de conexion...'  );
        }

    }

    middlewares(){

        //Cors
        this.app.use(cors());

        // Lectura body
        this.app.use(express.json());
        //Carpeta publica
        this.app.use(express.static('public'));

    } 

    routes(){
        this.app.use(this.apiPaths.usuarios,userRoutes);
        this.app.use(this.apiPaths.auth,loginRoutes);

    }
    
    listen(){
        this.app.listen( this.port, () => {

            console.log('Servidor corriendo en el puerto' + this.port);
        });

    }
}

export default Server;