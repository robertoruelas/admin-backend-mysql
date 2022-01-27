import { Router } from "express";
import { deleleUsuario, getUsuario, getUsuarios, postUsuario, putUsuario } from "../controller/usuarios";

const router = Router();


router.get('/',getUsuarios);
router.get('/:id',getUsuario);
router.post('/', postUsuario);
router.put('/:id',putUsuario);
router.delete('/:id',deleleUsuario);





export default router;