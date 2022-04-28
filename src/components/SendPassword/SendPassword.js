import React, {useState} from "react";
import {Card, Button, TextInputFormik, Alert} from "../index";
import axios from "axios";
import {Formik, Form} from "formik";
import * as Yup from "yup";
import {useTranslations} from "next-intl";
import {FaPaperPlane} from "react-icons/fa";

const SendPassword = ({editUser}) => {
  const t = useTranslations("setup");
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);
  const initialValues = {
    email: editUser?.data?.email
  };

  const sendPass = async (values) => {
    const url = "http://164.92.76.51:3000/forgotPassword";
    try {
      const res = await axios.post(
        `${url}`,
        {
          email: `${values.email}`,
        }
      );
      if (res.status === 200) {
        setSend(true);
        setSendError(false);
      } else {
        setSend(true);
        setSendError(true);
      }
    } catch (error) {
      setSend(true);
      setSendError(true);
      console.log(error, 'error')
    }
  };
  const alert = send ? (
    sendError ? (
      <Alert text={t("alert.error")} type="error" />
    ) : (
      <Alert text={t("alert.success")} type="success" />
    )
  ) : null;
  return (
    <Card styleClass="p-3 mb-4">
      <h4 className="cardTitle">{t("sendPassword.title")}</h4>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, {setSubmitting}) => {
          setTimeout(() => {
            sendPass(values);
            setSend(true);
            setSendError(true);
            setSubmitting(false);
         }, 400);
        }}
      >
        {({isSubmitting, values}) => (
          <Form>
            <div className="d-flex flex-wrap">
            {t("sendPassword.indications")}
            </div>
            <div className="d-flex flex-wrap flex-md-nowrap w-100">
              <div className="col-12 flex-fill mb-3">{alert}</div>
              <div className="col-12 col-md-auto text-end px-md-3">
              <div className="mb-3 col-12 col-md-4 d-none">
                  <TextInputFormik type="text" value={"email"} variant="bootstrap"/>
                </div>
                <Button text={t("sendPassword.send")} className="w-100" buttonType={"light"} disabled={isSubmitting} asSubmit>
                  <FaPaperPlane />
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default SendPassword;
