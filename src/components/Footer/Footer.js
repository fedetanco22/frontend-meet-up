import React from "react";
import {FaChevronRight} from "react-icons/fa";
import {SocialMediaLinks, Logo, Button, Newsletter} from '../index'
import {useTranslations} from "next-intl";
import styles from "./Footer.module.scss";

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className={styles.footer}>
      <div className="container d-flex flex-wrap pt-5 py-3 px-5 px-md-0">
        <div className="col-12 col-md-4 py-3">
          <Logo color width="120" height="43" />
          <address className="mt-3">
            <small>Córdoba, Argentina</small>
            <p>
              <b>{t("footer.phone")}:</b> +54 351 xxxxxxx
            </p>
            <p>
              <b>{t("footer.email")}:</b> info@example.com
            </p>
          </address>
        </div>
        <div className="col-12 col-md-4 py-3 d-flex flex-wrap">
          <div className="col-12 col-md-6">
            <h4>{t("footer.listLink1")}</h4>
            <ul>
              <li>
                <FaChevronRight /> <Button path={t("nav.home.link")} text={t("nav.home.title")} asLink buttonType={"link"} />
              </li>
              <li>
                <FaChevronRight />
                <Button path={t("nav.about.link")} text={t("nav.about.title")} asLink buttonType={"link"} />
              </li>
              <li>
                <FaChevronRight />
                <Button path={t("nav.terms.link")} text={t("nav.terms.title")} asLink buttonType={"link"} />
              </li>
              <li>
                <FaChevronRight />
                <Button path={t("nav.policy.link")} text={t("nav.policy.title")} asLink buttonType={"link"} />
              </li>
            </ul>
          </div>
          <div className="col-12 col-md-6">
            <h4>{t("footer.listLink2")}</h4>
            <ul>
              <li>
                <FaChevronRight /> <Button path={t("nav.test.link")} text={t("nav.test.title")} asLink buttonType={"link"} />
              </li>
              <li>
                <FaChevronRight />
                <Button path={t("nav.courses.link")} text={t("nav.courses.title")} asLink buttonType={"link"} />
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12 col-md-4 py-3">
          <Newsletter/>
        </div>
      </div>
      <div className={styles.copy}>
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
          <div className="text-center mb-3 text-md-start mb-md-0">
            <p>
              Copyright <b>MeetUp</b>. All Rigths Reserved
            </p>
            <small>Development by</small>
          </div>
          <SocialMediaLinks />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
