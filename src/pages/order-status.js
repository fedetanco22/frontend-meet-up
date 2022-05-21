import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import useAppContext from '../context/useAppContext';
import { Button, Layout, Card, TitlePanel } from '../components';
import { useTranslations } from 'next-intl';
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle } from 'react-icons/fa';
import styles from '../styles/OrderPage.module.scss';
const OrderStatus = () => {
    const t = useTranslations('checkout');
    const { user, courseCart } = useAppContext();
    const { query } = useRouter();

    const handleData = async () => {
        const url = `${process.env.APP_REACT_MEET_UP}/payment`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    preference_id: `${query.preference_id}`,
                    payment_id: `${query.payment_id}`,
                    status: `${query.status}`,
                }),
            });
            const data = await response?.json();
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        handleData();
    }, []);

    // desp hacerlo laburar a DARI

    return (
        <Layout>
            <div className='container py-5'>
                <Card>
                    <div className='p-4 pb-0'>
                        <TitlePanel title='Estado de la compra' />
                        <div className={styles.statusIcon}>
                            {query?.status === 'approved' && (
                                <FaCheckCircle className={styles.approved} />
                            )}
                            {query?.status === 'pending' && (
                                <FaExclamationCircle className={styles.pending} />
                            )}
                            {query?.status === 'failure' && (
                                <FaTimesCircle className={styles.failure} />
                            )}
                        </div>
                        <h5 className='pt-3'>{t('subtitle')}</h5>
                        <table className='table responsive'>
                            <thead>
                                <tr>
                                    <th scope='col'>{t('table.course')}</th>
                                    <th scope='col'>{t('table.schedule')}</th>
                                    <th scope='col' className='text-end'>
                                        {t('table.status')}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{courseCart?.course.title}</td>
                                    <td>
                                        {
                                            courseCart?.schedules.filter(
                                                (i) => i.schedule_id === courseCart?.schedule_id
                                            )[0].title
                                        }
                                    </td>
                                    <td className='text-end'>{query?.status}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='d-flex justify-content-end'>
                            {query?.status === 'approved' && (
                                <Button
                                    text={t('coursesButton')}
                                    path={'/my-courses'}
                                    asLink
                                    buttonType='blue_small'
                                />
                            )}
                            {(query?.status === 'failure' || query?.status === 'pending') && (
                                <Button
                                    text={t('retryButton')}
                                    path={'/checkout'}
                                    asLink
                                    buttonType='blue_small'
                                />
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </Layout>
    );
};

export default OrderStatus;

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
