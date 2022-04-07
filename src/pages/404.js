import { Layout } from '../components/index';
import styles from '../styles/404.module.scss';
import { useTranslations } from 'next-intl';

const error404 = () => {
  const t = useTranslations('404');

  return (
    <Layout pageTitle={t('title')} className={styles.error}>
      <section className={styles.wrapper}>
        <div className='container'>
          <div id='scene' className={styles.scene} data-hover-only='false'>
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
            <p>{t('subtitle')}</p>
            <button>{t('button')}</button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default error404;

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

// var scene = document.getElementById('scene');
// var parallax = new Parallax(scene);
