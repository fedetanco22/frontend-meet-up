import {createContext, useContext, useState, useEffect} from "react";

const AppContext = createContext();
const useAppContext = () => useContext(AppContext);

export const AppProvider = ({children}) => {
  const storage = () => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem("user"));
    }else{
      return null
    }
  };
  const [user, setUser] = useState(storage);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default useAppContext;
