import {useState, useEffect} from "react";
import {useTranslations} from "next-intl";
import router from "next/router";
import axios from "axios";
import {LayoutPanel, TitlePanel, Card, Button, TextInput, Alert} from "../components";
import useAppContext from "../context/useAppContext";
import Image from "next/image";
import avatar from "../../public/avatar.jpg";
import {FaSave} from "react-icons/fa";
import styles from "../styles/Setup.module.scss";

const Dashboard = () => {
  const t = useTranslations("setup");
  const {user, setUser} = useAppContext();
  const [name, setName] = useState(user?.data?.name);
  const [lastName, setLastName] = useState(user?.data?.last_name);
  const [phone, setPhone] = useState(user?.data?.phone);
  const [isPending, setIsPending] = useState(false);
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);
  
  useEffect(() => {
    if (user !== null) {
      getUser();
    } else {
      router.push("/");
    }
  }, []);

  const foto =
    user?.data?.profile_image?.length > 0 ? (
      <Image src={user?.data?.profile_image} alt="idioma" width={130} height={130} />
    ) : (
      <Image src={avatar} alt="idioma" priority />
    );
  const handleData = async () => {
    const url = "http://164.92.76.51:3000/users/" + user?.data?.user_id;

    try {
      const res = await axios.patch(
        `${url}`,
        {
          name: `${name}`,
          last_name: `${lastName}`,
          phone: `${phone}`,
          profile_image: null,
        },
        {headers: {Authorization: `Bearer ${user.token}`}}
      );
      if(res.status === 200){
        getUser();
        setSend(true);
        setSendError(false);
        setIsPending(false);
      }else{
        setSend(true);
        setSendError(true);
        setIsPending(false);
      }

    } catch (error) {
      setSend(true);
      setSendError(false);
      setIsPending(false);
    }
  };
  const handleNameChange = (value) => {
    setName(value);
    setIsPending(true);
    setSend(false);
  };
  const handleLastNameChange = (value) => {
    setLastName(value);
    setIsPending(true);
    setSend(false);
  };
  const handlePhoneChange = (value) => {
    setPhone(value);
    setIsPending(true);
    setSend(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleData();
  };
  const getUser = async () => {
    const url = "http://164.92.76.51:3000/user/" + user?.data?.user_id;

    try {
      const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
      setUser({"message": "OK", "data": res.data.data[0], "token": user?.token});
      localStorage.setItem('user', JSON.stringify({"message": "OK", "data": res.data.data[0], "token": user?.token}));
    } catch (error) {

      localStorage.setItem( 'user', null);
    }
  };
  const alert = send ? (
    sendError ? (
      <Alert text={t("alert.error")} type="error" />
    ) : (
      <Alert text={t("alert.success")} type="success" />
    )
  ) : isPending ? (
    <Alert text={t("alert.warning")} type="warning" />
  ) : null;
  return (
    <LayoutPanel pageTitle={t("title")}>
      <div>
        <TitlePanel title={t("title")} />
        <Card>
          <div className="d-flex flex-wrap flex-md-nowrap p-3 pb-0">
            <div className="me-3 col-12 col-md-auto">
              <div className={`ms-3 ${styles.avatar}`}>{foto}</div>
            </div>
            <div className={`flex-fill ${styles.user}`}>
              <h4 className={styles.cardTitle}>{user?.data?.email}</h4>
              <form onSubmit={handleSubmit} className="d-flex flex-column">
                <div className="mb-3 col-12 col-md-4">
                  <TextInput type="text" value={name} variant="bootstrap" label={t("form.name")} handleChange={handleNameChange} required={true} />
                </div>
                <div className="mb-3 col-12 col-md-4">
                  <TextInput
                    type="text"
                    value={lastName}
                    label={t("form.lastname")}
                    variant="bootstrap"
                    handleChange={handleLastNameChange}
                    required={true}
                  />
                </div>
                <div className="mb-3 col-12 col-md-4">
                  <TextInput type="text" value={phone} label={t("form.phone")} variant="bootstrap" handleChange={handlePhoneChange} />
                </div>
                <div className="d-flex flex-wrap flex-md-nowrap w-100">
                  <div className="col-12 flex-fill mb-3">{alert}</div>
                  <div className="col-12 col-md-auto text-end px-md-3">
                    <Button text="Save" className="w-100" buttonType={"light"} asSubmit>
                      <FaSave />
                    </Button>
                  </div>
                </div>
              </form>
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
