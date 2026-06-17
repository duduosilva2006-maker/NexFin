import {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

import { auth } from '../firebase';

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<boolean>;

  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<boolean>;

  logout: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children
}: any) => {
  const [user, setUser] =
    useState<User | null>(null);

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (firebaseUser) => {
          setUser(firebaseUser);
        }
      );

    return () => unsubscribe();
  }, []);

  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      return true;
    } catch {
      return false;
    }
  };

  const login = async (
    email: string,
    password: string
  ) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext)!;
};