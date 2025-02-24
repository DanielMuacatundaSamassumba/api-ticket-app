import { Router } from "express";
import Auth from "../controllers/auth.user.controller";

const authroutes = Router()
const authverify = new Auth()
authroutes.post("/api/user/auth", authverify.login)
authroutes.post("/api/user/auth/reset", authverify.reset)

export default authroutes    