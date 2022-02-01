import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const validarJWT = (req: Request,res: Response,next: any) =>{

//Leer el token

const token = req.header('x-token');

if(!token){
    return res.status(404).json({

        ok:false,
        msg: 'No existe el token...'

    });
}

try {
    const uid: any = jwt.verify(token,'Sofia261fjshf.kjshfkjdfhs@fhkjsghfkjas');
   
    // console.log(uid);
    req.uid = uid;
    next();
    
} catch (error) {
    res.status(401).json({
        ok:false,
        msg: 'Token no valido'
    })
}

// console.log(token);



}


export default validarJWT;