import { Contact, Layout } from '../components/index';
import { useTranslations } from 'next-intl';

import styles from '../styles/404.module.scss';

const errorView = () => {
    return (
        <Layout pageTitle={'title'}>
            {/* <div className={`container py-5 ${styles.container}`}>
        <div className='row'>
          <div className='col-12'> */}
            {/* <h1 className={styles.title}>ERROR</h1> */}

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

            <Contact />
        </Layout>
    );
};

export default errorView;

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
