import { Response, Request } from "express";
import prisma from "../../utils/prismaconfig/prismaConfig";
import { authtype, authData } from "../types/auth.type";
import passwordVerify from "../../utils/passworHash/passwordVerify";
import datauservalidation from "../../user/types/data.user.validation";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
export default class Auth {

    async login(req: Request, res: Response) {
        const { email, password } = authtype.parse(req.body)
        try {
            const authVerify = await prisma.user.findUnique({
                where: {
                    email: email
                },

            })

            if (!authVerify) {
                res.status(404).json({ message: "credencias Invalidas" })
            }
            const verify = await passwordVerify(password, authVerify?.password)
            if (!verify) {
                res.status(404).json({ message: "Credencias Invalidas" })
            }
            const token = jwt.sign(authVerify, "ticket-app", { expiresIn: "2h" })

            return res.status(201).json({
                message: "login realizado com sucesso!",
                data: {
                    name: authVerify?.name,
                    email: authVerify?.email,
                    phone_number: authVerify?.phone_number,
                    image_path: authVerify?.image_path,
                    status: authVerify?.status,
                    roles: authVerify?.roles,
                    permitions: authVerify?.permitions,
                    create_at: authVerify?.createdAt,
                    update_at: authVerify?.updatedAt,
                    token: token
                }
            })
        } catch (error) {
            res.status(400).json({ messege: "Credenciais Invalida", error: error })
        }
    }
    async reset( req:Request, res:Response ) {
      const { email } = req.body
       try {
          const response = await prisma.user.findUnique({
             where: {
                 email: email
             }
          })
          if(response?.email){

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, 
                auth: {
                    user: "danielsamassumba@gmail.com", 
                    pass: "wxxz xxtc nzmv zmqc",
                },
            });
           return res.status(201).json({ message:" passou"})      
          }
       } catch (error) {
        return res.status(400).json({ message:"usuario não  encontrado!",  error: error})
       }
    }
}   