import { useTranslations } from 'next-intl';
import { Layout, NumberBlock, Contact, PartnerList, OurValues } from '../components/index';
import Banner from '../components/Banner/Banner';
import bannerAbout from '../../public/estudiante-online-2.jpg';
import styles from '../styles/About.module.scss';

const About = () => {
    const t = useTranslations('about');
    return (
        <Layout pageTitle={t('title')}>
            <Banner image={bannerAbout} altText={'banner-home'} />
            <div className={`container py-5 ${styles.container}`}>
                <div className='row'>
                    <div className='col-12 col-md-8'>
                        <h1 className={styles.title}>{t('title')}</h1>
                        <div className={styles.textBody}>
                            <h3>Meet Up</h3>
                            <p>{t('description')}</p>
                        </div>
                        <div className={styles.textBody}>
                            <h3>Nuestra Metodologia</h3>
                            <p>{t('methodologyOne')}</p>
                            <p>{t('methodologyTwo')}</p>
                            <p>{t('methodologyThree')}</p>
                            <p>{t('methodologyFour')}</p>
                        </div>
                        <div className={styles.textBody}>
                            <h3>Informaci&oacute;n general de nuestros cursos</h3>
                            <p>{t('course_info')}</p>
                        </div>
                    </div>
                    <div className={`${styles.value} col-12 col-md-4 `}>
                        <div className={styles.value__text}>
                            <h3>Mision</h3>
                            <p>{t('mision')}</p>
                        </div>
                        <div className={styles.value__text}>
                            <h3>Vision</h3>
                            <p>{t('vision')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <OurValues />
            <PartnerList />
            <NumberBlock />
            <Contact />
        </Layout>
    );
};

export default About;

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
