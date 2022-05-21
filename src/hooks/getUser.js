// import React from "react";
// import axios from "axios";
// import useAppContext from "../context/useAppContext";


// export function  getUser() {
//   const {user, setUser} = useAppContext();
//   const url = "http://164.92.76.51:3000/user/" + user?.data?.user_id;

//   try {
//     const res = axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
//     setUser({message: "OK", data: res.data.data[0], token: user?.token});
//     localStorage.setItem("user", JSON.stringify({message: "OK", data: res.data.data[0], token: user?.token}));
//     console.log(user, "nuevo usuario");
//   } catch (error) {
//     localStorage.setItem("user", null);
//     router.push("/");
//   }
//   return user
  
// }

