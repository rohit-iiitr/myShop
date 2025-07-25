import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, 10);
    return hashed;
  } catch (error) {
    console.log(`Error found in hashing password is ${error}`);
  }
};

export const comparePassword = async(password, hashed) => {
  return bcrypt.compare(password, hashed);
};
