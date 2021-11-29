import { createContext, useContext, useState, useEffect } from "react";
import {useSessionStorage} from "../hooks/useSessionStorage";


const AppContext = createContext();
const useAppContext = () => useContext(AppContext);


export const AppProvider = ({ children }) => {
const [user, setUser] = useSessionStorage('user' , {})
const userSession = (userdata) => {
  localStorage.setItem('user', userdata);
}
  return (
    <AppContext.Provider value={{
      user, 
      setUser,
      userSession 
    }}>
      {children}
    </AppContext.Provider>
  );
}

export default useAppContext;