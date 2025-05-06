import { client } from "@/main";
import userStore from "../ZustandStores/userStore";

import { GET_USER_BY_ID } from "./user.getById";

export async function handleUser(id: any) {
  console.log("userId:", id);
  try {
    const { data } = await client.query({
      query: GET_USER_BY_ID,
      variables: { id },
    });
    userStore.getState().setUser({
      id: data.getUserById.id as string,
      username: data.getUserById.username as string,
      email: data.getUserById.email as string,
      role: data.getUserById.role as string,
      avatar: data.getUserById.avatar as string,
      isLogged: true,
    });

    localStorage.setItem("userId", data.getUserById.id);
    console.log("user local storage:", localStorage.getItem("userId"));
  } catch (error) {
    console.error("Error getting user from token:", error);
  }
}
