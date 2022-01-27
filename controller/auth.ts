import { Request ,Response } from "express";
import bcrypt from "bcryptjs";
import Usuario from "../models/usuario";
import generarJWT from "../helpers/jwt";

export const postLogin= async (req: Request ,res: Response) =>{

    const {email,password} = req.body;

    try {
    const existeEmail = await Usuario.findOne(
        {
            where:{
                email:req.body.email
            }
        }
    );
    
    if(!existeEmail){
        return res.status(400).json({
            ok: false,
            msg: 'El correo no existe...' + req.body.email
        });
    }

    //verificar contrasena
    const validaPassword = bcrypt.compareSync (password,existeEmail.password);
    if(!validaPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Password no valido...'
        });
        
    }

    // Generar el TOKEN -JWT
    const token = await generarJWT(existeEmail.id);

    res.json({
        ok:true,
        token
    });







    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador del sistema...'
        });
    }       
}