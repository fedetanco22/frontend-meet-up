import classNames from "classnames";
import styles from "./TextInput.module.scss";


const TextInput = ({type, placeholder, id, value, classes, handleChange, variant, label , required, validation ,}) => {
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
      <input type={type} placeholder={placeholder} id={id} value={value} className={classesVariant} onChange={(e) => handleChange(e.target.value)} required={required}/>
    
    </div>
  );
};

export default TextInput;
