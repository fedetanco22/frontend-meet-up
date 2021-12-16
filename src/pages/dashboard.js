import {useTranslations} from "next-intl";
import {LayoutPanel, TitlePanel, Card} from "../components";
import useAppContext from "../context/useAppContext";
import Image from "next/image";
import avatar from "../../public/avatar.jpg";
import {FaLaptop} from "react-icons/fa";
import styles from "../styles/Dashboard.module.scss";

const Dashboard = () => {
  const t = useTranslations("dashboard");
  const {user} = useAppContext();
  const foto =
    user?.data?.profile_image?.length > 0 ? (
      <Image src={user?.data?.profile_image} alt="idioma" width={130} height={130} />
    ) : (
      <Image src={avatar} alt="idioma" priority />
    );

  return (
    <LayoutPanel pageTitle={t("title")}>
      <div>
        <TitlePanel title={t("title")} />
        <Card>
          <div className="d-flex p-3">
            <div className="me-3">
              <div className={`ms-3 ${styles.avatar}`}>{foto}</div>
            </div>
            <div className={styles.user}>
              {user?.data?.role_id === 1 && <small>Admin</small>}
              {user?.data?.role_id === 2 && <small>{t("roleTeacher")}</small>}
              {user?.data?.role_id === 3 && <small>{t("roleStudent")}</small>}
              <h4 className={styles.cardTitle}>
                {user?.data?.name} {user?.data?.last_name}{" "}
              </h4>
              <p>{user?.data?.email}</p>
              <p>{user?.data?.phone}</p>
            </div>
          </div>
        </Card>
        <div className="d-flex flex-wrap py-3">
          <div className="col-12 col-md-6 pe-2">
            <Card>
              <div className="p-3">
                <h4 className={styles.cardTitle}>{t("card1")}</h4>
                <div className={styles.empty}>
                  <div>
                    <span></span>
                    <FaLaptop />
                  </div>
                  <h5>{t("emptyCourse")}</h5>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-12 col-md-6 ps-2">
            <Card>
              <div className="p-3">
                <h4 className={styles.cardTitle}>{t("card2")}</h4>
                <div className={styles.empty}>
                  <div>
                    <span></span>
                    <FaLaptop />
                  </div>
                  <h5>{t("emptyCourse")}</h5>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </LayoutPanel>
  );
};

export default Dashboard;

export function getStaticProps({locale}) {
  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: require(`../lang/${locale}.json`),
    },
  };
}
