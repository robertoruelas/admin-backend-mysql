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
exports.deleleUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json({ usuarios });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuarioget = yield usuario_1.default.findByPk(id);
    if (!usuarioget) {
        return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe...'
        });
    }
    res.json({
        ok: true,
        usuarioget,
        id
    });
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe...' + body.email
            });
        }
        // Si funciona bien nose porque marca ese error
        const usuario = new usuario_1.default(body);
        //cifrar la contrasena
        const salt = bcryptjs_1.default.genSaltSync();
        usuario.password = bcryptjs_1.default.hashSync(body.password, salt);
        yield usuario.save();
        res.json({
            ok: true,
            usuario
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
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe...'
            });
        }
        yield usuario.update(body);
        res.json({
            ok: true,
            msg: 'putUsuario',
            id,
            body
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
exports.putUsuario = putUsuario;
const deleleUsuario = (req, res) => {
    const id = req.params;
    res.json({
        ok: true,
        msg: 'deleteUsuario',
        id
    });
};
exports.deleleUsuario = deleleUsuario;
//# sourceMappingURL=usuarios.js.map