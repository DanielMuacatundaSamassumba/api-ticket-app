import { Router } from "express";
import auth from "../controllers/auth.user.controller";

const authroutes = Router()
const authverify = new auth()
authroutes.post("/api/user/login", authverify.login)

export default authroutes