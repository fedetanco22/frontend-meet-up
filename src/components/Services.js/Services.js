import {useTranslations} from "next-intl";
import { Button } from '../index'
import {FaLaptop, FaEdit, FaCommentAlt} from "react-icons/fa";
import styles from "./Services.module.scss";

const Services = () => {
  const t = useTranslations("services");
  return (
    <section className={styles.ServicesBlock}>
      <div className="container d-flex flex-wrap">
        <div className="col-12 col-lg-4 p-2">
        <div className={`${styles.whyUs}`}>
          <h3 className={styles.title}>{t("whyUs.title")}</h3>
          <p className={styles.text}>
          {t("whyUs.text")}
          </p>
          <div className="d-flex justify-content-end"> 
          <Button  
              text={t("whyUs.button")}  
              buttonType={'light'}
              asLink={true}
              path={'/'}
            />  
          </div>
        </div>
        </div>
        <div className="col-12 col-lg-8 d-flex flex-wrap">
          <div className="col-12 col-md-4 p-2">
            <div className={`${styles.service}`}>
            <div className={`${styles.icon}`}>
              <FaLaptop />
            </div>
            <h4 className={`${styles.title}`}>{t("service.1.title")}</h4>
            <p className={`${styles.text}`}>
            {t("service.1.text")}
            </p>
            </div>
          </div>
          <div className="col-12 col-md-4 p-2">
            <div className={`${styles.service}`}>
            <div className={`${styles.icon}`}>
              <FaEdit />
            </div>
            <h4 className={`${styles.title}`}>{t("service.2.title")}</h4>
            <p className={`${styles.text}`}>
            {t("service.2.text")}
            </p>
            </div>
          </div>
          <div className="col-12 col-md-4 p-2">
            <div className={`${styles.service}`}>
            <div className={`${styles.icon}`}>
              <FaCommentAlt />
            </div>
            <h4 className={`${styles.title}`}>{t("service.3.title")}</h4>
            <p className={`${styles.text}`}>
            {t("service.3.text")}
            </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;
