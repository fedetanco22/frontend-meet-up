import Image from 'next/image'
import { Card } from ".."
import styles from './Teacher.module.scss'
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks';

const Teacher = ({teacher}) => {
  const {name, description, profilePicture} = teacher
  return (
    <div className='col-12 col-sm-6 col-md-4'>
      <Card>
        <div className={styles.content}>
          <div style={{width:'100%'}} className={styles.profile}>
            <Image src={profilePicture} alt="name" 
              width={166}
              height={166}
              objectFit="cover"
              quality={100}
            />
          </div>
          <div className="text-center mb-4">
            <h5 className={styles.text__title}>{name}</h5>
            <p className={styles.text__description}>{description}</p>
          </div>
          <SocialMediaLinks />
        </div>
      </Card>
    </div>
  )
}

export default Teacher
