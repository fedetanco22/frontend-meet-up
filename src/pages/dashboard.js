import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import axios from 'axios';
import router from 'next/router';
import { LayoutPanel, TitlePanel, Card, Button, IconButton, Loading } from '../components';
import useAppContext from '../context/useAppContext';
import Image from 'next/image';
import avatar from '../../public/avatar.jpg';
import { FaLaptop, FaShoppingCart, FaUsers, FaPencilAlt } from 'react-icons/fa';

import styles from '../styles/Dashboard.module.scss';

const Dashboard = () => {
    const t = useTranslations('dashboard');
    const { user, setUser, getUser, endSesion } = useAppContext();
    const [users, setUsers] = useState([]);
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user !== null) {
            // getUser()
            getUsers();
            getCourses();
            getSales();
        } else {
            router.push('/login');
        }
    }, []);

    const getUsers = async () => {
        setIsLoading(true);
        if (user?.data?.role === 'Administrator') {
            const url = `${process.env.APP_REACT_MEET_UP}/users`;
            try {
                const res = await axios.get(`${url}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                if (res.status === 200) {
                    setUsers(res.data?.data);
                    setUsersFilters(res.data?.data);
                    setIsLoading(false);
                }
            } catch (error) {
                if (error.response?.status === 403) {
                    endSesion();
                    setUser(null);
                }
                console.log(error, 'error');
                setIsLoading(false);
            }
        }
    };
    const getCourses = async () => {
        setIsLoading(true);
        const url = '';
        if (user?.data?.role === 'Student') {
            url = `${process.env.APP_REACT_MEET_UP}/students/inscriptions`;
        } else if (user?.data?.role === 'Teacher') {
            url = `${process.env.APP_REACT_MEET_UP}/teacher/courses`;
        }

        try {
            const res = await axios.get(`${url}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            if (res.status === 200) {
                setIsLoading(false);
            }
        } catch (error) {
            if (error.response?.status === 403) {
                endSesion();
                setUser(null);
            }
            console.log(error, 'error');
            setIsLoading(false);
        }
    };
    const getSales = async () => {
        setIsLoading(true);
        if (user?.data?.role === 'Administrator') {
            const url = `${process.env.APP_REACT_MEET_UP}/sales`;
            try {
                const res = await axios.get(`${url}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                });
                if (res.status === 200) {
                    setSales(res.data?.data);
                    setIsLoading(false);
                }
                setIsLoading(false);
            } catch (error) {
                if (error.response?.status === 403) {
                    endSesion();
                    setUser(null);
                }
                console.log(error, 'error');
                setIsLoading(false);
            }
        }
    };

    const foto =
        user?.data?.profile_image?.length > 0 ? (
            <Image
                src={`${process.env.APP_REACT_MEET_UP}/userImages/${user?.data?.profile_image}`}
                alt='idioma'
                width={130}
                height={130}
            />
        ) : (
            <Image src={avatar} alt='idioma' priority />
        );

    return (
        <LayoutPanel pageTitle={t('title')}>
            {isLoading && <Loading />}
            <TitlePanel title={t('title')} />
            <Card>
                <div className='d-flex justify-content-end pt-3 pe-3'>
                    <IconButton path={t('buttonEdit')} buttonType='blue'>
                        <FaPencilAlt />
                    </IconButton>
                </div>
                <div className='d-flex p-3 pt-0 position-relative'>
                    <div className='me-3'>
                        <div className={`ms-3 ${styles.avatar}`}>{foto}</div>
                    </div>
                    <div className={styles.user}>
                        {user?.data?.role_id === 1 && <small>Admin</small>}
                        {user?.data?.role_id === 2 && <small>{t('roleTeacher')}</small>}
                        {user?.data?.role_id === 3 && <small>{t('roleStudent')}</small>}
                        <h4 className={styles.cardTitle}>
                            {user?.data?.name} {user?.data?.last_name}{' '}
                        </h4>
                        <p>{user?.data?.email}</p>
                        <p>{user?.data?.phone}</p>
                    </div>
                </div>
            </Card>

            {user?.data?.role_id === 1 && (
                <div className='d-flex flex-wrap pt-3'>
                    <div className='col-12 col-md-6 pe-md-2'>
                        <Card>
                            <div className={styles.cardDashboard}>
                                <h4 className={styles.cardTitle}>{t('salesCard.title')}</h4>
                                <div className={styles.iconBox}>
                                    <div className={`${styles.cardIcon} text-primary`}>
                                        <FaShoppingCart />
                                    </div>
                                    <div className='ps-3'>
                                        <p className={styles.number}>{sales?.length}</p>
                                        <p className={styles.period}>{t('salesCard.period')}</p>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <Button
                                        path={t('salesCard.button.url')}
                                        text={t('salesCard.button.text')}
                                        asLink
                                        buttonType={'transparent'}
                                        className='ms-lg-5'
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className='col-12 col-md-6 ps-md-2 pt-3 pt-md-0'>
                        <Card>
                            <div className={styles.cardDashboard}>
                                <h4 className={styles.cardTitle}>{t('usersCard.title')}</h4>
                                <div className={styles.iconBox}>
                                    <div className={`${styles.cardIcon} text-orange`}>
                                        <FaUsers />
                                    </div>
                                    <div className='ps-3'>
                                        <p className={styles.number}>{users.length}</p>
                                        <p className={styles.period}>{t('usersCard.period')}</p>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-end'>
                                    <Button
                                        path={t('usersCard.button.url')}
                                        text={t('usersCard.button.text')}
                                        asLink
                                        buttonType={'transparent'}
                                        className='ms-lg-5'
                                    />
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            )}
            {/* {user?.data?.role_id !== 1 && (
          <div className="d-flex flex-wrap pt-3">
            <div className="col-12 col-md-6 pe-md-2 ">
              <Card>
                <div className={styles.cardDashboard}>
                  <h4 className={styles.cardTitle}>{t("card1")}</h4>
                  <div className={styles.empty}>
                    <div className={styles.emptyBox}>
                      <span></span>
                      <FaLaptop />
                    </div>
                    <h5>{t("emptyCourse")}</h5>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 col-md-6 ps-md-2 pt-3 pt-md-0">
              <Card>
                <div className={styles.cardDashboard}>
                  <h4 className={styles.cardTitle}>{t("card2")}</h4>
                  <div className={styles.empty}>
                    <div className={styles.emptyBox}>
                      <span></span>
                      <FaLaptop />
                    </div>
                    <h5>{t("emptyCourse")}</h5>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )} */}
        </LayoutPanel>
    );
};

export default Dashboard;

export function getStaticProps({ locale }) {
    return {
        props: {
            // You can get the messages from anywhere you like, but the recommended
            // pattern is to put them in JSON files separated by language and read
            // the desired one based on the `locale` received from Next.js.
            messages: require(`../lang/${locale}.json`),
        },
    };
}
