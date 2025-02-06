import { Router } from "express";
import Usercontroller from "../controllers/user.controller";
const userRouter = Router()
const usercontroler = new Usercontroller()

userRouter.post("/user/create",usercontroler.create)
userRouter.get("/user/list",usercontroler.index)
userRouter.get("/user/show/:id",usercontroler.show)

export default userRouter
   