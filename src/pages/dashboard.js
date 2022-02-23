import {useState, useEffect} from "react";
import {useTranslations} from "next-intl";
import router from "next/router";
import axios from "axios";
import {LayoutPanel, TitlePanel, Card, Button, IconButton} from "../components";
import useAppContext from "../context/useAppContext";
import Image from "next/image";
import avatar from "../../public/avatar.jpg";
import {FaLaptop, FaShoppingCart, FaUsers, FaPencilAlt} from "react-icons/fa";
import styles from "../styles/Dashboard.module.scss";

const Dashboard = () => {
  const t = useTranslations("dashboard");
  const {user, getUser} = useAppContext();
  const [users, setUsers] = useState(0);

  useEffect(() => {
    if (user !== null) {
      getUser()
      getUsers();
    } else {
      router.push("/");
    }
  }, []);

  const getUsers = async () => {
    if (user?.data?.role_id === 1) {
      const url = "http://164.92.76.51:3000/users";
      try {
        const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
        setUsers(res.data.data.length);
      } catch (error) {
        router.push("/");
      }
    }
  };

  const foto =
    user?.data?.profile_image?.length > 0 ? (
      <Image src={`http://164.92.76.51:3000/userImages/${user?.data?.profile_image}`} alt="idioma" width={130} height={130} />
    ) : (
      <Image src={avatar} alt="idioma" priority />
    );

  return (
    <LayoutPanel pageTitle={t("title")}>
      
        <TitlePanel title={t("title")} />
        <Card>
          <div className="d-flex justify-content-end pt-3 pe-3">
            <IconButton path={t("buttonEdit")} buttonType="blue">
              <FaPencilAlt />
            </IconButton>
          </div>
          <div className="d-flex p-3 pt-0 position-relative">
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

        {user?.data?.role_id === 1 && (
          <div className="d-flex flex-wrap pt-3">
            <div className="col-12 col-md-6 pe-md-2">
              <Card>
                <div className={styles.cardDashboard}>
                  <h4 className={styles.cardTitle}>{t("salesCard.title")}</h4>
                  <div className={styles.iconBox}>
                    <div className={`${styles.cardIcon} text-primary`}>
                      <FaShoppingCart />
                    </div>
                    <div className="ps-3">
                      <p className={styles.number}>145</p>
                      <p className={styles.period}>{t("salesCard.period")}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button
                      path={t("salesCard.button.url")}
                      text={t("salesCard.button.text")}
                      asLink
                      buttonType={"transparent"}
                      className="ms-lg-5"
                    />
                  </div>
                </div>
              </Card>
            </div>

            <div className="col-12 col-md-6 ps-md-2 pt-3 pt-md-0">
              <Card>
                <div className={styles.cardDashboard}>
                  <h4 className={styles.cardTitle}>{t("usersCard.title")}</h4>
                  <div className={styles.iconBox}>
                    <div className={`${styles.cardIcon} text-orange`}>
                      <FaUsers />
                    </div>
                    <div className="ps-3">
                      <p className={styles.number}>{users}</p>
                      <p className={styles.period}>{t("usersCard.period")}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <Button
                      path={t("usersCard.button.url")}
                      text={t("usersCard.button.text")}
                      asLink
                      buttonType={"transparent"}
                      className="ms-lg-5"
                    />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
        {user?.data?.role_id !== 1 && (
          <div className="d-flex flex-wrap pt-3">
            <div className="col-12 col-md-6 pe-md-2 ">
              <Card>
                <div className={styles.cardDashboard}>
                  <h4 className={styles.cardTitle}>{t("card1")}</h4>
                  <div className={styles.empty}>
                    <div className={styles.emptyBox}>
                      <span></span>
                      <FaLaptop />
                    </div>
                    <h5>{t("emptyCourse")}</h5>
                  </div>
                </div>
              </Card>
            </div>
            <div className="col-12 col-md-6 ps-md-2 pt-3 pt-md-0">
              <Card>
                <div className={styles.cardDashboard}>
                  <h4 className={styles.cardTitle}>{t("card2")}</h4>
                  <div className={styles.empty}>
                    <div className={styles.emptyBox}>
                      <span></span>
                      <FaLaptop />
                    </div>
                    <h5>{t("emptyCourse")}</h5>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      
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
