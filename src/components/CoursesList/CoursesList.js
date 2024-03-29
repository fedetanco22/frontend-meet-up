import { Course, Button, SectionTitle } from '../index';
import { useTranslations } from 'next-intl';
import styles from './CoursesList.module.scss';
import { useRouter } from 'next/router';

const CoursesList = ({ courseList }) => {
    const { pathname } = useRouter();

    const currentCourses = courseList.map((course) => (
        <Course key={course.course_id} course={course} />
    ));

    const t = useTranslations('coursesList');

    return (
        <div className={`container ${styles.container}`}>
            <SectionTitle title={t('title')} subTitle={t('subtitle')} />

            <div className={`${styles.coursesList} row justify-content-center`}>
                {currentCourses}
            </div>

            {pathname === '/' && (
                <div className='text-center '>
                    <Button
                        text={t('buttonAll.text')}
                        link='/courses'
                        buttonType='blue'
                        linkAsButton
                        path={t('buttonAll.url')}
                    />
                </div>
            )}
        </div>
    );
};

export default CoursesList;
