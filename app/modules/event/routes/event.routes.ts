import { Router  } from "express";
import Eventcontroller from "../controllers/event.controller";
const eventRoutes = Router()
const eventcontroller = new Eventcontroller()
eventRoutes.get("/event", (req, res)=>{
     res.status(201).json({ message:"a rota dos eventos"})
})
eventRoutes.post("/api/event/create", eventcontroller.create)

export default eventRoutes