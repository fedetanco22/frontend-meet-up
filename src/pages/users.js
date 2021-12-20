import {useState, useEffect} from "react";
import {useTranslations} from "next-intl";
import router from "next/router";
import axios from "axios";
import {LayoutPanel, TitlePanel, Card, IconButton} from "../components";
import useAppContext from "../context/useAppContext";
import {FaPencilAlt} from "react-icons/fa";
import styles from "../styles/Setup.module.scss";

const Dashboard = () => {
  const t = useTranslations("users");
  const {user} = useAppContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user !== null) {
      if (user?.data?.role_id !== 1) {
        router.push("/dashboard");
      } else {
        getUsers();
      }
    } else {
      router.push("/");
    }
  }, []);

  const getUsers = async () => {
    if (user?.data?.role_id === 1) {
      const url = "http://164.92.76.51:3000/users";
      try {
        const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
        setUsers(res.data.data);
      } catch (error) {}
    }
  };
  const usersData = users.map((user, idx) => {
    return (
      <tr key={idx}>
        <td>{user.email}</td>
        <td>
          {user.last_name} , {user.name}
        </td>
        <td>{user.role_id}</td>
        <td className="d-flex justify-content-end">
          <IconButton 
          path="/editar"
          buttonType="blue"
          >
            <FaPencilAlt/>
          </IconButton>
        </td>
      </tr>
    );
  });
  return (
    <LayoutPanel pageTitle={t("title")}>
      <div>
        <TitlePanel title={t("title")} />
        <Card>
          <div className="p-3 pb-0">
            <h4 className={styles.cardTitle}>{t("list")}</h4>
            <div className="d-flex justify-content-end">
              <div className="mb-3 col-12 col-md-2">
                <input type="text" className="form-control" placeholder={t("search")} />
              </div>
              <div className="mb-3 col-12 col-md-2 d-flex align-items-center">
                <p className="mb-0 ps-5 pe-3">{t("roleInput.label")}</p>
                <select className="form-select form-control" aria-label="Default select example">
                <option selected>{t("roleInput.input")}</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              </div>

            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">{t("table.user")}</th>
                    <th scope="col">{t("table.name")}</th>
                    <th scope="col">{t("table.role")}</th>
                    <th scope="col" className="text-end">
                      {t("table.actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>{usersData}</tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end">
              <p>Total Users: {users?.length}</p>
            </div>
          </div>
        </Card>
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
