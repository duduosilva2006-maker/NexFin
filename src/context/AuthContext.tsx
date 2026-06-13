import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
  } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (user: User) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const logged = localStorage.getItem('nexfin_user_logged');
    if (logged) {
      setUser(JSON.parse(logged));
    }
  }, []);

  const register = (newUser: User) => {
    const users = JSON.parse(localStorage.getItem('nexfin_users') || '[]');

    const exists = users.find(
      (u: User) => u.email === newUser.email
    );

    if (exists) return false;

    users.push(newUser);

    localStorage.setItem(
      'nexfin_users',
      JSON.stringify(users)
    );

    return true;
  };

  const login = (email: string, password: string) => {
    const users = JSON.parse(
      localStorage.getItem('nexfin_users') || '[]'
    );

    const found = users.find(
      (u: User) =>
        u.email === email &&
        u.password === password
    );

    if (!found) return false;

    localStorage.setItem(
      'nexfin_user_logged',
      JSON.stringify(found)
    );

    setUser(found);

    return true;
  };

  const logout = () => {
    localStorage.removeItem('nexfin_user_logged');
    setUser(null);
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