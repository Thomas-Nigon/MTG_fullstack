import { IUserContext } from "@/types-d";

export type AccessRule = (user: IUserContext) => boolean;

/* 
Same as
export const isAdmin:AccessRule=(user)=>user.role==="admin"
*/
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

export const checkAccess = (user: IUserContext, rule: AccessRule): boolean => {
  return rule(user);
};
