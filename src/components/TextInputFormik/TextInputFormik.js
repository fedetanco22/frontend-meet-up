import classNames from "classnames";
import {Field, ErrorMessage} from "formik";
import styles from "./TextInputFormik.module.scss";


const TextInputFormik = ({type, placeholder,value, classes, variant, label}) => {
  const classesVariant = classNames(
    {
      [styles.input]: variant === "login",
      ["form-control"]: variant === "bootstrap",
    },
    variant
  );
  const labelInput = label !== undefined ? <label className={styles.label}>{label}</label> : null;
  return (
    <div className={classes ? classes : styles.container}>
      {labelInput}
      <Field type={type} name={value} placeholder={placeholder} className={classesVariant}/>
      <ErrorMessage name={value} component="small" className={styles.error}/>
    </div>
  );
};

export default TextInputFormik;
