import Image from 'next/image';
import { Button, Card } from '../index';
import { useTranslations } from 'next-intl';
import styles from './Course.module.scss';
import { useRouter } from 'next/router';
import courseImage from '../../../public/course-image.png';
import classNames from 'classnames';

const Course = ({ course }) => {
    const { query } = useRouter();
    const t = useTranslations('coursesList');
    const { title, description, level, image, duration, price, course_id } = course;

    const coursePicture = (
        <Image
            className={styles.image}
            src={
                image?.length > 0 ? `http://164.92.76.51:3000/coursesImages/${image}` : courseImage
            }
            alt={course.title}
            width={580}
            height={377}
            objectFit='cover'
            quality={100}
        />
    );

    const levelSubtitle = level.toLowerCase();

    const classes = classNames(
        {
            [styles.text__subtitle__pink]: levelSubtitle === 'beginners',
            [styles.text__subtitle__green]: levelSubtitle === 'intermediates',
            [styles.text__subtitle__blue]: levelSubtitle === 'upper-intermediates',
        },
        levelSubtitle
    );

    return (
        <div className='col-12 col-sm-6 col-md-4 mb-4'>
            <Card styleClass="h-100">
                <div style={{ width: '100%' }}>{coursePicture}</div>
                <div className={styles.text}>
                    <h6 className={`${styles.text__subtitle} ${classes}`}>for {level} students</h6>
                    <h5 className={styles.text__title}>{title}</h5>
                    <div className={styles.text__description}>
                        <p>{description}</p>
                    </div>
                </div>
                <div className='text-end px-4'>
                    <Button
                        text={t('buttonEnroll')}
                        linkAsButton
                        path={`/courses/${course_id}`}
                        buttonType='blue_small'
                    />
                </div>
            </Card>
        </div>
    );
};

export default Course;
