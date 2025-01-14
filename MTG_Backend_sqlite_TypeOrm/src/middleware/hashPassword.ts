import { NextFunction, Request, Response } from "express";
import argon2 from "argon2";
const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { password } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    req.body.password = hashedPassword;
    next();
  } catch (err) {
    console.error(err);
    throw new Error("Error hashing password");
  }
};

export default hashPassword;
