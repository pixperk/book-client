"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface UserContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading : boolean;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("book-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const token = localStorage.getItem("book-token");
    if (token) {
      try {
        console.log("token:", token);
        const details: { id: string; role: string } = jwtDecode(token);
        console.log(details);

        const isUserAdmin = details.role === "admin";
        setIsAdmin(isUserAdmin);

        localStorage.setItem("book-user-role", details.role);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
    setIsLoading(false)
  }, []);

  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("book-user", JSON.stringify(userData));
    localStorage.setItem("book-token", userData.token);

    try {
      const details: { id: string; role: string } = jwtDecode(userData.token);
      const isUserAdmin = details.role === "admin";
      setIsAdmin(isUserAdmin);
      localStorage.setItem("book-user-role", details.role);
    } catch (error) {
      console.error("Invalid token during login:", error);
    }
  };

  const logoutUser = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("book-user");
    localStorage.removeItem("book-token");
    localStorage.removeItem("book-user-role");
    navigate("/");
    toast.success("Logged Out! Come back later...")
  };

  return (
    <UserContext.Provider value={{ user, isAdmin, loginUser, logoutUser,isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
