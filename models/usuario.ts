import {DataTypes} from 'sequelize';
import db from '../db/connection';

const Usuario = db.define('usuario', {
    usuario: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },id_rol: {
        type: DataTypes.TINYINT
    }
});

export default Usuario;