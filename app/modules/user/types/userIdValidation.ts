import { z } from "zod"

const userIdValidation = z.object({
     id:z.number().min(1)
})

export default userIdValidation