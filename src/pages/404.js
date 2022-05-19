import { Button, Layout } from '../components/index';
import styles from '../styles/404.module.scss';


const ErrorPage = () => {


    return (
        <Layout pageTitle={t('title')} className={styles.error}>
404
        </Layout>
    );
};

export default ErrorPage;


