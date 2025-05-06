import { client } from "@/main";
import userStore from "../ZustandStores/userStore";
import { LOGOUT_MUTATION } from "./user.logout";

export async function clearUser() {
  console.log("clearing user");
  localStorage.removeItem("userId");
  userStore.getState().setUser({
    id: "",
    username: "",
    email: "",
    role: "",
    isLogged: false,
    avatar: "",
  });
  client.query({ query: LOGOUT_MUTATION });

  return null;
}
