import bcrypt from "bcrypt";

export const hashPassword = (password: string) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    return hashedPassword;
};

export const checkPassword = (bodyPassword: string, storedPassword: string) => {
    const compareResult = bcrypt.compareSync(bodyPassword, storedPassword);
    return compareResult;
};