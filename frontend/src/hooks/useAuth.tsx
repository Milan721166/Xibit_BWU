import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { api } from "../config/api";

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  user:object | null;
  role:string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const [user,setuser]=useState<object | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [role,setrole]=useState<'user'|'admin'|'teacher'>('user');

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken)
    }
 
  }, [user]);
  const fetchUser=async(token:string)=>{
    try {
        const res=await axios.get(api+'userRoutes/refresh',{
            headers:{
                Authorization:"Bearer "+token
            }
        });
        if(res.status==200){
            setuser(res.data.user);
            sessionStorage.setItem('token',res.data.token);
            setrole(res.data.user.role);
        }
    } catch (error) {
        setuser(null);
        console.log(error)
    }

  }
  const login = (newToken: string) => {
    setToken(newToken);
    sessionStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout,user,role }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Example of using the token in an API call

