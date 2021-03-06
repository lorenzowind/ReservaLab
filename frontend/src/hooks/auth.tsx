import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

export interface User {
  id: string;
  ra: string;
  name: string;
  email: string;
  position: 'teacher' | 'admin';
  subjects: string;
  avatar_url: string;
}

interface SignInCredentials {
  ra: string;
  password: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface AuthContextData {
  token: string;
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ReservaLab:token');
    const user = localStorage.getItem('@ReservaLab:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ ra, password }) => {
    const response = await api.post<AuthState>('sessions', {
      ra,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@ReservaLab:token', token);
    localStorage.setItem('@ReservaLab:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ReservaLab:token');
    localStorage.removeItem('@ReservaLab:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@ReservaLab:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
