import { getCurrentUser } from "@/lib/appwrite/apis";
import { IContext, IUser } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
  followed: [],
  following: [],
  conversations: [],
  imageId: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

const AuthContext = createContext<IContext>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthUser = async () => {
    try {
      setIsLoading(true);
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        const {
          $id,
          name,
          username,
          email,
          imageUrl,
          bio,
          followed,
          following,
          conversations,
          imageId,
        } = currentAccount;
        setUser({
          id: $id,
          name,
          username,
          email,
          imageUrl,
          bio,
          followed,
          following,
          conversations,
          imageId,
        });
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      setIsAuthenticated(false);
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    )
      navigate("/sign-in");

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
