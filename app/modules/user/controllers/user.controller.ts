import { Request, Response } from "express";
import prisma from "../../utils/prismaconfig/prismaConfig";
import datauservalidation from "../types/data.user.validation";
import hashpassword from "../../utils/passworHash/passwordHash";
import { ZodError } from "zod";
import userIdValidation from "../types/userIdValidation";
import Jwt from "jsonwebtoken";
import { permission } from "process";
interface tokenType {
    token: string | undefined
}
type tokenData = {
    password: string | null,
    othersElements: string | null
}
export default class Usercontroller {

    async index(req: Request, res: Response) {
        const token = req.headers?.token 
        const tokenVerify = Jwt.decode(token)
        const { password, ...otherElements }: tokenData = tokenVerify

        if (otherElements?.permitions) {
            const permitions = tokenVerify?.permitions.split(",")
            if (permitions.includes("list-users")) {
                try { 
                    const response = await prisma.user.findMany({
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            status: true,
                            permitions: true,
                            roles: true,
                            createdAt: true,
                            updatedAt: true,
                            password: false
                        }
                    })
                    return res.status(201).json({ message: "Dados e usuarios pegos com sucesse", data: response })
                } catch (error) {
                    return res.status(500).json({ message: "Dados e usuarios não pegos com sucesse", data: error })
                }
            }
            return res.status(404).json({ message: "Dados e usuarios não pegos com sucesse", error:"Inautenticado" })

        }

        return res.status(401).json({ message: "Token não fornecido" });
    }
    async create(req: Request, res: Response) {
        const data = datauservalidation.parse(req.body)
        const name = data.name
        let roles = data.roles
        let permitions = ""
        if (roles == "admin") {
            roles = ["admin"].toString()
            permitions = ["list-users",
                "delete-users",
                "list-payments",
                "list-events",
                "create-category",
                "update-category",
                "delete-category",
            ].toString()
        } else {
            roles = ["normal-user"].toString()
            permitions = [
                "create-event",
                "list-events",
                "list-category",
                "upadte-event",
                "delete-event",
            ].toString()
        }

        const password = await hashpassword(data.password)
        const response = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                image_path: "",
                status: "1",
                roles: roles,
                permitions: [permitions].toString(),
                password: password
            }
        }).then(response => {
            res.status(201).json({ messege: "usuario cadastrado com sucesso", data: response })
        }).catch(err => {
            if (err instanceof ZodError) {
                res.status(500).json({ massage: "usuario não cadastrado com sucesso", error: err })
                return;
            }
            res.status(500).json({ massage: "usuario não cadastrado com sucesso", error: err })
        })

    }
    async show(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        try {
            const response = await prisma.user.findUnique({
                where: {
                    email: "danielsamasua@gail.com"
                },

                select: {
                    password: false
                }
            })
            res.status(201).json({ message: "Dados pego com sucesso", data: response })
        } catch (error) {
            res.status(500).json({ message: "Dados não pego com sucesso", data: error })
        }
    }
    async delete(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10);
        const response = await prisma.user.delete({
            where: {
                id: id
            }
        }).then(res0 => {
            res.status(201).json({ messege: "usuario apagado com sucesso!", data: res0 })
        })
            .catch(error => {
                res.status(500).json({ message: "usuario Não apagado com sucesso", data: error.meta.cause })
            })
    }
    async update(req: Request, res: Response) {
        const id = parseInt(req.params.id, 10)
        const data = req.body
        try {
            const response = await prisma.user.update({
                where: {
                    id: id
                },
                data: {
                    name: data.name,
                    email: data.email,
                    phone_number: data.phone_number,
                    image_path: data.image_path,
                    status: data.status,
                    roles: data.roles,
                }
            })
            res.status(201).json({ message: "usuario actualizado com sucesso!", data: response })
        } catch (error) {
            res.status(404).json({ message: error, data: error })
        }

    }

}


