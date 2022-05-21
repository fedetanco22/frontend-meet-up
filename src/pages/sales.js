import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Modal } from 'react-bootstrap';
import router from 'next/router';
import axios from 'axios';
import { LayoutPanel, TitlePanel, Card, IconButton, Loading, Button } from '../components';
import useAppContext from '../context/useAppContext';
import { FaSearchPlus, FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/Sales.module.scss';
import Moment from 'react-moment';

const Sales = () => {
    const t = useTranslations('sales');
    const { user, endSesion, setUser } = useAppContext();
    const [sales, setSales] = useState([]);
    const [salesFilters, setSalesFilters] = useState(sales);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [itemSelected, setItemSelected] = useState(null);
    const [statusSelectedState, setStatusSelectedState] = useState(0);
    let statusSelected = statusSelectedState;
    const [modalStatusState, setModalStatusState] = useState(null);
    let modalStatus = modalStatusState;
    useEffect(() => {
        if (user !== null) {
            if (user?.data?.role !== 'Administrator') {
                router.push('/dashboard');
            } else {
                getSales();
            }
        } else {
            router.push('/');
        }
    }, []);

    const handleShow = (item) => {
        setShow(true);
        setItemSelected(item);
        modalStatus = item?.status;
        setModalStatusState(modalStatus);
    };
    const handleClose = () => {
        setShow(false);
        setItemSelected(null);
    };
    const handleState = (e) => {
        changeStatus(e);
    };
    const changeStatus = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        const url =
            `${process.env.APP_REACT_MEET_UP}/payment/changeStatus/` + itemSelected?.inscription_id;
        try {
            const res = await axios.patch(
                `${url}`,
                {
                    status: `${modalStatus}`,
                },
                { headers: { Authorization: `Bearer ${user.token}` } }
            );
            if (res.status === 200) {
                setShow(false);
                getSales();
                setItemSelected(null);
                setIsLoading(false);
            }
        } catch (error) {
            if (error.response?.status === 403) {
                endSesion();
                setUser(null);
            }
            console.log(error);
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
                    setSalesFilters(res.data?.data);
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
    const handleStatus = (event) => {
        statusSelected = event.target.value;
        filterUser();
    };
    const handleStatusModal = (event) => {
        modalStatus = event.target.value;
        setModalStatusState(modalStatus);
    };
    const filterUser = () => {
        setStatusSelectedState(statusSelected);

        if (statusSelected === '0') {
            setSalesFilters(sales);
        } else {
            setSalesFilters(sales.filter((e) => e.status === statusSelected));
        }
    };
    const salesItem = salesFilters?.map((item) => {
        return (
            <tr key={item.inscription_id}>
                <td>{item.inscription_id}</td>
                <td>{item.email}</td>
                <td>{item.TitleCourse}</td>
                <td className={`${styles.status} ${item?.status}`}>{item.status}</td>
                <td className='d-flex justify-content-end'>
                    <IconButton
                        callback={() => {
                            handleShow(item);
                        }}
                        buttonType='blue'
                        className='me-2'
                        asSubmit
                    >
                        <FaSearchPlus />
                    </IconButton>
                </td>
            </tr>
        );
    });

    return (
        <LayoutPanel pageTitle={t('title')}>
            {isLoading && <Loading />}
            <div>
                <TitlePanel title={t('title')} />
                <Card>
                    <div className='p-3 pb-0'>
                        <h4 className=''>{t('list')}</h4>
                        <div className='d-flex justify-content-end flex-wrap'>
                            {/* <div className="mb-3 col-12 col-md-6 col-lg-3 col-xxl-2">
                <input type="text" className="form-control" placeholder={t("search")} />
              </div> */}
                            <div className='mb-3 col-12 col-md-6 col-lg-4 col-xxl-3 d-flex align-items-center'>
                                <p className='mb-0 ps-0 ps-md-5 pe-3'>{t('status')}</p>
                                <select
                                    onChange={handleStatus}
                                    className='form-select form-control'
                                    aria-label='Default select example'
                                >
                                    <option value='0'>{t('inputStatusAll')}</option>
                                    <option value='approved'>Approved</option>
                                    <option value='pending'>Pending</option>
                                    <option value='failure'>Failure</option>
                                </select>
                            </div>
                        </div>
                        <div className='table-responsive'>
                            <table className='table responsive'>
                                <thead>
                                    <tr>
                                        <th scope='col'>{t('table.order')}</th>
                                        <th scope='col'>{t('table.user')}</th>
                                        <th scope='col'>{t('table.product')}</th>
                                        <th scope='col'>{t('table.status')}</th>
                                        <th scope='col' className='text-end'>
                                            {t('table.actions')}
                                        </th>
                                    </tr>
                                </thead>
                                {salesFilters?.length > 0 ? (
                                    <tbody>{salesItem}</tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={5}>
                                                <div className='empty'>
                                                    <FaShoppingCart />
                                                    <p>{t('table.empty')}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                )}
                            </table>
                        </div>
                        <div className='d-flex justify-content-end'>
                            <p>Total Sales: {sales?.length}</p>
                        </div>
                    </div>
                </Card>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{t('modal.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        <b>{t('table.order')}:</b> {itemSelected?.inscription_id}
                    </p>
                    <p>
                        <b>{t('table.user')}:</b> {itemSelected?.email}
                    </p>
                    <p>
                        <b>{t('table.product')}:</b> {itemSelected?.TitleCourse}
                    </p>
                    <p>
                        <b>{t('table.schedule')}:</b> {itemSelected?.title}
                    </p>
                    <p>
                        <b>{t('table.date')}:</b>{' '}
                        <Moment format='DD/MM/YYYY' date={itemSelected?.dateGenerator} />{' '}
                    </p>
                    <p>
                        <b>{t('table.dateComplete')}:</b>{' '}
                        <Moment format='DD/MM/YYYY' date={itemSelected?.dateResponse} />
                    </p>
                    <p>
                        <b>{t('table.payment')}:</b> {itemSelected?.payment_id}
                    </p>
                    <p>
                        <b>{t('table.mercadopago')}:</b> {itemSelected?.mercpago_id}
                    </p>
                    <p>
                        <b>{t('table.status')}:</b>
                    </p>
                    <select
                        onChange={handleStatusModal}
                        value={modalStatus}
                        className='form-select form-control'
                        aria-label='Default select example'
                    >
                        <option key={0} value={'approved'}>
                            Approved
                        </option>
                        <option key={0} value={'pending'}>
                            Pending
                        </option>
                        <option key={0} value={'failure'}>
                            Failure
                        </option>
                    </select>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        text={t('modal.close')}
                        buttonType={'white_secondary'}
                        callback={handleClose}
                        asSubmit
                    ></Button>
                    {modalStatus !== itemSelected?.status && (
                        <Button
                            text={t('modal.save')}
                            buttonType={'light'}
                            callback={handleState}
                            asSubmit
                        ></Button>
                    )}
                </Modal.Footer>
            </Modal>
        </LayoutPanel>
    );
};

export default Sales;

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
