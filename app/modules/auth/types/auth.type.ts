import z from "zod";

const authtype = z.object({
    email: z.string().nonempty("campo obrigatorio").email(),
    password: z.string().nonempty("campo obrigatorio")
})
const authData = z.object({
         name: z.string(),
         email: z.string().email(),
         phone_number: z.number(),
         password: z.string(),
         roles:z.string()
})

export  {authtype, authData }