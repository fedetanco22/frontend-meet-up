import {useEffect} from "react";
import {useState} from "react";
import {useTranslations} from "next-intl";
import {Card, Button, TextInputFormik, Alert, Loading, AddImage} from "../../components";
import useAppContext from "../../context/useAppContext";
import axios from "axios";
import router from "next/router";
import Accordion from "react-bootstrap/Accordion";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import Moment from "react-moment";
import {FaSave, FaPlus, FaTrashAlt} from "react-icons/fa";
import styles from "./CourseEdit.module.scss";

const CourseEdit = ({editCourseId, edit}) => {
  const t = useTranslations("courseEdit");

  const {user, setUser} = useAppContext();
  const [curseId, setCurseId] = useState(editCourseId);
  const [isCourseEn, setIsCourseEn] = useState({});
  const [isCourseEs, setIsCourseEs] = useState({});
  const [isPending, setIsPending] = useState(false);
  const [isCharged, setIsCharged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialValues, setIsInitialValues] = useState({});
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [arrayDelete, setArrayDelete] = useState([]);
  const [arrayDeleteSchedule, setArrayDeleteSchedule] = useState([]);
  const [usersFilters, setUsersFilters] = useState([]);
  const ufilter = usersFilters;
  const cursoEn = isCourseEn;
  const cursoEs = isCourseEs;
  const cursoID = curseId;
  const initialValues = isInitialValues;

  useEffect(() => {
    console.log(curseId, "id curse");
    getUsers();
    if (curseId !== undefined && curseId !== null) {
      getCourse();
    } else {
      initialValues = {
        title: "",
        title_es: "",
        level: "",
        level_es: "",
        description: "",
        description_es: "",
        duration: "",
        duration_es: "",
        price: "",
        schedules: [],
        modules: [],
      };
      setIsInitialValues(initialValues);
      setIsCharged(true);
      console.log(isInitialValues, "initial en effect");
    }
  }, [curseId]);

  const validations = Yup.object({
    title: Yup.string()
      .min(3, t("form.validations.title.min"))
      .max(50, t("form.validations.title.max"))
      .required(t("form.validations.title.required")),
    title_es: Yup.string()
      .min(3, t("form.validations.title.min"))
      .max(50, t("form.validations.title.max"))
      .required(t("form.validations.title.required")),
    level: Yup.string()
      .min(3, t("form.validations.level.min"))
      .max(50, t("form.validations.level.max"))
      .required(t("form.validations.level.required")),
    level_es: Yup.string()
      .min(3, t("form.validations.level.min"))
      .max(50, t("form.validations.level.max"))
      .required(t("form.validations.level.required")),
    description: Yup.string()
      .min(3, t("form.validations.description.min"))
      .max(5000, t("form.validations.description.max"))
      .required(t("form.validations.description.required")),
    description_es: Yup.string()
      .min(3, t("form.validations.description.min"))
      .max(5000, t("form.validations.description.max"))
      .required(t("form.validations.description.required")),
    duration: Yup.string()
      .min(3, t("form.validations.duration.min"))
      .max(30, t("form.validations.duration.max"))
      .required(t("form.validations.duration.required")),
    duration_es: Yup.string()
      .min(3, t("form.validations.duration.min"))
      .max(30, t("form.validations.duration.max"))
      .required(t("form.validations.duration.required")),
    price: Yup.number().positive(t("form.validations.price.number")).integer(t("form.validations.price.number")),
    modules: Yup.array().of(
      Yup.object({
        title: Yup.string()
          .min(3, t("form.validations.title.min"))
          .max(50, t("form.validations.title.max"))
          .required(t("form.validations.title.required")),
        title_es: Yup.string()
          .min(3, t("form.validations.title.min"))
          .max(50, t("form.validations.title.max"))
          .required(t("form.validations.title.required")),
        description: Yup.string()
          .min(3, t("form.validations.description.min"))
          .max(5000, t("form.validations.description.max"))
          .required(t("form.validations.description.required")),
        description_es: Yup.string()
          .min(3, t("form.validations.description.min"))
          .max(5000, t("form.validations.description.max"))
          .required(t("form.validations.description.required")),
      })
    ),
    schedules: Yup.array().of(
      Yup.object({
        title: Yup.string()
          .min(3, t("form.validations.title.min"))
          .max(50, t("form.validations.title.max"))
          .required(t("form.validations.title.required")),
        title_es: Yup.string()
          .min(3, t("form.validations.title.min"))
          .max(50, t("form.validations.title.max"))
          .required(t("form.validations.title.required")),
        modality: Yup.string()
          .min(3, t("form.validations.modality.min"))
          .max(50, t("form.validations.modality.max"))
          .required(t("form.validations.modality.required")),
        modality_es: Yup.string()
          .min(3, t("form.validations.modality.min"))
          .max(5000, t("form.validations.modality.max"))
          .required(t("form.validations.modality.required")),
        time: Yup.string()
          .min(3, t("form.validations.time.min"))
          .max(50, t("form.validations.time.max"))
          .required(t("form.validations.time.required")),
        date_init: Yup.date().required(t("form.validations.data.required")),
      })
    ),
  });

  const alert = send ? (
    sendError ? (
      <Alert text={t("form.alert.error")} type="error" />
    ) : (
      <Alert text={t("form.alert.success")} type="success" />
    )
  ) : isPending ? (
    <Alert text={t("form.alert.warning")} type="warning" />
  ) : null;
  const textareaDescription = (props) => (
    <div>
      <label className="label">{t("form.description")}</label>
      <textarea className="form-control" rows="7" {...props}></textarea>
      <ErrorMessage name="description" component="small" className="error" />
    </div>
  );
  const textareaDescriptionES = (props) => (
    <div>
      <label className="label">{t("form.descriptionES")}</label>
      <textarea className="form-control" rows="7" {...props}></textarea>
      <ErrorMessage name="description_es" component="small" className="error" />
    </div>
  );
  const textareaModulesDescription = (props) => (
    <div>
      <label className="label">{t("form.modules.description")}</label>
      <textarea className="form-control" rows="7" {...props}></textarea>
    </div>
  );
  const textareaModulesDescriptionES = (props) => (
    <div>
      <label className="label">{t("form.modules.descriptionES")}</label>
      <textarea className="form-control" rows="7" {...props}></textarea>
    </div>
  );
  const dataInitSchedule = (props) => (
    <div>
      <label className="label">{t("form.schedules.start")}</label>
      <input type="date" className="form-control" {...props}></input>
      <ErrorMessage name="date_init" component="small" className="error" />
    </div>
  );
  const dataEndSchedule = (props) => (
    <div>
      <label className="label">{t("form.schedules.end")}</label>
      <input type="date" className="form-control" {...props}></input>
      <ErrorMessage name="date_end" component="small" className="error" />
    </div>
  );
  const dataInitRSchedule = (props) => (
    <div>
      <label className="label">{t("form.schedules.startR")}</label>
      <input type="date" className="form-control" {...props}></input>
    </div>
  );
  const dataEndRSchedule = (props) => (
    <div>
      <label className="label">{t("form.schedules.endR")}</label>
      <input type="date" className="form-control" {...props}></input>
    </div>
  );

  const getCourse = async () => {
    setIsCharged(false);
    setIsLoading(true);
    const urlEN = "http://164.92.76.51:3000/en/courses/full/" + cursoID;
    const urlES = "http://164.92.76.51:3000/en/courses/full/" + cursoID;
    try {
      const res = await axios.get(`${urlEN}`, {headers: {Authorization: `Bearer ${user.token}`}});
      if (res.status === 200) {
        setIsLoading(false);
        cursoEn = res.data.data;
        setIsCourseEn(cursoEn);
        console.log(cursoEn, "englis");
        try {
          const res = await axios.get(`${urlES}`, {headers: {Authorization: `Bearer ${user.token}`}});
          if (res.status === 200) {
            setIsLoading(false);
            cursoEs = res.data.data;
            setIsCourseEs(cursoEs);
            initialValues = {
              title: cursoEn?.course?.title,
              title_es: cursoEs?.course?.title,
              level: cursoEn?.course?.level,
              level_es: cursoEs?.course?.level,
              description: cursoEn?.course?.description,
              description_es: cursoEs?.course?.description,
              duration: cursoEn?.course?.duration,
              duration_es: cursoEs?.course?.duration,
              price: cursoEn?.course?.price,
              schedules: [],
              modules: [],
            };
            cursoEn.modules?.map((item, idx) => {
              initialValues.modules[idx] = item;
              initialValues.modules[idx].title = item?.title;
              initialValues.modules[idx].title_es = cursoEs?.modules[idx]?.title;
              initialValues.modules[idx].description = item?.description;
              initialValues.modules[idx].description_es = cursoEs?.modules[idx]?.description;
              initialValues.modules[idx].number = item?.number;
              initialValues.modules[idx].module_id = item?.module_id;
              initialValues.modules[idx].course_id = Number(cursoID);
            });
            cursoEn.schedules?.map((item, idx) => {
              const arrayDaysNum = [];
              const arrayDays = item.days.split(";");
              console.log(item.days, "dias");
              console.log(arrayDays);
              arrayDays?.map((item) => {
                switch (item) {
                  case "Monday":
                    arrayDaysNum.push("0");
                    break;
                  case "Tuesday":
                    arrayDaysNum.push("1");
                    break;
                  case "Wednesday":
                    arrayDaysNum.push("2");
                    break;
                  case "Thursday":
                    arrayDaysNum.push("3");
                    break;
                  case "Friday":
                    arrayDaysNum.push("4");
                    break;
                  case "Saturday":
                    arrayDaysNum.push("5");
                    break;
                  case "Sunday":
                    arrayDaysNum.push("6");
                    break;
                  default:
                    break;
                }
              });
              console.log(arrayDaysNum);

              initialValues.schedules[idx] = item;
              initialValues.schedules[idx].title = item?.title;
              initialValues.schedules[idx].title_es = cursoEs?.schedules[idx]?.title;
              initialValues.schedules[idx].modality = item?.modality;
              initialValues.schedules[idx].modality_es = cursoEs?.schedules[idx]?.modality;
              initialValues.schedules[idx].time = item?.time;
              initialValues.schedules[idx].days = arrayDaysNum;
              initialValues.schedules[idx].date_init = item?.date_init?.slice(0, 10);
              initialValues.schedules[idx].date_end = item?.date_end?.slice(0, 10);
              initialValues.schedules[idx].date_registration_init = item?.date_registration_init?.slice(0, 10);
              initialValues.schedules[idx].date_registration_end = item?.date_registration_end?.slice(0, 10);
              initialValues.schedules[idx].teacher_id = item?.teacher_id;
              initialValues.schedules[idx].link_docs = item?.link_docs;
              initialValues.schedules[idx].link_class = item?.link_class;

              initialValues.schedules[idx].schedule_id = item?.schedule_id;
              initialValues.schedules[idx].course_id = Number(cursoID);
            });
            console.log(initialValues, "initial en get curse");
            setIsInitialValues(initialValues);
            setIsCharged(true);
          }
        } catch (error) {
          if (error.response?.status === 403) {
            setUser(null);
            router.push("/");
          }
          console.log("error:", error);
          setIsLoading(false);
        }
      }
    } catch (error) {
      if (error.response?.status === 403) {
        setUser(null);
        router.push("/");
      }
      console.log(error.response.status, "resp");
      console.log("error:", error);
      setIsLoading(false);
    }
  };
  const getUsers = async () => {
    setIsLoading(true);
    if (user?.data?.role === "Administrator") {
      const url = "http://164.92.76.51:3000/users";
      try {
        const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
        if (res.status === 200) {
          setIsLoading(false);
          ufilter = res.data?.data;
          setUsersFilters(ufilter);
          setUsersFilters(ufilter.filter((e) => e.role_id === 0 || e.role_id === 1));
          ufilter = usersFilters;
          console.log(ufilter, "filtrados");
        }
      } catch (error) {
        if (error?.response?.status === 403) {
          setUser(null);
          router.push("/");
        }
        console.log(error, "error");
        setIsLoading(false);
      }
    }
  };
  const handleData = async (values) => {
    console.log(values, "valores a enviar");
    const datos = {
      title: `${values.title}`,
      title_es: `${values.title_es}`,
      level: `${values.level}`,
      level_es: `${values.level_es}`,
      description: `${values.description}`,
      description_es: `${values.description_es}`,
      duration: `${values.duration}`,
      duration_es: `${values.duration_es}`,
      price: `${values.price}`,
      schedules: [],
      modules: [],
    };
    values.modules?.map((item, idx) => {
      datos.modules.push({
        title: item.title,
        title_es: item.title_es,
        description: item.description,
        description_es: item.description_es,
        number: idx.toString(),
        course_id: Number(cursoID),
      });
    });
    values.schedules?.map((item, idx) => {
      const arrayDays = "";
      const arrayDaysEs = "";
      item.days.map((item) => {
        switch (item) {
          case "0":
            arrayDays = arrayDays + "Monday;";
            arrayDaysEs = arrayDaysEs + "Lunes;";
            break;
          case "1":
            arrayDays = arrayDays + +"Tuesday;";
            arrayDaysEs = arrayDaysEs + "Martes;";
            break;
          case "2":
            arrayDays = arrayDays + "Wednesday;";
            arrayDaysEs = arrayDaysEs + "Miercoles;";
            break;
          case "3":
            arrayDays = arrayDays + "Thursday;";
            arrayDaysEs = arrayDaysEs + "Jueves;";
            break;
          case "4":
            arrayDays = arrayDays + "Friday;";
            arrayDaysEs = arrayDaysEs + "Viernes;";
            break;
          case "5":
            arrayDays = arrayDays + "Saturday;";
            arrayDaysEs = arrayDaysEs + "Sábado;";
            break;
          case "6":
            arrayDays = arrayDays + "Sunday;";
            arrayDaysEs = arrayDaysEs + "Domingo;";
            break;
          default:
            break;
        }
      });
      datos.schedules.push({
        title: item.title,
        title_es: item.title_es,
        date_init: item.date_init,
        date_end: item.date_end,
        date_registration_end: item.date_registration_end,
        date_registration_init: item.date_registration_init,
        link_class: item.link_class,
        link_docs: item.link_docs,
        modality: item.modality,
        modality_es: item.modality,
        time: item.time,
        teacher_id: item.teacher_id,
        days: arrayDays,
        days_es: arrayDaysEs,
        course_id: Number(cursoID),
      });
    });
    console.log(datos, "datos");
    if (cursoID === undefined || cursoID === null) {
      const url = "http:///164.92.76.51:3000/courses/add";
      try {
        const res = await axios.post(url, datos, {headers: {"Content-Type": "application/json", Authorization: `Bearer ${user.token}`}});
        if (res.status === 201) {
          console.log(res, "guardado ok");
          cursoID = res.data.course_id;
          setCurseId(cursoID);
          console.log(curseId, "curse id en hanlde");
          if (cursoID !== undefined && cursoID !== null) {
            getCourse();
          }
          setSend(true);
          setSendError(false);
          setIsPending(false);
        } else console.log(res, "respuesta");
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
    } else {
      const url = "http:///164.92.76.51:3000/courses/" + cursoID;
      try {
        const res = await axios.patch(url, datos, {headers: {"Content-Type": "application/json", Authorization: `Bearer ${user.token}`}});
        if (res.status === 200) {
          console.log(res, "guardado ok el edit curse");
          setSend(true);
          setSendError(false);
          setIsPending(false);
        } else console.log(res, "respuesta");
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
      if (values.modules.length > 0) {
        values.modules.forEach(async (item, idx) => {
          if (item.module_id === undefined) {
            const urlModule = "http:///164.92.76.51:3000/modules/add";
            try {
              const res = await axios.post(urlModule, datos.modules[idx], {
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${user.token}`},
              });
              if (res.status === 200) {
                console.log(res, "modulo nuevo guardado ok");
              }
            } catch (error) {
              console.log(error);
              setSend(true);
              setSendError(true);
              setIsPending(false);
            }
          } else {
            const urlModule = "http:///164.92.76.51:3000/modules/" + item.module_id;
            console.log(datos.modules[idx], "datos de modulo");
            try {
              const res = await axios.patch(urlModule, datos.modules[idx], {
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${user.token}`},
              });
              if (res.status === 200) {
                console.log(res, "modulo editado guardado ok");
              }
            } catch (error) {
              console.log(error);
              setSend(true);
              setSendError(true);
              setIsPending(false);
            }
          }
        });
      }
      if (values.schedules.length > 0) {
        values.schedules.forEach(async (item, idx) => {
          if (item.schedule_id === undefined) {
            const urlschedule = "http:///164.92.76.51:3000/schedules/add";
            try {
              const res = await axios.post(urlschedule, datos.schedules[idx], {
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${user.token}`},
              });
              if (res.status === 200) {
                console.log(res, "schedule nuevo guardado ok");
              }
            } catch (error) {
              console.log(error);
              setSend(true);
              setSendError(true);
              setIsPending(false);
            }
          } else {
            const urlschedule = "http:///164.92.76.51:3000/schedules/" + item.schedule_id;
            console.log(datos.schedules[idx], "datos de schedule");
            try {
              const res = await axios.patch(urlschedule, datos.schedules[idx], {
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${user.token}`},
              });
              if (res.status === 200) {
                console.log(res, "schedule editado guardado ok");
              }
            } catch (error) {
              console.log(error);
              setSend(true);
              setSendError(true);
              setIsPending(false);
            }
          }
        });
      }
      arrayDeleteSchedule?.forEach(async (item) => {
        if (item !== undefined && item !== null) {
          const urlDelete = "http:///164.92.76.51:3000/schedules/" + item;
          try {
            const res = await axios.delete(urlDelete, {headers: {"Content-Type": "application/json", Authorization: `Bearer ${user.token}`}});
            if (res.status === 200) {
              console.log(res, "schedule borrado ok");
            }
          } catch (error) {
            console.log(error);
            setSend(true);
            setSendError(true);
            setIsPending(false);
          }
        } else {
          return null;
        }
      });
      arrayDelete?.forEach(async (item) => {
        if (item !== undefined && item !== null) {
          const urlDelete = "http:///164.92.76.51:3000/modules/" + item;
          try {
            const res = await axios.delete(urlDelete, {headers: {"Content-Type": "application/json", Authorization: `Bearer ${user.token}`}});
            if (res.status === 200) {
              console.log(res, "modulo borrado ok");
            }
          } catch (error) {
            console.log(error);
            setSend(true);
            setSendError(true);
            setIsPending(false);
          }
        } else {
          return null;
        }
      });
    }
  };

  const deleteModule = (values, idx) => {
    console.log(values, "values q recibo");
    if (cursoID !== undefined && cursoID !== null) {
      console.log(values.modules[idx]?.module_id, "ID");
      const updateArray = [...arrayDelete, values.modules[idx]?.module_id];
      setArrayDelete(updateArray);
      console.log(arrayDelete, "array");
      setIsPending(true);
    }

    for (let i = idx; i < values.modules?.length; i++) {
      values.modules[i] = values.modules[i + 1];
    }

    values.modules?.pop();
    setIsInitialValues(values);
    console.log(values, "values en delete");
  };
  const deleteSchedule = (values, idx) => {
    console.log(values, "values q recibo");
    if (cursoID !== undefined && cursoID !== null) {
      console.log(values.schedules[idx]?.schedule_id, "ID");
      const updateArray = [...arrayDeleteSchedule, values.schedules[idx]?.schedule_id];
      setArrayDeleteSchedule(updateArray);
      console.log(arrayDeleteSchedule, "array");
      setIsPending(true);
    }

    for (let i = idx; i < values.schedules?.length; i++) {
      values.schedules[i] = values.schedules[i + 1];
    }

    values.schedules?.pop();
    setIsInitialValues(values);
    console.log(values, "values en delete");
  };
  const addModule = (values) => {
    if (cursoID !== undefined && cursoID !== null) {
      values.modules?.push({});
      setIsInitialValues(values);
      console.log(isInitialValues);
      console.log(values, "values");
    } else {
      initialValues.modules?.push({});
      setIsInitialValues(initialValues);
      console.log(isInitialValues);
      console.log(initialValues, "initials");
    }
  };
  const addSchedule = (values) => {
    if (cursoID !== undefined && cursoID !== null) {
      values.schedules?.push({});
      setIsInitialValues(values);
      console.log(isInitialValues);
      console.log(values, "values");
    } else {
      initialValues.schedules?.push({});
      setIsInitialValues(initialValues);
      console.log(isInitialValues);
      console.log(initialValues, "initials");
    }
  };
  return (
    <>
      <Card styleClass="px-3">
        {isLoading && <Loading />}
        <div className="d-flex flex-wrap ">
          <div className="col-12 col-md p-4 my-3">
            <h3 className="cardTitle">{t("title")}</h3>
            {((edit && isCharged) || (!edit && isCharged)) && (
              <Formik
                initialValues={initialValues}
                validationSchema={validations}
                onSubmit={(values, {setSubmitting}) => {
                  setTimeout(() => {
                    // handleData(values);
                    setSubmitting(false);
                  }, 400);
                }}
              >
                {({isSubmitting, isValid, initialValues, values}) => (
                  <Form>
                    {setIsPending(initialValues !== values)}
                    {}
                    <div className="col-12 d-flex flex-wrap">
                      <div className="mb-3 col-12 col-md-6 col-xl-4">
                        <TextInputFormik type="text" value="title" variant="bootstrap" label={t("form.title")} />
                      </div>
                      <div className="mb-3 col-12 col-md-6 col-xl-4 ps-md-4">
                        <TextInputFormik type={"text"} value={"title_es"} variant="bootstrap" label={t("form.titleES")} />
                      </div>
                    </div>
                    <div className="col-12 d-flex flex-wrap">
                      <div className="mb-3 col-12 col-md-6 col-xl-4">
                        <TextInputFormik type="text" value="level" variant="bootstrap" label={t("form.level")} />
                      </div>
                      <div className="mb-3 col-12 col-md-6 col-xl-4 ps-md-4">
                        <TextInputFormik type={"text"} value={"level_es"} variant="bootstrap" label={t("form.levelES")} />
                      </div>
                    </div>
                    <div className="col-12 d-flex flex-wrap">
                      <div className="mb-3 col-12 col-md-6 col-xl-4">
                        <Field name="description" as={textareaDescription} />
                      </div>
                      <div className="mb-3 col-12 col-md-6 col-xl-4 ps-md-4">
                        <Field name="description_es" as={textareaDescriptionES} />
                      </div>
                    </div>
                    <div className="col-12 d-flex flex-wrap">
                      <div className="mb-3 col-12 col-md-6 col-xl-4">
                        <TextInputFormik type="text" value="duration" variant="bootstrap" label={t("form.duration")} />
                      </div>
                      <div className="mb-3 col-12 col-md-6 col-xl-4 ps-md-4">
                        <TextInputFormik type={"text"} value={"duration_es"} variant="bootstrap" label={t("form.durationES")} />
                      </div>
                    </div>
                    <div className="col-12 d-flex flex-wrap">
                      <div className="mb-3 col-12 col-md-6 col-xl-4">
                        <TextInputFormik type="text" value="price" variant="bootstrap" label={t("form.price")} />
                      </div>
                    </div>
                    <div className="col-12 col-xl-8 mb-3">
                      {isInitialValues.schedules?.map((item, idx) => {
                        return (
                          <div key={idx} className="py-1 accordion-panel">
                            <Accordion defaultActiveKey={idx}>
                              <Accordion.Item eventKey={idx}>
                                <Accordion.Header>
                                  {t("form.schedules.schedule")} {idx}
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="col-12 d-flex flex-wrap">
                                    <div className="mb-3 col-12 col-md-6">
                                      <TextInputFormik
                                        type="text"
                                        value={`schedules[${idx}].title`}
                                        variant="bootstrap"
                                        label={t("form.schedules.title")}
                                      />
                                    </div>
                                    <div className="mb-3 col-12 col-md-6 ps-md-4">
                                      <TextInputFormik
                                        type="text"
                                        value={`schedules[${idx}].title_es`}
                                        variant="bootstrap"
                                        label={t("form.schedules.titleES")}
                                      />
                                    </div>
                                  </div>

                                  <div className="col-12 d-flex flex-wrap">
                                    <div className="mb-3 col-12 col-md-6">
                                      <Field name={`schedules[${idx}].date_init`} as={dataInitSchedule} />
                                    </div>
                                    <div className="mb-3 col-12 col-md-6 ps-md-4">
                                      <Field name={`schedules[${idx}].date_end`} as={dataEndSchedule} />
                                    </div>
                                  </div>
                                  <div className="col-12 d-flex flex-wrap">
                                    <div className="mb-3 col-12 col-md-6">
                                      <Field name={`schedules[${idx}].date_registration_init`} as={dataInitRSchedule} />
                                    </div>
                                    <div className="mb-3 col-12 col-md-6 ps-md-4">
                                      <Field name={`schedules[${idx}].date_registration_end`} as={dataEndRSchedule} />
                                    </div>
                                  </div>
                                  <div className="col-12 d-flex flex-wrap">
                                    <div className="mb-3 col-12 col-md-6">
                                      <TextInputFormik
                                        type="text"
                                        value={`schedules[${idx}].time`}
                                        variant="bootstrap"
                                        label={t("form.schedules.time")}
                                      />
                                    </div>
                                    {ufilter?.length > 0 && (
                                      <div className="mb-3 col-12 col-md-6 ps-md-4 ">
                                        <label className="label">{t("form.schedules.teacher")}</label>
                                        <Field name={`schedules[${idx}].teacher_id`} as="select" class="form-select">
                                          <option selected>Select option</option>
                                          {ufilter.map((item) => {
                                            return (
                                              <option key={item.user_id} value={item.user_id}>
                                                {item.last_name}, {item.name}
                                              </option>
                                            );
                                          })}
                                        </Field>
                                      </div>
                                    )}
                                  </div>
                                  <div className="col-12 d-flex flex-wrap">
                                    <div className="mb-3 col-12 col-md-6">
                                      <TextInputFormik
                                        type="text"
                                        value={`schedules[${idx}].modality`}
                                        variant="bootstrap"
                                        label={t("form.schedules.modality")}
                                      />
                                    </div>
                                    <div className="mb-3 col-12 col-md-6 ps-md-4">
                                      <TextInputFormik
                                        type="text"
                                        value={`schedules[${idx}].modality_es`}
                                        variant="bootstrap"
                                        label={t("form.schedules.modalityES")}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 d-flex flex-wrap">
                                    <div className="mb-3 col-12 col-md-6">
                                      <TextInputFormik
                                        type="text"
                                        value={`schedules[${idx}].link_docs`}
                                        variant="bootstrap"
                                        label={t("form.schedules.linkDrive")}
                                      />
                                    </div>
                                    <div className="mb-3 col-12 col-md-6 ps-md-4">
                                      <TextInputFormik
                                        type="text"
                                        value={`schedules[${idx}].link_class`}
                                        variant="bootstrap"
                                        label={t("form.schedules.linkZoom")}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 d-flex flex-wrap">
                                    <div
                                      role="group"
                                      className="mb-3 col-12 d-flex flex-column flex-md-row flex-wrap flex-md-nowrap"
                                      aria-labelledby="checkbox-group"
                                    >
                                      <label className={styles.radio}>
                                        <Field type="checkbox" name={`schedules[${idx}].days`} value="0" />
                                        {t("form.schedules.week.mon")}
                                      </label>
                                      <label className={styles.radio}>
                                        <Field type="checkbox" name={`schedules[${idx}].days`} value="1" />
                                        {t("form.schedules.week.tue")}
                                      </label>
                                      <label className={styles.radio}>
                                        <Field type="checkbox" name={`schedules[${idx}].days`} value="2" />
                                        {t("form.schedules.week.wed")}
                                      </label>
                                      <label className={styles.radio}>
                                        <Field type="checkbox" name={`schedules[${idx}].days`} value="3" />
                                        {t("form.schedules.week.thu")}
                                      </label>
                                      <label className={styles.radio}>
                                        <Field type="checkbox" name={`schedules[${idx}].days`} value="4" />
                                        {t("form.schedules.week.fri")}
                                      </label>
                                      <label className={styles.radio}>
                                        <Field type="checkbox" name={`schedules[${idx}].days`} value="5" />
                                        {t("form.schedules.week.sat")}
                                      </label>
                                      <label className={styles.radio}>
                                        <Field type="checkbox" name={`schedules[${idx}].days`} value="6" />
                                        {t("form.schedules.week.sun")}
                                      </label>
                                    </div>
                                  </div>
                                  <button type="submit" onClick={() => deleteSchedule(values, idx)} className={styles.btn__add}>
                                    <FaTrashAlt />
                                    {t("form.deleteSchedule")}
                                  </button>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </div>
                        );
                      })}
                      <button type="submit" onClick={() => addSchedule(values)} className={styles.btn__add}>
                        <FaPlus />
                        {t("form.addSchedule")}
                      </button>
                    </div>
                    <div className="col-12 col-xl-8 mb-3">
                      {isInitialValues.modules?.map((item, idx) => {
                        return (
                          <div key={idx} className="py-1 accordion-panel">
                            <Accordion defaultActiveKey={idx}>
                              <Accordion.Item eventKey={idx}>
                                <Accordion.Header>
                                  {t("form.modules.module")} {idx}
                                </Accordion.Header>
                                <Accordion.Body>
                                  <div className="col-12 d-flex flex-wrap">
                                    <div className="mb-3 col-12 col-md-6">
                                      <TextInputFormik
                                        type="text"
                                        value={`modules[${idx}].title`}
                                        variant="bootstrap"
                                        label={t("form.modules.title")}
                                      />
                                    </div>
                                    <div className="mb-3 col-12 col-md-6 ps-md-4">
                                      <TextInputFormik
                                        type="text"
                                        value={`modules[${idx}].title_es`}
                                        variant="bootstrap"
                                        label={t("form.modules.titleES")}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-12 d-flex flex-wrap">
                                    <div className="mb-3 col-12 col-md-6">
                                      <Field name={`modules[${idx}].description`} as={textareaModulesDescription} />
                                    </div>
                                    <div className="mb-3 col-12 col-md-6 ps-md-4">
                                      <Field name={`modules[${idx}].description_es`} as={textareaModulesDescriptionES} />
                                    </div>
                                  </div>
                                  <button type="submit" onClick={() => deleteModule(values, idx)} className={styles.btn__add}>
                                    <FaTrashAlt />
                                    {t("form.deleteModule")}
                                  </button>
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </div>
                        );
                      })}
                      <button type="submit" onClick={() => addModule(values)} className={styles.btn__add}>
                        <FaPlus />
                        {t("form.addModule")}
                      </button>
                    </div>

                    <div className="d-flex flex-wrap flex-md-nowrap w-100 border-top pt-3">
                      <div className="col-12 flex-fill mb-3">{alert}</div>
                      <div className="col-12 col-md-auto text-end px-md-3">
                        {/* <button type="submit" onClick={ () => handleData(values) }>
                  <FaSave />
                  {t("form.submit")}
                  </button> */}
                        <Button
                          text={t("form.submit")}
                          className="w-100"
                          buttonType={"light"}
                          disabled={isSubmitting || !isValid}
                          callback={() => handleData(values)}
                          asSubmit
                        >
                          <FaSave />
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      </Card>
      {cursoID && isCharged ? <AddImage editCourseId={cursoID} image={cursoEn?.course?.image} /> : null}
    </>
  );
};

export default CourseEdit;
