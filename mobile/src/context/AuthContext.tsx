import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthState {
  phone: string | null;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (phone: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const PHONE_KEY = 'user_phone';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({ phone: null, isAuthenticated: false });

  useEffect(() => {
    (async () => {
      const storedPhone = await SecureStore.getItemAsync(PHONE_KEY);
      if (storedPhone) {
        setState({ phone: storedPhone, isAuthenticated: true });
      }
    })();
  }, []);

  const login = async (phone: string) => {
    await SecureStore.setItemAsync(PHONE_KEY, phone);
    setState({ phone, isAuthenticated: true });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(PHONE_KEY);
    setState({ phone: null, isAuthenticated: false });
  };

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
