import {FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn} from "react-icons/fa";
import Link from "next/link";
import styles from "./SocialMediaLinks.module.scss";

const SocialMediaLinks = () => {
  return (
    <div className={styles.socialMedia}>
      <Link href='https://www.facebook.com/'>
        <a><FaFacebookF /></a>
      </Link>
      <Link href='https://www.facebook.com/'>
        <a><FaInstagram /></a>
      </Link>
      <Link href='https://www.facebook.com/'>
        <a><FaTwitter /></a>
      </Link>
      <Link href='https://www.facebook.com/'>
        <a><FaLinkedinIn /></a>
      </Link>
    </div>
  );
};

export default SocialMediaLinks;
