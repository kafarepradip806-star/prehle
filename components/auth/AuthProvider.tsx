"use client";
import { createContext, useContext, useEffect, useState } from "react";

type AuthType = {
  token: string | null;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthType>({
  token: null,
  role: null,
  login: ()=>{},
  logout: ()=>{}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token,setToken] = useState<string | null>(null);
  const [role,setRole] = useState<string | null>(null);
  const [ready,setReady] = useState(false);

  useEffect(()=>{
    const t = localStorage.getItem("token");
    const r = localStorage.getItem("role");
    setToken(t);
    setRole(r);
    setReady(true);
  },[]);

  const login = (t:string, r:string)=>{
    localStorage.setItem("token",t);
    localStorage.setItem("role",r);
    setToken(t);
    setRole(r);
  };

  const logout = ()=>{
    localStorage.clear();
    setToken(null);
    setRole(null);
    location.href="/login";
  };

  if(!ready) return null; // prevents hydration bug

  return (
    <AuthContext.Provider value={{token,role,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = ()=> useContext(AuthContext);
