import { getCurrentUser } from '@/lib/appwrite/api';
import { IContextType, IUser } from '@/types';
import {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';


export const INITIAL_USER = {
    id: "",
    name: "",
    username: "",
    email: "",
    imageUrl: "",
    bio: "",
  };
  
  const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
  };

  const AuthContexts = createContext<IContextType>(INITIAL_STATE);


  export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const checkAuthUser = async () => {
      setIsLoading(true);
      try {
        const currentAccount = await getCurrentUser();
        if (currentAccount) {
          setUser({
            id: currentAccount.$id,
            name: currentAccount.name,
            username: currentAccount.username,
            email: currentAccount.email,
            imageUrl: currentAccount.imageUrl,
            bio: currentAccount.bio,
          });
          setIsAuthenticated(true);
  
          return true;
        }
  
        return false;
      } catch (error) {
        console.error(error);
        return false;
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      const cookieFallback = localStorage.getItem("cookieFallback");
    //   ||
    //     cookieFallback === null ||
    //     cookieFallback === undefined
      if (
        cookieFallback === "[]" 
      ) {
        navigate("/sign-in");
      }
  
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
  
    return <AuthContexts.Provider value={value}>{children}</AuthContexts.Provider>;
  }
  
  export const useUserContext = () => useContext(AuthContexts);