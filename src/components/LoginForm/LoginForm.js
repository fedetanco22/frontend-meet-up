import {useState, useEffect} from "react";
import Link from "next/link";
import {TextInput, Button, Loading} from "../index";
import axios from "axios";
import router from "next/router";
import useAppContext from "../../context/useAppContext";

import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const {user, setUser} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (user !== null) {
  //     router.push("/dashboard");
  //   }
  // }, []);

  const handleData = async () => {
    setIsLoading(true);
    const url = "http://164.92.76.51:3000/login";

    try {
      const res = await axios.post(`${url}`, {
        email: `${email}`,
        password: `${password}`,
      });
      if (res.status === 200) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/dashboard");
        setIsLoading(false);
      }
    } catch (error) {
      localStorage.setItem("user", null);
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleData();
  };

  return (
    <div className={`${styles.container} col-12 col-md-6 col-lg-5 col-xl-4 col-xxl-3`}>
      {isLoading && <Loading />}
      <div className="d-flex flex-column justify-content-center align-items-center w-100">
        <div>
          <h2 className={styles.form__title}>Welcome!</h2>
        </div>
        <form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center w-100">
          <TextInput type="email" placeholder="Email" variant="login" handleChange={handleEmailChange} classes="w-100" />
          <TextInput type="password" placeholder="Password" variant="login" handleChange={handlePasswordChange} classes="w-100" />
          <div className={styles.form__button}>
            <Button text="Log In" buttonType={"secondary"} asSubmit />
          </div>

          <div className={`${styles.checkbox} d-flex align-items-center`}>
            <input type="checkbox" name="remind-me" />
            <p>Remind me</p>
          </div>
        </form>
        <div className={styles.routes}>
          <Link href={"/register"}>
            <a className={styles.routes__link}>Sign In</a>
          </Link>
          <Link href={"/recover"}>
            <a className={styles.routes__link}>Recover password</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
