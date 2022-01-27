import { Router } from "express";
import { postLogin } from "../controller/auth";

const router = Router();



router.post('/', postLogin);






export default router;