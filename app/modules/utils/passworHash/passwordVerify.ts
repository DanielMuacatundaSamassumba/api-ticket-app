import bcrypt from "bcrypt";

async function passwordVerify(password: string, passwordInServer: string) {
  const passwordCompared = await bcrypt.compare(password, passwordInServer);
  return passwordCompared;
}

export default passwordVerify;
