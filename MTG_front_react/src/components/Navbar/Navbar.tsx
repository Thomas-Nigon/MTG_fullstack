"use client";
import styles from "./Navbar.module.css";
import { useContext, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { IoLogInOutline } from "react-icons/io5";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

//import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
//import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
//import { getUserFromCookie } from "@/lib/getUserFromCookie";

import { useTheme } from "../../contexts/Theme-proviter";
import { clearUser } from "@/lib/clearUser";
import { UserContext } from "@/contexts/UserContext";

export default function Navbar() {
  const { setTheme } = useTheme();
  const { user, setUser } = useContext(UserContext);
  //const currentRoute = useLocation();
  const navigate = useNavigate();

  useEffect(() => {}, [user, setUser]);

  const handleLogOut = () => {
    clearUser();
    setUser({
      ...user,
      name: "",
      email: "",
      role: "",
      isLogged: false,
    });
    navigate("/login");
  };

  return (
    <nav className={styles.navbar}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        <h1 className={styles.navbar__title}> Magic Deck builder</h1>
      </NavLink>
      <article className={styles.navbar__links}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Home
        </NavLink>

        {user.isLogged ? (
          <NavLink to={`/users/${user.id}`}>
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </NavLink>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
        <NavLink
          to="/browse"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          Browse
        </NavLink>
        {user.role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Admin
          </NavLink>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user.isLogged && (
          <button onClick={handleLogOut}>
            <IoLogInOutline size={32} />
          </button>
        )}
        {/*         <TbLayoutSidebarLeftCollapse size={24} />
        <TbLayoutSidebarLeftExpand size={24} /> */}
      </article>
    </nav>
  );
}
