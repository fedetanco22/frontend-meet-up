import { LoginForm, Logo, SocialMediaLinks } from '../components'
import styles from '../styles/Login.module.scss'

const Login = () => {
  return (
    <div className={`${styles.login} d-flex flex-column justify-content-evenly align-items-center`}>
      <Logo width="171" height="61"/>
      <LoginForm />
      <SocialMediaLinks />
    </div>
  )
}

export default Login


export async function getServerSideProps(context) {
  return {
    props: {}, // Will be passed to the page component as props
  }
}