import express from "express"
import { PrismaClient } from "@prisma/client"
import userRouter from "./app/modules/user/routes/user.routes"
import eventRoutes from "./app/modules/event/routes/event.routes"
import authroutes from "./app/modules/auth/routes/auth.routs"
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(eventRoutes) 
app.use(authroutes)
app.listen(3000, ()=>{
    console.log("the server is running on port 3000")
}) 
  
   