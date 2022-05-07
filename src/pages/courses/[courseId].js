import { useState } from 'react';
import router from 'next/router';
import Image from 'next/image';
import {
    Layout,
    Contact,
    ColorBanner,
    Card,
    CourseSchedule,
    Button,
    Module,
} from '../../components/index';
import { useTranslations } from 'next-intl';
import Moment from 'react-moment';
import courseImage from '../../../public/course-image.png';
import useAppContext from '../../context/useAppContext';

import styles from './course.module.scss';
import ErrorPage from '../404';

const Course = ({ courses }) => {
    const t = useTranslations('courseView');
    const { addCourse } = useAppContext();

    const { image, title, description, price, duration, slug, level } = courses?.course;

    const handleScheduleId = (schedule_id) => {
        addCourse(courses, schedule_id);
    };

    const coursePicture = (
        <Image
            className={styles.image}
            src={
                image?.length > 0 ? `http://164.92.76.51:3000/coursesImages/${image}` : courseImage
            }
            alt={title}
            layout='fill'
            objectFit='cover'
            objectPosition='50% 20%'
            quality={100}
        />
    );

    const scheduleModality = courses?.schedules?.map((schedule) => {
        return (
            <CourseSchedule
                key={schedule.id}
                schedule={schedule}
                textButton={t('button')}
                selectSchedule={handleScheduleId}
            />
        );
    });

    const moduleCourses = <Module modules={courses.modules} />;

    return (
        <Layout pageTitle={t('title')}>
            <div className={styles.imageWrapper}>{coursePicture}</div>
            <div className={`container py-5 px-5 px-md-0 ${styles.container}`}>
                <div className='row'>
                    <div className='col-12 col-md-8'>
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.textBody}>
                            <h3>About Course</h3>
                            <p>{description}</p>
                        </div>
                        <div className={styles.textBody}></div>
                    </div>

                    <Card className={`${styles.value} col-12 col-md-4 `}>
                        <div className={styles.value__title}>
                            {level ? <h3>{level}</h3> : ''}
                        </div>
                        <div className={styles.value__text}>
                            <div className={styles.value__text__title}>
                                <h6>Schedule</h6>
                                {scheduleModality}
                            </div>
                        </div>

                        <div className={styles.enroll}>
                            <span className={styles.enroll__price}>
                                $ <span className={styles.enroll__price__number}>{price}</span> ARS
                            </span>
                        </div>
                    </Card>
                </div>
                {/* <div className='row'>
                    <div className='col-8'>{moduleCourses}</div>
                </div> */}
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
    const res = await fetch(`http://164.92.76.51:3000/${locale}/courses/${query.courseId}`);
    const jsonCourse = await res.json();
    const courses = jsonCourse.data;
    return {
        props: {
            courses,
            messages: require(`../../lang/${locale}.json`),
        },
    };
}
