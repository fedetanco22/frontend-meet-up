import {FaFacebookF , FaInstagram, FaTwitter, FaLinkedinIn} from 'react-icons/fa'
import styles from './SocialMediaLinks.module.scss'

const SocialMediaLinks = () => {
  return (
    <div className={styles.socialMedia}>
      <FaFacebookF />
      <FaInstagram />
      <FaTwitter />
      <FaLinkedinIn />
    </div>
  )
}

export default SocialMediaLinks
