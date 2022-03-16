import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import { GiHamburgerMenu } from 'react-icons/gi';
import Image from 'next/image';
import flagEn from '../../../public/en.png';
import flagEs from '../../../public/ar.png';
import { useEffect, useState } from 'react';
import { Button, Logo } from '../index';

import styles from './Navbar.module.scss';

const Navbar = ({ handleMenu, open }) => {
    const t = useTranslations('nav');
    const router = useRouter();
    const { locale, pathname, query } = router;
    const [imgLan, setImgLan] = useState(flagEs);
    const [activeStyle, setActiveStyle] = useState(styles.false);

    useEffect(() => {
        locale === 'en' ? setImgLan(flagEn) : setImgLan(flagEs);
        open ? setActiveStyle(styles.true) : setActiveStyle(styles.false);
    }, [open, locale]);

    const handleLangChange = (e) => {
        const locale = e.target.value;
        router.push(pathname, query.courseId, { locale });
        locale === 'en' ? setImgLan(flagEn) : setImgLan(flagEs);
    };

    return (
        <>
            <div className={styles.headerLine}>
                <div>&nbsp;</div>
            </div>
            <div className='container '>
                <div className={`row mx-0 flex-nowrap align-items-center ${styles.navbar}`}>
                    <div className='col col-md-3 py-4 '>
                        <Logo color width='120' height='43' />
                    </div>

                    <div className='col col-md-9  d-flex justify-content-end align-items-center'>
                        <div className={`d-flex ${styles.menu} ${activeStyle}`}>
                            <Button
                                path={t('home.link')}
                                text={t('home.title')}
                                asLink
                                active={pathname === '/'}
                                buttonType={'link'}
                                className='text-uppercase p-2'
                            />
                            <Button
                                path={t('courses.link')}
                                text={t('courses.title')}
                                asLink
                                active={pathname === '/courses'}
                                buttonType={'link'}
                                className='text-uppercase p-2'
                            />
                            <Button
                                path={t('test.link')}
                                text={t('test.title')}
                                asLink
                                active={pathname === '/test'}
                                buttonType={'link'}
                                className='text-uppercase p-2'
                            />
                            <Button
                                path={t('about.link')}
                                text={t('about.title')}
                                asLink
                                active={pathname === '/about'}
                                buttonType={'link'}
                                className='text-uppercase p-2'
                            />

                            <Button
                                path={t('login.link')}
                                text={t('login.title')}
                                asLink
                                buttonType={'transparent'}
                                className='ms-lg-5'
                            />
                            <Button
                                path={t('register.link')}
                                text={t('register.title')}
                                asLink
                                buttonType={'light'}
                            />
                        </div>
                        <div className='d-flex justify-content-end ms-2 align-items-center'>
                            <div className={` ${styles.lan}`}>
                                <div className={`${styles.flag}`}>
                                    <Image src={imgLan} alt='idioma' priority />
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
            </div>
        </>
    );
};

export default Navbar;

/*  <Link href={t("home.link")}>
      <a className={`${styles.link} ${styles.active}`}>{t("home.title")}</a>
    </Link>
    <Link href={t("courses.link")}>
      <a className={styles.link}>{t("courses.title")}</a>
    </Link>
    <Link href={t("test.link")}>
      <a className={styles.link}>{t("test.title")}</a>
    </Link>
    <Link href={t("about.link")}>
      <a className={styles.link}>{t("about.title")}</a>
    </Link>
    <Link href={t("login.link")}>
      <a className="button button-transparent py-2 ms-lg-4">{t("login.title")}</a>
    </Link>
    <Link href={t("register.link")}>
      <a className="button button-ligth py-2">{t("register.title")}</a>
    </Link> */
