import { Router } from "express";
import { getToken, postLogin } from "../controller/auth";

const router = Router();


router.get('/',getToken);
router.post('/', postLogin);






export default router;