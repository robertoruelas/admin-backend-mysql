"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.getToken = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_1 = __importDefault(require("../models/usuario"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        res.json({
            ok: true,
            token
        });
    }
    catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
});
exports.getToken = getToken;
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log('hola');
    const { email, password } = req.body;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: req.body.email
            }
        });
        if (!existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe...' + req.body.email
            });
        }
        //verificar contrasena
        const validaPassword = bcryptjs_1.default.compareSync(password, existeEmail.password);
        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no valido...'
            });
        }
        // Generar el TOKEN -JWT
        const token = yield (0, jwt_1.default)(existeEmail.id);
        res.json({
            ok: true,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador del sistema...'
        });
    }
});
exports.postLogin = postLogin;
//# sourceMappingURL=auth.js.map