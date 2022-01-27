import jwt from 'jsonwebtoken';




const generarJWT = ( uid: any ) => {

    return new Promise ((resolve,reject) =>{

        const payload = {
            uid,

        }
        jwt.sign(payload,'Sofia261fjshf.kjshfkjdfhs@fhkjsghfkjas', {
                expiresIn: '12h'

        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT');
            }else {
                resolve(token);
            }

        });


    });


}

export default generarJWT;