import { useEffect, useState } from 'react';
import useAppContext from '../../context/useAppContext';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Loading } from '..';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
    FaUsers,
    FaRegBell,
    FaShoppingCart,
    FaPause,
    FaLaptop,
    FaCog,
    FaDoorOpen,
} from 'react-icons/fa';
import Image from 'next/image';
import flagEn from '../../../public/en.png';
import flagEs from '../../../public/ar.png';
import avatar from '../../../public/avatar.jpg';

import styles from './NavbarPanel.module.scss';

const NavbarPanel = ({ handleMenu, open }) => {
    const t = useTranslations('navpanel');
    const { user, setUser, getUser } = useAppContext();
    const router = useRouter();
    const { locale, pathname, query } = router;
    const [imgLan, setImgLan] = useState(flagEs);
    const [activeStyle, setActiveStyle] = useState(styles.false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        locale === 'en' ? setImgLan(flagEn) : setImgLan(flagEs);
        open ? setActiveStyle(styles.true) : setActiveStyle(styles.false);
    }, [open, locale]);

    const handleLangChange = (e) => {
        const locale = e.target.value;
        router.push(pathname, (query.userId, query.courseId, query.scheduleId), { locale });
        locale === 'en' ? setImgLan(flagEn) : setImgLan(flagEs);
    };

    const loaderProp = ({ src }) => {
        return src;
    };

    const foto =
        user?.data?.profile_image?.length > 0 ? (
            <Image
                src={`${process.env.APP_REACT_MEET_UP}/userImages/${user?.data?.profile_image}`}
                alt='idioma'
                width={30}
                height={30}
                loader={loaderProp}
            />
        ) : (
            <Image src={avatar} alt='idioma' priority loader={loaderProp} />
        );

    const exit = () => {
        setIsLoading(true);
        setUser(null);
        router.push('/');
    };

    return (
        <>
            {isLoading && <Loading />}
            <div className={styles.headerLine}>
                <div>&nbsp;</div>
            </div>
            <div className={`d-flex ${styles.menu} ${activeStyle}`}>
                <Link href={t('dashboard.link')}>
                    <a
                        className={`${styles.link} ${
                            pathname === '/dashboard' ? styles.active : false
                        }`}
                    >
                        <FaPause className={styles.icon} />
                        {t('dashboard.title')}
                    </a>
                </Link>
                {user?.data?.role !== 'Administrator' || user?.data?.role_id !== 1 ? (
                    <Link href={t('mycourses.link')}>
                        <a
                            className={`${styles.link} ${
                                pathname === '/my-courses' ? styles.active : false
                            }`}
                        >
                            <FaLaptop className={styles.icon} />
                            {t('mycourses.title')}
                        </a>
                    </Link>
                ) : null}
                {user?.data?.role === 'Administrator' || user?.data?.role_id === 1 ? (
                    <Link href={t('all-courses.link')}>
                        <a
                            className={`${styles.link} ${
                                pathname === '/all-courses' ? styles.active : false
                            }`}
                        >
                            <FaLaptop className={styles.icon} />
                            {t('all-courses.title')}
                        </a>
                    </Link>
                ) : null}
                {user?.data?.role === 'Administrator' || user?.data?.role_id === 1 ? (
                    <Link href={t('users.link')}>
                        <a
                            className={`${styles.link} ${
                                pathname === '/users' ? styles.active : false
                            }`}
                        >
                            <FaUsers className={styles.icon} />
                            {t('users.title')}
                        </a>
                    </Link>
                ) : null}
                {user?.data?.role === 'Administrator' || user?.data?.role_id === 1 ? (
                    <Link href={t('sales.link')}>
                        <a
                            className={`${styles.link} ${
                                pathname === '/sales' ? styles.active : false
                            }`}
                        >
                            <FaShoppingCart className={styles.icon} />
                            {t('sales.title')}
                        </a>
                    </Link>
                ) : null}

                <Link href={t('setup.link')}>
                    <a
                        className={`${styles.link} ${
                            pathname === '/setup' ? styles.active : false
                        }`}
                    >
                        {' '}
                        <FaCog className={styles.icon} />
                        {t('setup.title')}
                    </a>
                </Link>
                <button className={`${styles.link}`} onClick={exit}>
                    <FaDoorOpen className={styles.icon} />
                    {t('close')}
                </button>
            </div>
            <div className={`row flex-nowrap align-items-center mx-0 ${styles.navbar}`}>
                <div className='col col-md-3 col-lg-3 py-3 ps-4'>
                    <Link href='/'>
                        <a>
                            <svg
                                width='120'
                                height='43'
                                viewBox='0 0 120 43'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M0 29.3907H4.61538L5.19231 21.206C5.19231 18.4157 5.38461 15.2534 5.38461 12.2772H5.57692C6.15384 15.0674 6.92307 18.0437 7.5 20.6479L10 29.0186H14.0385L16.7308 20.6479C17.5 18.0437 18.4615 14.8814 19.2308 12.2772C19.2308 15.4395 19.4231 18.4157 19.6154 21.206L19.8077 29.3907H24.8077L23.6538 7.62677H16.9231L14.6154 14.8814C13.8461 17.2996 13.0769 20.2759 12.5 22.8801H12.3077C11.7308 20.2759 11.1538 17.4856 10.3846 14.8814L8.26923 7.62677H1.34615L0 29.3907ZM27.6923 21.764C27.6923 26.7865 30.9615 29.7627 36.5384 29.7627C38.6538 29.7627 40.7692 29.3907 42.3077 28.8326L41.7308 25.4843C40.3846 25.8564 38.8461 26.2284 37.1154 26.2284C34.8077 26.2284 32.6923 25.1123 32.5 23.0661H43.0769C43.0769 22.6941 43.2692 22.136 43.2692 21.206C43.2692 17.2996 41.3461 13.3933 35.9615 13.3933C30.3846 13.3933 27.6923 17.6717 27.6923 21.764ZM32.5 19.7178C32.6923 18.4157 33.4615 16.5556 35.7692 16.5556C38.0769 16.5556 38.6538 18.6017 38.6538 19.7178H32.5ZM45.3846 21.764C45.3846 26.7865 48.4615 29.7627 54.0384 29.7627C56.3461 29.7627 58.2692 29.3907 60 28.8326L59.2307 25.4843C57.8846 25.8564 56.5384 26.2284 54.8077 26.2284C52.5 26.2284 50.3846 25.1123 50.1923 23.0661H60.7692C60.7692 22.6941 60.9615 22.136 60.9615 21.206C60.9615 17.2996 58.8461 13.3933 53.6538 13.3933C47.8846 13.3933 45.3846 17.6717 45.3846 21.764ZM50.1923 19.7178C50.3846 18.4157 51.1538 16.5556 53.2692 16.5556C55.5769 16.5556 56.1538 18.6017 56.1538 19.7178H50.1923ZM65.9615 28.4606C66.923 29.2047 68.2692 29.7627 69.8077 29.7627C71.3461 29.7627 72.5 29.5767 73.0769 29.3907V25.6704C72.6923 25.6704 72.3077 25.8564 71.5384 25.8564C70 25.8564 69.6154 24.9263 69.6154 23.0661V17.2996H73.2692V13.7653H69.6154V9.1149L64.6154 10.231V13.7653H62.5V17.2996H64.6154V23.8102C64.6154 26.0424 65.1923 27.5305 65.9615 28.4606Z'
                                    fill='#5578FF'
                                />
                                <path
                                    d='M80.5769 19.9038C80.5769 26.7864 83.8461 29.7627 89.4231 29.7627C95.3846 29.7627 98.8461 26.7864 98.8461 20.0899V7.62677H93.8461V20.2759C93.8461 24.1822 92.3077 25.8564 89.6154 25.8564C87.1154 25.8564 85.5769 23.9962 85.5769 20.2759V7.62677H80.5769V19.9038ZM108.269 28.0886C109.038 29.0186 110.577 29.7627 112.5 29.7627C116.154 29.7627 120 27.1585 120 21.392C120 16.3695 116.731 13.3933 113.077 13.3933C110.769 13.3933 108.846 14.1373 107.692 15.8115L107.308 13.7653H102.885C103.077 15.2534 103.077 16.9276 103.077 18.9738V35.9012H108.269V28.0886ZM108.269 23.8102C108.269 23.4381 108.269 23.0661 108.269 22.6941V20.4619C108.269 20.2759 108.269 19.9038 108.269 19.7178C108.654 18.2297 110 17.1136 111.346 17.1136C113.654 17.1136 114.808 18.9738 114.808 21.578C114.808 24.1822 113.462 26.0424 111.346 26.0424C109.808 26.0424 108.654 25.1123 108.269 23.8102Z'
                                    fill='#FF64C8'
                                />
                                <path
                                    d='M25.1923 41.2956H28.077V42.4117H23.8462V36.6452H27.8847V37.7613H25.1923V39.0634H27.5V39.9935H25.1923V41.2956ZM32.6923 36.6452H33.8462V42.4117H32.5L30 38.5053V42.4117H28.8462V36.6452H30L32.6923 40.5515V36.6452ZM39.4231 39.6214V42.2257C38.8462 42.4117 38.4616 42.4117 37.8846 42.4117C36.9231 42.4117 35.9616 42.2257 35.3846 41.6676C35 41.2956 34.6154 40.5515 34.6154 39.6214C34.6154 38.5053 35 37.9473 35.3846 37.3892C35.9616 36.8312 36.9231 36.6452 37.8846 36.6452C38.4616 36.6452 38.8462 36.6452 39.2308 36.8312V37.7613C38.8462 37.7613 38.4616 37.7613 38.077 37.7613C37.5 37.7613 37.1154 37.7613 36.9231 37.9473C36.5385 37.9473 36.3462 38.1333 36.1539 38.5053C35.9616 38.6914 35.9616 39.0634 35.9616 39.6214C35.9616 40.1795 36.1539 40.7375 36.3462 40.9236C36.7308 41.2956 37.3077 41.2956 37.8846 41.2956C37.8846 41.2956 38.077 41.2956 38.2693 41.2956V39.6214H39.4231ZM40.3846 42.4117V36.6452H41.7308V41.2956H44.4231V42.4117H40.3846ZM44.8077 42.4117V36.6452H46.1539V42.4117H44.8077ZM48.6539 42.4117C48.4616 42.4117 48.0769 42.4117 47.8846 42.4117C47.5 42.2257 47.3077 42.2257 47.1154 42.2257V41.1096C47.3077 41.2956 47.5 41.2956 47.8846 41.2956C48.0769 41.4816 48.4616 41.4816 48.6539 41.4816C49.0385 41.4816 49.2308 41.2956 49.4231 41.2956C49.6154 41.1096 49.8077 40.9236 49.8077 40.7375C49.8077 40.5515 49.6154 40.5515 49.6154 40.5515C49.6154 40.3655 49.4231 40.3655 49.4231 40.1795C49.2308 40.1795 49.0385 40.1795 48.8462 39.9935H48.4616C47.8846 39.8075 47.5 39.6214 47.3077 39.4354C47.1154 39.0634 46.9231 38.8774 46.9231 38.3193C46.9231 37.7613 47.1154 37.3892 47.5 37.0172C47.8846 36.8312 48.4616 36.6452 49.2308 36.6452C49.6154 36.6452 49.8077 36.6452 50 36.6452C50.1923 36.6452 50.5769 36.8312 50.7693 36.8312V37.7613C50.5769 37.7613 50.3846 37.7613 50 37.7613C49.8077 37.7613 49.6154 37.5753 49.4231 37.5753C49.0385 37.5753 48.6539 37.7613 48.4616 37.7613C48.2693 37.9473 48.2693 38.1333 48.2693 38.3193C48.2693 38.5053 48.2693 38.5053 48.2693 38.5053C48.2693 38.6914 48.2693 38.6914 48.4616 38.6914C48.6539 38.8774 48.6539 38.8774 48.8462 38.8774L49.4231 39.0634C50 39.2494 50.3846 39.4354 50.5769 39.6214C50.7693 39.9935 50.9616 40.1795 50.9616 40.7375C50.9616 41.1096 50.9616 41.2956 50.7693 41.6676C50.5769 41.8536 50.1923 42.0397 50 42.2257C49.6154 42.4117 49.2308 42.4117 48.6539 42.4117ZM51.7308 42.4117V36.6452H53.0769V38.8774H55.3846V36.6452H56.7308V42.4117H55.3846V39.9935H53.0769V42.4117H51.7308ZM63.4616 42.4117L63.0769 40.9236H60.9616L60.3846 42.4117H59.2308L60.9616 36.6452H62.8846L64.8077 42.4117H63.4616ZM61.1539 39.8075H62.6923L61.9231 37.3892L61.1539 39.8075ZM68.0769 42.4117C67.1154 42.4117 66.3462 42.2257 65.7692 41.6676C65.1923 41.2956 65 40.5515 65 39.6214C65 38.5053 65.3846 37.9473 65.7692 37.3892C66.3462 36.8312 67.1154 36.6452 68.0769 36.6452C68.6539 36.6452 69.0385 36.6452 69.4231 36.8312V37.7613C69.0385 37.7613 68.6539 37.7613 68.2692 37.7613C67.8846 37.7613 67.5 37.7613 67.1154 37.9473C66.9231 37.9473 66.7308 38.1333 66.5385 38.5053C66.3462 38.6914 66.3462 39.0634 66.3462 39.6214C66.3462 39.9935 66.3462 40.3655 66.5385 40.5515C66.7308 40.9236 66.9231 41.1096 67.1154 41.1096C67.5 41.2956 67.6923 41.2956 68.0769 41.2956C68.4615 41.2956 68.8462 41.2956 69.4231 41.2956V42.2257C69.2308 42.2257 69.0385 42.4117 68.6539 42.4117C68.4615 42.4117 68.2692 42.4117 68.0769 42.4117ZM73.8462 42.4117L73.4615 40.9236H71.3462L70.7692 42.4117H69.6154L71.5385 36.6452H73.2692L75.1923 42.4117H73.8462ZM71.5385 39.8075H73.0769L72.3077 37.3892L71.5385 39.8075ZM77.3077 42.4117C76.7308 42.4117 76.3462 42.4117 75.7692 42.2257V36.8312C75.9615 36.8312 76.3462 36.8312 76.7308 36.6452C76.9231 36.6452 77.3077 36.6452 77.6923 36.6452C78.6539 36.6452 79.4231 36.8312 80 37.3892C80.5769 37.7613 80.7692 38.5053 80.7692 39.6214C80.7692 40.1795 80.5769 40.7375 80.3846 41.1096C80.1923 41.6676 79.8077 41.8536 79.2308 42.0397C78.8462 42.2257 78.0769 42.4117 77.3077 42.4117ZM77.6923 41.2956C78.0769 41.2956 78.4615 41.2956 78.6539 41.1096C79.0385 41.1096 79.2308 40.9236 79.2308 40.5515C79.4231 40.3655 79.4231 39.9935 79.4231 39.6214C79.4231 39.0634 79.4231 38.6914 79.2308 38.5053C79.2308 38.1333 79.0385 37.9473 78.6539 37.9473C78.4615 37.7613 78.0769 37.7613 77.6923 37.7613C77.5 37.7613 77.3077 37.7613 77.1154 37.7613V41.2956C77.1154 41.2956 77.5 41.2956 77.6923 41.2956ZM82.8846 41.2956H85.7692V42.4117H81.5385V36.6452H85.7692V37.7613H82.8846V39.0634H85.3846V39.9935H82.8846V41.2956ZM91.3462 36.6452H92.8846V42.4117H91.5385V38.3193L90.1923 41.4816H89.2308L87.6923 38.5053V42.4117H86.5385V36.6452H88.0769L89.6154 40.1795L91.3462 36.6452ZM98.4615 36.6452L96.5385 39.9935V42.4117H95.1923V39.9935L93.0769 36.6452H94.4231L95.9615 38.8774L97.3077 36.6452H98.4615Z'
                                    fill='#525050'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M24.6152 0H74.9998V5.58049H24.6152V0Z'
                                    fill='#5578FF'
                                />
                                <path
                                    fillRule='evenodd'
                                    clipRule='evenodd'
                                    d='M99.0386 0H86.731V5.58049H99.0386V0Z'
                                    fill='#5578FF'
                                />
                            </svg>
                        </a>
                    </Link>
                </div>

                <div className='col col-md-9 pe-3 pe-lg-3 d-flex justify-content-end align-items-center'>
                    <div className='d-flex justify-content-end ms-2 align-items-center'>
                        <FaRegBell />
                        <div className={styles.user}>
                            <div className={`ms-3 ${styles.avatar}`}>{foto}</div>
                            <p className={`d-none d-md-block ${styles.name}`}>{user?.data?.name}</p>
                        </div>
                        <div className={`d-none d-sm-block ${styles.lan}`}>
                            <div className={`${styles.flag}`}>
                                <Image src={imgLan} alt='idioma' priority loader={loaderProp} />
                            </div>
                            <select
                                className='border-0 px-1'
                                defaultValue={locale}
                                onChange={handleLangChange}
                            >
                                <option value='es'>ES</option>
                                <option value='en'>EN</option>
                            </select>
                        </div>

                        <button
                            onClick={handleMenu}
                            className={`d-block d-lg-none ${styles.btnMenu}`}
                        >
                            <span className={` ${styles.icon}`}>
                                <GiHamburgerMenu />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavbarPanel;
