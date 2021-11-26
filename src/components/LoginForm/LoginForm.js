import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TextInput } from '../index'
import axios from 'axios'
import styles from './LoginForm.module.scss'


const LoginForm = () => {
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null)

  const handleData = async() => {
    const url = 'http://164.92.76.51:3000/login'

   try {
      const res = await axios.post(`${url}`, {
        "email": `${email}`,
        "password": `${password}`
      })
      console.log(res)
    }
    catch(error){
      console.log(error)
    }
  }

  const handleEmailChange = (value) => {
    setEmail(value)
  }

  const handlePasswordChange = (value) => {
    setPassword(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    handleData()
  }

  return (
    <div className={styles.container}>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <div>  
          <h2 className={styles.form__title}>Welcome!</h2>
        </div>
        <form onSubmit={handleSubmit} className='d-flex flex-column justify-content-center align-items-center'>
          <TextInput type="email" placeholder="Email" handleChange={handleEmailChange}/>
          <TextInput type="password" placeholder="Password" handleChange={handlePasswordChange}/>
          <div className={styles.form__button}>
            <button className='button-secondary'>Log In</button>
          </div>
          <div className={`${styles.checkbox} d-flex align-items-center`}>
            <input type="checkbox" name="remind-me" />
            <p>Remind me</p>
          </div>
        </form >
        <div>
          <Link href={"/register"}>
            <a>Sign In</a>
          </Link>
          <span> | </span>
          <Link href={"/"}>
            <a>Recover password</a>
          </Link>
        </div>
      </div>   
    </div>
  )
}

export default LoginForm

