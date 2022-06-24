import { useTranslations } from 'next-intl';
import { Layout, Contact, OurValues, Button } from '../components/index';
import styles from '../styles/About.module.scss';

const Test = () => {
    const t = useTranslations('test');

    return (
        <Layout pageTitle={t('title')}>
            {/* <Banner image={bannerAbout} altText={'banner-home'} /> */}
            <div className={`container py-5 ${styles.container}`}>
                <div className='row'>
                    <div className='col-12'>
                        <h1 className={styles.title}>{t('title')}</h1>
                    </div>
                </div>
                <div className='col-12 text-center'>
                    <Button
                        text={t('linkText')}
                        linkAsButton
                        path={
                            'https://docs.google.com/forms/d/e/1FAIpQLSdYcZ4N7-vVU_b3uXw4YRBIEltgG-ltH_Qdo2j0e8Y-pQnVTA/viewform'
                        }
                        buttonType={'secondary'}
                        target
                    />
                </div>
            </div>
            <OurValues />
            <Contact />
        </Layout>
    );
};

export default Test;

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
