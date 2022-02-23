import {useState, useEffect} from "react";
import {useTranslations} from "next-intl";
import {Modal} from "react-bootstrap";
import router from "next/router";
import axios from "axios";
import {LayoutPanel, TitlePanel, Card, IconButton, Button} from "../components";
import useAppContext from "../context/useAppContext";
import {FaPencilAlt, FaUsers, FaTrashAlt} from "react-icons/fa";
import styles from "../styles/Setup.module.scss";

const Users = () => {
  const t = useTranslations("users");
  const {user, getUser} = useAppContext();
  const [users, setUsers] = useState([]);
  const [usersFilters, setUsersFilters] = useState(users);
  const [roles, setRoles] = useState([]);
  const [roleSelectedState, setRoleSelectedState] = useState(0);
  const [inputTextState, setInputTextState] = useState("");
  const [show, setShow] = useState(false);
  const userSelected = null;

  console.log(users, 'usuarios')
  console.log(usersFilters, 'filtrados')
  let roleSelected = roleSelectedState;
  let inputText = inputTextState;


  useEffect(() => {
    if (user !== null) {
      console.log(user, 'usuario en useefcet')
      getUser()
      getRoles();
      getUsers();
    } else {
      router.push("/");
    }
  }, []);

  const handleClose = () => {
    userSelected = null;
    setShow(false);
  };
  const handleShow = (user) => {
    userSelected = user;
    setShow(true);
  };
  const confirmDelete = () => {
    console.log("usuario eliminado");
  };
  const getUsers = async () => {
    if (user?.data?.role === "Administrator") {
      const url = "http://164.92.76.51:3000/users";
      try {
        const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
        console.log(res.data?.data, 'resultado')
        setUsers(res.data?.data);

        setUsersFilters(res.data?.data);
      } catch (error) {
        router.push("/");
        console.log(error, 'error')
      }
    }
  };

  const getRoles = () => {
    if (user?.data?.role === "Administrator") {
      const url = "http://164.92.76.51:3000/roles";
      try {
        const res =  axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
        setRoles(res.data.data);
      } catch (error) {}
    }
  };

  const handleRole = (event) => {
    roleSelected = event.target.value;
    filterUser();
  };
  const searchUser = (event) => {
    inputText = event.target.value;
    filterUser();
  };

  const filterUser = () => {
    setRoleSelectedState(roleSelected);
    setInputTextState(inputText);
    console.log(usersFilters, "usuarios antes de filtrar");
    if (roleSelected === "0") {
      if (inputText.length === 0) {
        setUsersFilters(users);
      } else {
        setUsersFilters(
          users.filter((e) => e.last_name.toLowerCase().match(inputText.toLowerCase()) || e.name.toLowerCase().match(inputText.toLowerCase()))
        );
      }
    } else {
      setUsersFilters(
        users.filter(
          (e) =>
            (e.last_name.toLowerCase().match(inputText.toLowerCase()) || e.name.toLowerCase().match(inputText.toLowerCase())) &&
            e.role === roleSelected
        )
      );
    }
  };

  const usersData = usersFilters.map((user, idx) => {
    return (
      <tr key={idx}>
        <td>{user.email}</td>
        <td>
          {user.last_name} , {user.name}
        </td>
        <td>{user.role}</td>
        <td className="d-flex justify-content-end">
          <IconButton
            path={{
              pathname: "/users/[userId]",
              query: {userId: user.user_id},
            }}
            buttonType="blue"
            className="me-2"
            asLink
          >
            <FaPencilAlt />
          </IconButton>
          {/* <IconButton path={`/users/${user.user_id}`} buttonType="red" asSubmit callback={handleShow(user)}>
            <FaTrashAlt />
          </IconButton> */}
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
            <div className="d-flex justify-content-end flex-wrap">
              <div className="mb-3 col-12 col-md-6 col-lg-3 col-xxl-2">
                <input onChange={searchUser} type="text" className="form-control" placeholder={t("search")} />
              </div>
              <div className="mb-3 col-12 col-md-6 col-lg-4 col-xxl-3 d-flex align-items-center">
                <p className="mb-0 ps-0 ps-md-5 pe-3">{t("roleInput.label")}</p>
                <select onChange={handleRole} className="form-select form-control" aria-label="Default select example">
                  <option value="0">{t("roleInput.input")}</option>
                  {roles.map((role) => {
                    return (
                      <option key={role.id} value={role.role}>
                        {role.role}
                      </option>
                    );
                  })}
                  {/* <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option> */}
                </select>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table responsive">
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
                <tbody>
                  {usersFilters.length > 0 ? (
                    usersData
                  ) : (
                    <tr>
                      <td colSpan={4}>
                        <div className="empty">
                          <FaUsers />
                          <p>{t("table.empty")}</p>
                        </div>
                      </td>
                    </tr>
                  )}{" "}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-end">
              <p>Total Users: {usersFilters?.length}</p>
            </div>
          </div>
        </Card>
      </div>
      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("modal.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {t("modal.text1")} {t("modal.text2")}
        </Modal.Body>
        <Modal.Footer>
          <Button text={t("modal.cancel")} buttonType={"white_secondary"} callback={handleClose} asSubmit></Button>
          <Button text={t("modal.delete")} buttonType={"light"} callback={confirmDelete} asSubmit>
            <FaTrashAlt />
          </Button>
        </Modal.Footer>
      </Modal> */}
    </LayoutPanel>
  );
};

export default Users;

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
