import Image from 'next/image'
import {Button} from '../index';
import styles from './Course.module.scss';

const Course = ({course}) => {
  const {id, title, description, url, image} = course;
  return (
    <div className='col-12 col-sm-6 col-md-4'>
      <div className={`${styles.course}  `} >
        <div style={{width:'100%'}}>
          <Image src={image} alt="" 
            width={580}
            height={377}
            objectFit="cover"
            quality={100}
          />
        </div>
        <div className={styles.text}>
          <h6>for students</h6>
          <h5 className={styles.text__title}>{title}</h5>
          <p className={styles.text__description}>{description}</p>
        </div>
       <div className='text-end px-4'>
        <Button
          text='Enroll' 
          linkAsButton
          path={'/enroll'}
          buttonType='blue_small'
          />
       </div>
        <a href={url}>{url}</a>
      </div>
    </div>
  )
}

export default Course
