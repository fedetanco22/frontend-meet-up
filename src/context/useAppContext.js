import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
const [user, setUser] = useState('user initial probando')
  return (
    <AppContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default useAppContext;