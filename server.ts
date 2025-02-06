import express from "express"
import { PrismaClient } from "@prisma/client"
import userRouter from "./app/modules/user/routes/user.routes"
const app = express()
app.use(express.json())
app.use(userRouter)
app.listen(3000, ()=>{
    console.log("the server is running on port 3000")
}) 