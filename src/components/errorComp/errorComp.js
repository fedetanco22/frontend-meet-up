import { Layout } from '../index';
import styles from './errorComp.module.scss';

const errorComp = () => {
  return (
    <Layout pageTitle={t('title')}>
      {/* <div className={`container py-5 ${styles.container}`}>
        <div className='row'>
          <div className='col-12'>
            <h1 className={styles.title}>ERROR</h1> */}

      <section className={styles.wrapper}>
        <div className='container'>
          <div id='scene' className={styles.scene} data-hover-only='false'>
            <div className={styles.circle} data-depth='1.2'></div>

            <div className={styles.one} data-depth='0.9'>
              <div className={styles.content}>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
              </div>
            </div>

            <div className={styles.two} data-depth='0.60'>
              <div className={styles.content}>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
              </div>
            </div>

            <div className={styles.three} data-depth='0.40'>
              <div className={styles.content}>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
                <span className={styles.piece}></span>
              </div>
            </div>

            <p className={styles.p404} data-depth='0.50'>
              404
            </p>
            <p className={styles.p404} data-depth='0.10'>
              404
            </p>
          </div>

          <div className={styles.text}>
            <article>
              <p>Uh oh! Looks like you got lost.</p>
              <p> Go back to the homepage if you dare!</p>
              <button>i dare!</button>
            </article>
          </div>
        </div>
      </section>
      {/* </div>
        </div>
      </div> */}
    </Layout>
  );
};

export default errorComp;
