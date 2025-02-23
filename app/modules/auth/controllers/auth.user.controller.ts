import { Response, Request } from "express";
import prisma from "../../utils/prismaconfig/prismaConfig";
export default class auth {

     login(req:Request, res:Response){
        const { email , password } = req.body
       try {
        const authVerify = prisma.user.findUnique({
            where:{
               email: email
            }
        })
        res.status(201).json({ message:"user encontrado", data:authVerify})
       } catch (error) {
         res.status(400).json({ messege:"Cr+edenciais Invalida", error: error})
       }
     }
}