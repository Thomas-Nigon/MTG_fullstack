import { decodeJwt } from "jose";
import userStore from "./ZustandStores/userStore";

interface IUserFromToken {
  userId: string;
  username: string;
  email: string;
  role: string;
  avatar?: string | null;
}
export async function getUserFromToken(token: string) {
  console.log("token:", token);
  const loggedUser: IUserFromToken = await decodeJwt(token);
  console.log("loggedUser:", loggedUser);

  console.log("token from getUserFromCookie:", token);

  if (!token) return null;
  try {
    // set user in zustand store
    userStore.getState().setUser({
      id: loggedUser.userId,
      username: loggedUser.username,
      email: loggedUser.email,
      role: loggedUser.role,
      isLogged: true,
      avatar: loggedUser.avatar || "",
    });
  } catch (error) {
    console.error("JWT verification failed", error);
    return null;
  }
}
