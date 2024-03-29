import React from 'react';
import { Card, Button } from '../index';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import courseImage from '../../../public/course-image.png';

import styles from './CardCourse.module.scss';

const CardCourse = ({ course, student }) => {
    const t = useTranslations('cardCourse');

    const loaderProp = ({ src }) => {
        return src;
    };
    const foto =
        course.image?.length > 0 ? (
            <Image
                src={`${process.env.APP_REACT_MEET_UP}/coursesImages/${course.image}`}
                alt={course.title}
                layout='fill'
                objectFit='cover'
                objectPosition='50% 50%'
                quality={100}
                loader={loaderProp}
            />
        ) : (
            <Image
                src={courseImage}
                alt={course.title}
                priority
                layout='fill'
                objectFit='cover'
                objectPosition='50% 50%'
                quality={100}
                loader={loaderProp}
            />
        );

    return (
        <Card styleClass='mb-4 pb-0'>
            <div className={`d-flex ${styles.cardCourse}`}>
                <div className={`col-12 col-md-4 ${styles.image}`}>{foto}</div>
                <div className='col-12 col-md-8 p-4'>
                    <h3 className={styles.title}>{course.title}</h3>
                    <p className={styles.text}>{course.description}</p>
                    <div className='d-flex justify-content-end w-100 border-top mt-3'>
                        {student === true ? (
                            <Button
                                path={{
                                    pathname: '/my-courses/[courseId]',
                                    query: { courseId: course.course_id },
                                }}
                                asLink
                                buttonType='blue_small'
                                className='mt-3'
                                text={t('button')}
                            ></Button>
                        ) : (
                            <Button
                                path={{
                                    pathname: '/all-courses/[courseId]',
                                    query: { courseId: course.course_id },
                                }}
                                asLink
                                buttonType='blue_small'
                                className='mt-3'
                                text={t('button')}
                            ></Button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default CardCourse;
