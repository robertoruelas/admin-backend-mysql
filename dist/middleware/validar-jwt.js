"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    //Leer el token
    const token = req.header('x-token');
    if (!token) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe el token...'
        });
    }
    try {
        const uid = jsonwebtoken_1.default.verify(token, 'Sofia261fjshf.kjshfkjdfhs@fhkjsghfkjas');
        // console.log(uid);
        req.uid = uid;
        next();
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
    // console.log(token);
};
exports.default = validarJWT;
//# sourceMappingURL=validar-jwt.js.map