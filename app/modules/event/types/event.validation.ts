import z, { array } from "zod";

const Eventvalidation = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    localization: z.string().nonempty(),
    cover_image:  z.string().nonempty(),  
    others_images:z.string().nonempty(),
    status: z.string().nonempty(),
    category_id: z.number(),
    authorId:     z.number()
})
  
 