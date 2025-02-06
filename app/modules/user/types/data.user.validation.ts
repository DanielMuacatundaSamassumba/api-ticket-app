import { z } from 'zod'

const datauservalidation = z.object({
    name: z.string().nonempty(),
    email: z.string().email().nonempty(),
    phone_number: z.number().min(9),
    password: z.string().nonempty(),
    roles:z.string().nonempty()
})

export default datauservalidation    