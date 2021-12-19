import { useEffect } from 'react';
import { Card, SectionTitle } from '../index';
import {FaCheck} from 'react-icons/fa';
import {useTranslations} from "next-intl";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from './OurValues.module.scss';


const OurValues = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const t = useTranslations("about.values");
  return (
    <section>
      <div className={`container py-5 ${styles.container}`}>
        <SectionTitle title={t("title")} subTitle={t("subtitle")} />
        <Card>
          <div className={styles.value}>
            <div className={styles.value__item}>
              <FaCheck />
              <p>{t("values.professionalism")}</p>
            </div>
            <div className={styles.value__item}>
              <FaCheck />
              <p>{t("values.excellence")}</p>
            </div>
            <div className={styles.value__item}>
              <FaCheck />
              <p>{t("values.warranty")}</p>
            </div>
            <div className={styles.value__item}>
              <FaCheck />
              <p>{t("values.knowledge")}</p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

export default OurValues
