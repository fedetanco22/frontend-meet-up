import {
  Button,
  Card,
  ColorBanner,
  Contact,
  CourseSchedule,
  Layout,
} from '../../components/index';

import Image from 'next/image';
import Moment from 'react-moment';
import courseImage from '../../../public/course-image.png';
import styles from './course.module.scss';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const Course = ({ courses }) => {
  const [course, setCourse] = useState();
  const t = useTranslations('courses');

  const { image, title, description, price, duration, slug, level } =
    courses.course;
  console.log('courses.modules', courses.modules, courses.schedules);
  const coursePicture = (
    <Image
      className={styles.image}
      src={
        image?.length > 0
          ? `http://164.92.76.51:3000/coursesImages/${image}`
          : courseImage
      }
      alt={title}
      layout='fill'
      objectFit='cover'
      quality={100}
    />
  );

  const scheduleModality = courses?.schedules?.map((schedule, idx) => {
    return <CourseSchedule key={idx} schedule={schedule} />;
  });

  return (
    <Layout pageTitle={t('title')}>
      <div className={styles.imageWrapper}>{coursePicture}</div>

      <div className={`container py-5 ${styles.container}`}>
        <div className='row'>
          <div className='col-12 col-md-8'>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.textBody}>
              <h3>{t('titleC')}</h3>
              <p>{t('descriptionC')}</p>
            </div>

            <div className={styles.textBody}></div>
          </div>

          <Card className={`${styles.value} col-12 col-md-4 `}>
            <div className={styles.value__title}>
              <h3>For {level}</h3>
            </div>

            <div className={styles.value__text}>
              <div className={styles.value__text__title}>
                <h6>Schedule</h6>
                {scheduleModality}
              </div>

              <div className={styles.value__text__title}>
                <h6>Material Includes</h6>
              </div>
            </div>

            <div className={styles.enroll}>
              <span className={styles.enroll__price}>
                $ <span className={styles.enroll__price__number}>{price}</span>{' '}
                ARS
              </span>

              <Button
                text={'Enroll'}
                linkAsButton
                path={`/courses/`}
                buttonType='blue_small'
              />
            </div>
          </Card>
        </div>
      </div>

      <ColorBanner
        backgroundColor={'secondary'}
        title={t('bannerColor.title')}
        description={t('bannerColor.description')}
        btnText={t('bannerColor.button')}
        buttonLink={'/test'}
        icon
      />
      <Contact />
    </Layout>
  );
};

export default Course;

export async function getServerSideProps({ locale, query }) {
  const res = await fetch(
    `http://164.92.76.51:3000/${locale}/courses/${query.courseId}`
  );
  const jsonCourse = await res.json();
  const courses = jsonCourse.data;
  return {
    props: {
      courses,
      messages: require(`../../lang/${locale}.json`),
    },
  };
}
