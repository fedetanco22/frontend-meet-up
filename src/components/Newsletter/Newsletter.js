import React from "react";
import {Button} from "../index";
import {useTranslations} from "next-intl";
import styles from './Newsletter.module.scss'

const Newsletter = () => {
  const t = useTranslations("newsletter");
  return (
    <div className={styles.newsletter}>
      <h4>{t("title")}</h4>
      <div className="mb-3 mt-2 w-100">
      <input type="email" className="form-control rounded-pill" id="exampleFormControlInput1" placeholder={t("placeholder")}/>
      </div>
      <Button text={t("button.text")} buttonType="secondary" asSubmit />
    </div>
  );
};

export default Newsletter;
