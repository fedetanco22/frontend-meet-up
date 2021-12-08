import {useTranslations} from "next-intl";
import styles from './NumberBlock.module.scss'

const NumberBlock = () => {
  const t = useTranslations("numberblock");
  return( 
    <section className={styles.numberBlock}>
      <div className="container d-flex flex-wrap justify-content-around">
        <div className="text-center col-12 col-md">
          <h5 className={styles.number}>{t("item1.number")}</h5>
          <h5 className={styles.text}>{t("item1.text")}</h5>
        </div>
        <div className="text-center col-12 col-md">
          <h5 className={styles.number}>{t("item2.number")}</h5>
          <h5 className={styles.text}>{t("item2.text")}</h5>
        </div>
        <div className="text-center col-12 col-md">
          <h5 className={styles.number}>{t("item3.number")}</h5>
          <h5 className={styles.text}>{t("item3.text")}</h5>
        </div>

      </div>
    </section>
  )
}

export default NumberBlock