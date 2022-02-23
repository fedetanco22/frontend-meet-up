import React, {useState} from "react";
import {Card, Button, TextInputFormik, Alert} from "../index";
import axios from "axios";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useTranslations} from "next-intl";
import {FaSave} from "react-icons/fa";

const ChangePassword = ({user}) => {
  const t = useTranslations("setup");
  // const [currentPass, setCurrentPass] = useState("");
  // const [newPass, setNewPass] = useState("");
  // const [repeatPass, setRepeatPass] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);
  const initialValues = {
    pass: "",
    newPass: "",
    repeatPass: "",
  };
  const validations = Yup.object({
    pass: Yup.string().required(t("form.validations.password.required")),
    newPass: Yup.string()
      .min(8, t("form.validations.newPassword.min"))
      .max(12, t("form.validations.newPassword.max"))
      .required(t("form.validations.newPassword.required")),
    repeatPass: Yup.string()
      .min(8, t("form.validations.repeatPassword.min"))
      .required(t("form.validations.repeatPassword.required")),
  });

  // const handleCurrent = (value) => {
  //   setCurrentPass(value);
  //   setIsPending(true);
  //   setSend(false);
  // };
  // const handleNew = (value) => {
  //   setNewPass(value);
  //   setIsPending(true);
  //   setSend(false);

  // };
  // const handleRepeat = (value) => {
  //   setRepeatPass(value);
  //   setIsPending(true);
  //   setSend(false);
  // };
  // const handleSubmitPass = (e) => {
  //   e.preventDefault();
  //   if(newPass === repeatPass){
  //     handlePass();
  //   }

  // };

  const handlePass = async (values) => {
    const url = "http://164.92.76.51:3000/recoveryPassword";
    try {
      const res = await axios.post(
        `${url}`,
        {
          user_id: `${user.data.user_id}`,
          new_password: `${values.newPass}`,
        },
        {headers: {Authorization: `Bearer ${user.token}`}}
      );
      if (res.status === 200) {
        setSend(true);
        setSendError(false);
        setIsPending(false);
      } else {
        setSend(true);
        setSendError(true);
        setIsPending(false);
      }
    } catch (error) {
      if (res.status === 403) {
        router.push("/");
      }
      setSend(true);
      setSendError(true);
      setIsPending(false);
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
    <Card styleClass="p-3">
      <h4 className="cardTitle">{t("password.title")}</h4>
      <Formik
        initialValues={initialValues}
        validationSchema={validations}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            console.log(values);
            if(values.newPass === values.repeatPass){
              handlePass(values);
            }else{
              setSend(true);
              setSendError(true);
            }
            
            setSubmitting(false);
          }, 400);
        }}
      >
        {({isSubmitting, isValid, initialValues, values}) => (
          <Form>
            {setIsPending(initialValues !== values)}
            <div className="d-flex flex-wrap">
              <div className="col-12 col-md-4 pe-md-3">
                <div className="mb-3">
                  <TextInputFormik type="password" value="pass" variant="bootstrap" label={t("password.current")} />
                </div>
                <div className="mb-4">
                  <TextInputFormik type={"password"} value={"newPass"} variant="bootstrap" label={t("password.new")} />
                </div>
              </div>
              <div className="col-12 col-md-4 ps-md-3 d-flex flex-column-reverse flex-md-column">
                <div className="pt-3 pb-3 pb-md-4">
                  <small className="d-block">{t("password.conditions")}</small>
                </div>
                <div className="mb-4">
                  <TextInputFormik type={"password"} value={"repeatPass"} variant="bootstrap" label={t("password.repeat")} />
                </div>
              </div>
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
    </Card>
  );
};

export default ChangePassword;
