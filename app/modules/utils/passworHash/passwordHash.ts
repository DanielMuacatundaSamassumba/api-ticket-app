import bcrypt from "bcrypt"

async function hashpassword(password:string){
  const saltRounds = 10 
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

export default hashpassword