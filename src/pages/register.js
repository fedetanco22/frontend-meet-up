import { RegisterForm, Logo, SocialMediaLinks } from '../components'
import styles from '../styles/Login.module.scss'

const SignIn = () => {
  return (
    <div className={`${styles.login} d-flex flex-column justify-content-evenly align-items-center`}>
      <Logo width="171" height="61"/>
      <RegisterForm />
      <SocialMediaLinks />
    </div>
  )
}

export default SignIn


export async function getServerSideProps(context) {
  return {
    props: {}, // Will be passed to the page component as props
  }
}