import express from "express";
import { checked, login, signUp } from "./user.controller";
const router = express.Router();

router.post("/signup", signUp);
router.post('/login', login);
router.get('/checked', checked)

export const userRouter = router;
