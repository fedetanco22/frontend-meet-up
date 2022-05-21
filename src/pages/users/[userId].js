import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {LayoutPanel, TitlePanel, EditUser, Loading, SendPassword, Card, Button, Alert} from "../../components";
import axios from "axios";
import useAppContext from "../../context/useAppContext";
import {FaTrashAlt, FaSave} from "react-icons/fa";

const User = () => {
  const router = useRouter();
  const t = useTranslations("user");
  const {user, endSesion, setUser} = useAppContext();
  const [editUser, setEditUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [sendDelete, setSendDelete] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [sendErrorDelete, setSendErrorDelete] = useState(false);
  const [roles, setRoles] = useState([]);
  const [roleSelectedState, setRoleSelectedState] = useState(null);
  let roleSelected = roleSelectedState;

  useEffect(() => {
    if (user !== null) {
      if (user?.data?.role !== "Administrator") {
        router.push("/dashboard");
      } else {
        getRoles();
        getEditUser();
        
      }
    } else {
      router.push("/");
    }
  }, []);

  const confirmDelete = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const url = "http://164.92.76.51:3000/users/" + editUser?.data?.user_id;
    try {
      const res = await axios.delete(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
      if (res.status === 200) {
        router.push("/users");
      } else {
        setSendDelete(true);
        setSendErrorDelete(true);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        endSesion();
        setUser(null);
      }
      console.log(error);
      setSendDelete(true);
      setSendErrorDelete(true);
    }
  };
  const getRoles = async () => {
    if (user?.data?.role === "Administrator") {
      const url = "http://164.92.76.51:3000/roles";
      try {
        const res = await axios.get(`${url}`, {
          headers: {Authorization: `Bearer ${user.token}`},
        });
        if (res.status === 200) {
          setRoles(res?.data?.data);
          
        }         
      } catch (error) {}
    }
  };
  
  
  const confirmChange = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const url = "http://164.92.76.51:3000/users/changeRole/" + editUser?.data?.user_id;
    try {
      const res = await axios.patch(`${url}`,{
        "new_role": `${roleSelected}`,
      }, {headers: {Authorization: `Bearer ${user.token}`}});
      if (res.status === 200) {
        setSend(true);
        setSendError(false);
        setIsLoading(false);
      } else {
        setSend(true);
        setSendError(true);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        endSesion();
        setUser(null);
      }
      console.log(error);
      setSend(true);
      setSendError(true);
      setIsLoading(false);
    }
  };
  const handleRole = (event) => {
    roleSelected = event.target.value;
    setRoleSelectedState(roleSelected)
  };
  const id = router?.query?.userId;

  const getEditUser = async () => {
    setIsLoading(true);
    const url = "http://164.92.76.51:3000/user/" + id;
    try {
      const res = await axios.get(`${url}`, {
        headers: {Authorization: `Bearer ${user.token}`},
      });

      if (res.status === 200) {
        setIsLoading(false);
        setEditUser({data: res.data?.data[0]});
        roleSelected = res.data?.data[0].role_id;
        setRoleSelectedState(roleSelected)
      }
    } catch (error) {
      if (error.response?.status === 403) {
        endSesion();
        setUser(null);
      }
      console.log("error: ", error);
      setIsLoading(false);
    }
    return user;
  };
  const child = {
    path: "../users",
    name: t("child"),
  };

  const alert = sendDelete ? sendErrorDelete ? <Alert text={t("alert.error")} type="error" /> : <Alert text={t("alert.success")} type="success" /> : null;
  const alertRole = send ? sendError ? <Alert text={t("alert.error")} type="error" /> : <Alert text={t("alert.success")} type="success" /> : null;

  return (
    <LayoutPanel pageTitle={t("title")}>
      {isLoading && <Loading />}
      <div>
        <TitlePanel title={t("title")} child={child} />
        <div>{editUser !== null && <EditUser user={user} editUser={editUser} />}</div>
        <div className="pt-3">{editUser !== null && <SendPassword editUser={editUser} />}</div>
        <div className="pt-3">
          <Card styleClass="p-3 mb-4">
            <h4 className="cardTitle">{t("changeRole.title")}</h4>
            <div className="d-flex flex-wrap">{t("changeRole.content")}</div>

            <form onSubmit={confirmChange}>
              <div className="col-12 col-md-4 col-lg-3">
                {roleSelected !== null && <select onChange={handleRole} value={roleSelected} className="form-select form-control" aria-label="Default select example">
                  {roles?.map((role) => {
                    return (
                      <option key={role?.role_id} value={role?.role_id}>
                        {role?.role}
                      </option>
                    );
                  })}
                </select>}
              </div>
              <div className="d-flex flex-wrap flex-md-nowrap w-100">
                <div className="col-12 flex-fill mb-3">{alertRole}</div>
                <div className="col-12 col-md-auto text-end px-md-3">
                  <Button text={t("changeRole.button")} className="w-100" buttonType={"light"} asSubmit>
                    <FaSave />
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
        <div className="pt-3">
          <Card styleClass="p-3">
            <h4 className="cardTitle">{t("delete.title")}</h4>
            <div className="d-flex flex-wrap">{t("delete.content")}</div>
            <div className="d-flex flex-wrap flex-md-nowrap w-100">
              <div className="col-12 flex-fill mb-3">{alert}</div>
              <div className="col-12 col-md-auto text-end px-md-3">
                <form onSubmit={confirmDelete}>
                  <Button text={t("delete.button")} className="w-100" buttonType={"light"} asSubmit>
                    <FaTrashAlt />
                  </Button>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </LayoutPanel>
  );
};

export default User;

export function getServerSideProps({locale}) {
  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: require(`../../lang/${locale}.json`),
    },
  };
}
