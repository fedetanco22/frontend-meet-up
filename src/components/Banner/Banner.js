import {useEffect} from "react";
import Image from "next/image";
import {Button} from "../index";
import {useTranslations} from "next-intl";
import styles from "./Banner.module.scss";
import AOS from "aos";
import "aos/dist/aos.css";

const Banner = ({image, altText}) => {
  useEffect(() => {
    AOS.init();
  }, []);

  const t = useTranslations("banner");
  return (
    <div className={styles.imageWrapper}>
      <Image src={image} alt={altText} layout="fill" objectFit="cover" objectPosition="50% 0%" quality={100} />
      <div className={styles.bannerContent}>
        <div className="container d-flex flex-column justify-content-center align-items-start h-100">
          <h2 data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            {t("title1")}
          </h2>
          <h2 data-aos="fade-up" data-aos-anchor-placement="top-bottom">
            {t("title2")}
          </h2>
          <p data-aos="fade-up" data-aos-anchor-placement="top-bottom">{t("subtitle")}</p>
          <Button
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            text={t("button.text")}
            linkAsButton
            path={t("button.url")}
            buttonType="outline_ligth"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
