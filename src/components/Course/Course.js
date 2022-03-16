import Image from 'next/image';
import { Button, Card } from '../index';
import { useTranslations } from 'next-intl';
import styles from './Course.module.scss';
import { useRouter } from 'next/router';

const Course = ({ course }) => {
    const { query } = useRouter();
    const t = useTranslations('coursesList');
    const { title, description, level, image, duration, price, course_id } = course;

    return (
        <div className='col-12 col-sm-6 col-md-4'>
            <Card>
                <div style={{ width: '100%' }}>
                    {/* <Image
                        src={image}
                        alt=''
                        width={580}
                        height={377}
                        objectFit='cover'
                        quality={100}
                    /> */}
                </div>
                <div className={styles.text}>
                    <h6>for students</h6>
                    <h5 className={styles.text__title}>{title}</h5>
                    <p className={styles.text__description}>{description}</p>
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
