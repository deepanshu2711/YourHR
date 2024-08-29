import { createContext, useContext, useState } from "react";
import { User } from "../types";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
