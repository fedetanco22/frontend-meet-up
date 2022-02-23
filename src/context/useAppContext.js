import {createContext, useContext, useState} from "react";
import router from "next/router";
import axios from "axios";

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
  const getUser =  async () => {
    const url = "http://164.92.76.51:3000/user/" + user?.data?.user_id;
      try {
        const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
        setUser({message: "OK", data: res.data.data[0], token: user?.token});
        localStorage.setItem("user", JSON.stringify({message: "OK", data: res.data.data[0], token: user?.token}));
      } catch (error) {
        localStorage.setItem("user", null);
        console.log('error: ', error)
        router.push("/");
      }
      return user
  };
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        getUser
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default useAppContext;
