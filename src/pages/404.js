import { Contact, Layout } from '../components/index';

import styles from '../styles/About.module.scss';

const error = () => {
  return (
    <Layout pageTitle={t('title')}>
      <div className={`container py-5 ${styles.container}`}>
        <div className='row'>
          <div className='col-12 col-md-8'>
            <h1 className={styles.title}>ERROR</h1>
          </div>
        </div>
      </div>

      <Contact />
    </Layout>
  );
};

export default error;
