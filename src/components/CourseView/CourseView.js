import router from 'next/router';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Button, Schedule, Module, Loading } from '../../components';
import useAppContext from '../../context/useAppContext';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { FaTrashAlt, FaPencilAlt } from 'react-icons/fa';
import styles from './CourseView.module.scss';

const CourseView = ({ course, student }) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleShow = () => {
        setShow(true);
    };
    const deleteCourse = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const url = `${process.env.APP_REACT_MEET_UP}/courses/` + course.course.course_id;
        try {
            const res = await axios.delete(`${url}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (res.status === 200) {
                router.push('/all-courses');
            }
        } catch (error) {
            if (error.response.status === 403) {
                endSesion();
                setUser(null);
            }
            console.log(error);
        }
    };
    const t = useTranslations('courseView');
    const { user, endSesion } = useAppContext();
    return (
        <Card styleClass='px-3'>
            {isLoading && <Loading />}
            <div className='d-flex flex-wrap border-bottom'>
                <div className='col-12 col-md p-4 my-3'>
                    <h3 className={styles.title}>{course.course?.title}</h3>
                    <p>
                        {t('level')}: {course.course?.level}
                    </p>
                    <p>
                        {t('duration')}: {course.course?.duration}
                    </p>
                    <p className={styles.text}>{course.course?.description}</p>
                </div>
                {user?.data?.role === 'Administrator' || user?.data?.role_id === 1 ? (
                    <div className='col-12 col-md-4 col-lg-3 col-xxl-2 d-flex flex-column align-items-stretch my-3 p-3'>
                        <Button
                            path={{
                                pathname: '/edit-course/[courseId]',
                                query: { courseId: course.course?.course_id },
                            }}
                            buttonType='light'
                            className='mt-1'
                            asLink
                            text={t('editCourse')}
                        >
                            <FaPencilAlt />
                        </Button>
                        <Button
                            path={'./course-edit'}
                            buttonType='light'
                            className='mt-1'
                            asSubmit
                            callback={handleShow}
                            text={t('deleteCourse')}
                        >
                            <FaTrashAlt />
                        </Button>
                    </div>
                ) : null}
                {user?.data?.role === 'Teacher' || user?.data?.role_id === 2 ? (
                    <div className='col-12 col-md-4 col-lg-3 col-xxl-2 d-flex flex-column align-items-stretch my-3 p-3'>
                        <Button
                            path={{
                                pathname: '/edit-course/[courseId]',
                                query: { courseId: course.course?.course_id },
                            }}
                            buttonType='light'
                            className='mt-1'
                            asLink
                            text={t('editCourse')}
                        >
                            <FaPencilAlt />
                        </Button>
                    </div>
                ) : null}
            </div>
            <Schedule schedules={course.schedules} role={user?.data?.role_id} />
            {/* <Module modules={course.modules} /> */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('modal.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {t('modal.text1')} {t('modal.text2')}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        text={t('modal.cancel')}
                        buttonType={'white_secondary'}
                        callback={handleClose}
                        asSubmit
                    ></Button>
                    <Button
                        text={t('modal.delete')}
                        buttonType={'light'}
                        callback={deleteCourse}
                        asSubmit
                    >
                        <FaTrashAlt />
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    );
};

export default CourseView;
