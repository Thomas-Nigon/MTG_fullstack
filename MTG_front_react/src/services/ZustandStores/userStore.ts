import { IUser } from "@/types-d";
import { create } from "zustand";

interface UserState {
  user: IUser | null;
  setUser: (state: IUser) => void;
}

//const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
const userStore = create<UserState>((set) => ({
  user: {
    id: "",
    username: "",
    email: "",
    role: "",
    isLogged: false,
    avatar: "",
  },
  setUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
}));

export default userStore;
