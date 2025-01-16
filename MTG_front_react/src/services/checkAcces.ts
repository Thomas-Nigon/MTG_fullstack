import { IUser } from "@/types-d";

export type AccessRule = (user: IUser) => boolean;

export const isAdmin: AccessRule = (user) => {
  if (user.role === "admin") {
    return true;
  }
  return false;
};

export const isLoggedIn: AccessRule = (user) => {
  if (user.isLogged) {
    return true;
  }
  return false;
};

export const checkAccess = (user: IUser, rule: AccessRule): boolean => {
  return rule(user);
};
