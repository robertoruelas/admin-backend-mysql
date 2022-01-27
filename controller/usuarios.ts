import { Request ,Response } from "express";
import Usuario from "../models/usuario";
import bcrypt from "bcryptjs";


export const getUsuarios = async (req: Request ,res: Response) =>{

    const usuarios = await Usuario.findAll();

    res.json({usuarios});
}

export const getUsuario = async (req: Request ,res: Response) =>{ 
    const {id} = req.params;

    const usuarioget = await Usuario.findByPk(id);
    
    if(!usuarioget){
        return res.status(404).json({
            ok:false,
            msg:'El usuario no existe...'
        });
    }

    res.json({
        ok: true,
        usuarioget,
        id
    
    });    
}

export const postUsuario = async (req: Request ,res: Response) =>{

    const {body} = req;

    try {
    const existeEmail = await Usuario.findOne(
        {
            where:{
                email:body.email
            }
        }
    );
    
    if(existeEmail){
        return res.status(400).json({
            ok: false,
            msg: 'El correo ya existe...' + body.email
        });
    }

    // Si funciona bien nose porque marca ese error
    const usuario = new Usuario(body);

    //cifrar la contrasena
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(body.password,salt);
    


    await usuario.save();    
    res.json({
        ok:true,
        usuario
    });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador del sistema...'
        });
    }       
}

export const putUsuario = async(req: Request ,res: Response) =>{
    const {id} = req.params;
    const {body} = req;
    
    try {
        const usuario = await Usuario.findByPk(id);
    
        if(!usuario){
            return res.status(404).json({
                ok:false,
                msg:'El usuario no existe...'
            });
        }   

        await usuario.update(body);
        res.json({
            ok: true,
            msg: 'putUsuario',
            id,
            body
        
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador del sistema...'
        });
    }
    
   
     
}
export const deleleUsuario = (req: Request ,res: Response) =>{
    const id = req.params;
    
    res.json({
        ok: true,
        msg: 'deleteUsuario',
        id
    
    });
     
}