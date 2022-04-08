import {useState, createRef} from "react";
import {Card, Button, Alert, IconButton, TextInputFormik} from "../index";
import axios from "axios";
import router from "next/router";
import {Formik, Form} from "formik";
import useAppContext from "../../context/useAppContext";
import * as Yup from "yup";
import {useTranslations} from "next-intl";
import {FaSave, FaPlus, FaTrashAlt} from "react-icons/fa";
import Image from "next/image";
import avatar from "../../../public/avatar.jpg";
import styles from "./EditUser.module.scss";

const EditUser = ({user, editUser}) => {
  const t = useTranslations("setup");
  const {getUser, setUser} = useAppContext();
  const [isPending, setIsPending] = useState(false);
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [selectedFile, setSelectedFile] = useState("null");
  const [ref] = useState(createRef());
  const [imageUrl, setImageUrl] = useState(null);
  let fileTmp = selectedFile;
  let urlTmp = imageUrl;
  const initialValues = {
    name: editUser?.data?.name,
    lastName: editUser?.data?.last_name,
    phone: editUser?.data?.phone,
  };
  const validations = Yup.object({
    name: Yup.string()
      .min(3, t("form.validations.name.min"))
      .max(30, t("form.validations.name.max"))
      .required(t("form.validations.name.required")),
    lastName: Yup.string()
      .min(3, t("form.validations.name.min"))
      .max(30, t("form.validations.name.max"))
      .required(t("form.validations.lastName.required")),
    phone: Yup.number()
      .positive(t("form.validations.phone.number"))
      .integer(t("form.validations.phone.number"))
      .required(t("form.validations.phone.required")),
  })
  const foto =
    editUser?.data?.profile_image?.length > 0 ? (
      <Image src={`http://164.92.76.51:3000/userImages/${editUser?.data?.profile_image}`} alt="idioma" width={130} height={130} />
    ) : (
      <Image src={avatar} alt="usuario" priority />
    );

  const fotoTmp = imageUrl !== null ? <Image src={imageUrl} alt="idioma" width={130} height={130} /> : null;
  const handleData = async (values) => {
    const url = "http://164.92.76.51:3000/users/" + editUser?.data?.user_id;
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("last_name", values.lastName);
    formData.append("phone", values.phone);
    formData.append("profile_image", selectedFile);
    try {
      const res = await axios.patch(url, formData, {headers: {"Content-Type": "multipart/form-data", Authorization: `Bearer ${user.token}`}});
      if (res.status === 200) {
        if (user?.data?.user_id === editUser?.data?.user_id) {
          getUser();
        }
        setSend(true);
        setSendError(false);
        setIsPending(false);
      } else {
        setSend(true);
        setSendError(true);
        setIsPending(false);
      }
    } catch (error) {
      if (error.response.status === 403) {
        setUser(null);
        router.push("/");
      }
      console.log(error);
      setSend(true);
      setSendError(true);
      setIsPending(false);
      
    }
  };

  const handleImage = (event) => {
    fileTmp = event.target.files[0];
    setSelectedFile(fileTmp);
    setIsPending(true);
    urlTmp = URL.createObjectURL(fileTmp);
    setImageUrl(urlTmp);
  };
  const deleteImage = () => {
    setSelectedFile(avatar);
    setImageUrl(null);
    setIsPending(true);
  };
  const selectImage = () => {
    ref.current.click();
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
    <Card styleClass="mb-4">
      <div className="d-flex flex-wrap flex-md-nowrap p-3 pb-0">
        <div className="me-3 col-12 col-md-auto">
          <div className="position-relative d-flex justify-content-center">
            <div className={`ms-3 ${styles.avatar}`}>{foto}</div>
            <div className={`ms-3 ${styles.avatarTmp}`}>{fotoTmp}</div>
          </div>
          <input type="file" onChange={handleImage} ref={ref} className="d-none" accept="image/png/jpg" />
          <div className="w-100 d-flex justify-content-center py-2">
            <IconButton asSubmit={true} buttonType="green" callback={selectImage} className="me-3">
              <FaPlus />
            </IconButton>
            <IconButton asSubmit={true} buttonType="red" callback={deleteImage}>
              <FaTrashAlt />
            </IconButton>
          </div>
        </div>

        <div className={`flex-fill ${styles.user}`}>
          <h4 className="card-title">{editUser?.data?.email}</h4>
          <Formik
            initialValues={initialValues}
            validationSchema={validations}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                handleData(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({isSubmitting, isValid, initialValues, values}) => (
              <Form>
                {setIsPending(initialValues !== values)}
                
                <div className="mb-3 col-12 col-md-4">
                  <TextInputFormik type="text" value="name" variant="bootstrap" label={t("form.name")} />
                </div>
                <div className="mb-3 col-12 col-md-4">
                  <TextInputFormik type={"text"} value={"lastName"} variant="bootstrap" label={t("form.lastname")} />
                </div>
                <div className="mb-3 col-12 col-md-4">
                  <TextInputFormik type={"text"} value={"phone"} variant="bootstrap" label={t("form.phone")} />
                </div>
                <div className="d-flex flex-wrap flex-md-nowrap w-100">
                  <div className="col-12 flex-fill mb-3">{alert}</div>
                  <div className="col-12 col-md-auto text-end px-md-3">
                    <Button text={t("form.submit")} className="w-100" buttonType={"light"} disabled={isSubmitting || !isValid} asSubmit>
                      <FaSave />
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Card>
  );
};

export default EditUser;
