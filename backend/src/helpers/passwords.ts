import bcrypt from "bcrypt";
export const isMatch = async (input: string, password: string) => {
  return await bcrypt.compare(input, password);
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hashSync(password, salt);
};
