import multer from "multer"
const  upload  =  multer ( {  dest : 'uploads/'  } )
import { Request, Response } from "express";
export default class ConfigUser {
    upload(req:Request, res:Response, ) {

    }
}