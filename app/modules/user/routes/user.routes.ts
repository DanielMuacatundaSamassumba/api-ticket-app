import { Router } from "express";
import Usercontroller from "../controllers/user.controller";
import multer from "multer";
const upload = multer({ dest: 'uploads/' })
const userRouter = Router()
const usercontroler = new Usercontroller()
userRouter.get("/", (req, res) => {
    res.status(200).json({ message: "hello world" })
})
userRouter.post("/api//user/create", usercontroler.create)
userRouter.get("/api/admin/user/list", usercontroler.index)
userRouter.get("/api/user/show/:id", usercontroler.show)
userRouter.delete("/api/user/delete/:id", usercontroler.delete)
userRouter.put("/api/user/update/:id", usercontroler.update)

const storage = multer.diskStorage({
    
    destination: (req, file, cb) => {
        cb(null, "/uploads")

    } 
    , filename(req, file, callback) {
        callback(null, Date.now() + "-" + file.originalname)
    },

})
userRouter.post('/profile', upload.single('file'), (req, res) => {
  console.log(req.file)
  res.send("uploude feito com sucesso")
})
export default userRouter
