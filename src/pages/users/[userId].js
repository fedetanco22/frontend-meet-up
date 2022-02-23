import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {LayoutPanel, TitlePanel, EditUser} from "../../components";
import axios from "axios";
import useAppContext from "../../context/useAppContext";

const User = () => {
  const router = useRouter();
  const t = useTranslations("user");
  const {user} = useAppContext();
  const [editUser, setEditUser] = useState(null);
  console.log(router.query.userId, "query");
  useEffect(() => {
    if (user !== null) {
      if (user?.data?.role !== "Administrator") {
        router.push("/dashboard");
      } else {
        getEditUser();
      }
    } else {
      router.push("/");
    }
  }, []);

  const id = router.query.userId;
  const getEditUser = async () => {
    const url = "http://164.92.76.51:3000/user/" + id;
    try {
      const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
      setEditUser({data: res.data.data[0]});
      console.log(editUser, "Editar usuario fuera");
    } catch (error) {
      if (res.status === 403) {
        router.push("/");
      }
      console.log("error: ", error);
    }
    return user;
  };
  const child = {
    path: '../users',
    name: t("child")
  }
  return (
    <LayoutPanel pageTitle={t("title")}>
      <div>
        <TitlePanel title={t("title")} child={child} />
        <div>
          {editUser !== null && <EditUser user={user} editUser={editUser} />}
        </div>
        <div className="pt-3">{/* <ChangePassword user={user}/> */}</div>
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

