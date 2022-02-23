import Link from "next/link";
import classNames from "classnames";
import styles from "./IconButton.module.scss";

const IconButton = ({children, path, buttonType, className, asSubmit, asLink, callback}) => {
  const classes = classNames(
    {
      [styles.blue]: buttonType === "blue",
      [styles.green]: buttonType === "green",
      [styles.red]: buttonType === "red",
    },
    buttonType
  );
  const classNameProp = className ? className : "";
  const link = asLink && (
    <Link href={path}>
      <a className={`${styles.iconButton} ${classes} ${classNameProp}`}>{children}</a>
    </Link>
  );

  const submit = asSubmit && (
    <button className={`${styles.iconButton} ${classes} ${classNameProp}`} onClick={callback}>
      {children}
    </button>
  );
  return (
    <>
      {link}
      {submit}
    </>
  );
};

export default IconButton;
