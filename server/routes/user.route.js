import express from "express";
import { signIn, signOut, signUp } from "../controller/user.controller.js";

const  router = express.Router();

router.post('/login', signIn )
router.post('/signup', signUp )
router.post('/logout' , signOut)


export default router; 