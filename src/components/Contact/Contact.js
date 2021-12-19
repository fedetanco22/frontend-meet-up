import { useState , useEffect} from 'react'
import React from "react";
import {Card, SectionTitle} from "../index";
import {useTranslations} from "next-intl";
import {FaRegEnvelope, FaWhatsapp} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Contact.module.scss";

const Contact = () => {
  const [path, setPath] = useState('https://api.whatsapp.com/send?phone=5493517059857&text=Hola%20tengo%20una%20Consulta!');
  
  useEffect(() => {
    AOS.init();
  }, []);

  const t = useTranslations("contact");
  const handleMessage = (value) => {
    setPath(`https://api.whatsapp.com/send?phone=5493517059857&text=${value.target.value}`);
  };

  return (
    <section>
      <div className={`container py-5 ${styles.container}`}>
        <SectionTitle title={t("title")} subTitle={t("subtitle")} />
        <Card>
          <div className="px-3 pt-5  pb-3 d-flex flex-wrap">
            <div className="col-12 col-md-5 d-flex align-items-center flex-column flex-md-row mb-4 mb-md-0">
              <div className={styles.iconEmail} data-aos="fade-right">
                <FaRegEnvelope />
              </div>
              <address className="ps-0 ps-md-5 mb-0">
                <p>
                  <b>{t("phone")}:</b> +54 351 xxxxxxx
                </p>
                <p>
                  <b>{t("email")}:</b> info@example.com
                </p>
              </address>
            </div>
            <div className="col-12 col-md-7 d-flex align-items-center flex-column flex-md-row">
              <div className={styles.iconWa} data-aos="fade-right">
                <FaWhatsapp />
              </div>
              <div className="ps-0 ps-md-5 mb-0 flex-fill w-100">
                <h4 className={styles.title}>{t("message")}</h4>
                <div className="mb-3">
                  <textarea className="form-control w-100" rows="3" onChange={handleMessage}></textarea>
                </div>
                <div className="d-flex justify-content-end">
                <a href={path} className={styles.button_green} target="_blank" rel="noreferrer">{t("button")}</a>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
