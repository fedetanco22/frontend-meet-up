import Image from "next/image"
import styles from "./Banner.module.scss"

const Banner = ({image, altText}) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={image}
        alt={altText}
        layout="fill"
        objectFit="cover"
        objectPosition="50% 0%"
        quality={100}
      />
    </div>
  )
}

export default Banner
