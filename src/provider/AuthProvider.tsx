"use client";

import { axiosInstance } from "@/app/utils/axios";
import { IUser } from "@/types/user.interface";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  user: Partial<IUser> | null;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  setUser: (user: Partial<IUser> | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Partial<IUser> | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      setLoading(true);
      const result = await axiosInstance("/auth/me");
      console.log("result", result);
      setUser(result?.data?.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshAuth, setUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
