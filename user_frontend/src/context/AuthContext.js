import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { clearToken, setToken, getToken } from '../services/storage';

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provides authentication state and actions to the app. */
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function bootstrap() {
      const token = getToken();
      if (!token) {
        setInitializing(false);
        return;
      }
      try {
        const me = await api.auth.me();
        setUser(me);
      } catch {
        clearToken();
        setUser(null);
      } finally {
        setInitializing(false);
      }
    }
    bootstrap();
  }, []);

  // PUBLIC_INTERFACE
  const login = async (email, password) => {
    /** Performs login and sets user/token. */
    const res = await api.auth.login(email, password);
    if (res?.token) setToken(res.token);
    if (res?.user) setUser(res.user);
    return res;
  };

  // PUBLIC_INTERFACE
  const register = async (name, email, password) => {
    /** Registers a new user and sets user/token. */
    const res = await api.auth.register(name, email, password);
    if (res?.token) setToken(res.token);
    if (res?.user) setUser(res.user);
    return res;
  };

  // PUBLIC_INTERFACE
  const logout = () => {
    /** Logs out the user and clears the token. */
    clearToken();
    setUser(null);
  };

  const value = useMemo(() => ({ user, initializing, login, register, logout }), [user, initializing]);

  return (
    <AuthContext.Provider value={value}>
      {!initializing && children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  /** Hook to access authentication state and actions. */
  return useContext(AuthContext);
}
