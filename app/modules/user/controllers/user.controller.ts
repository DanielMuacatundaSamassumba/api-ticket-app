import { Request, Response } from "express";
import prisma from "../../utils/prismaconfig/prismaConfig";
import datauservalidation from "../types/data.user.validation";
import hashpassword from "../../utils/passworHash/passwordHash";
import { ZodError } from "zod";
import userIdValidation from "../types/userIdValidation";
export default class Usercontroller {

    async index(req: Request, res: Response) {
        const token = req.headers
        console.log(token)
        try {
            const response = await prisma.user.findMany()
            res.status(201).json({ message: "Dados e usuarios pegos com sucesse", data: response })
        } catch (error) {
            res.status(500).json({ message: "Dados e usuarios não pegos com sucesse", data: error })

        }
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
                res.status(500).json({ massage: "usuario não cadastrado com sucesso", error: err.cause })
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
                 id:id
                } 
            })
            res.status(201).json({ message: "Dados pego com sucesso", data: response })
        } catch (error) {
            res.status(500).json({ message: "Dados não pego com sucesso", data: error })
        }
    }
    delete() {

    }
    update() {

    }
}