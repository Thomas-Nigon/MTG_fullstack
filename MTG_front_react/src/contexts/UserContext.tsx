import { createContext, useState } from "react";
import { IUserContext, IUserContextType } from "../types-d";

const defaultUser: IUserContext = {
  id: "",
  name: "",
  email: "",
  role: "user",
  isLogged: false,
  avatar: "",
};

export const UserContext = createContext<IUserContextType>({
  user: defaultUser,
  defaultUser: defaultUser,
  setUser: () => {},
});
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser, defaultUser }}>
      {children}
    </UserContext.Provider>
  );
}
