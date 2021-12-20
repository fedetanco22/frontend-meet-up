import React from 'react'
import classNames from 'classnames';
import styles from './Alert.module.scss'
import { FaExclamationTriangle, FaCheck, FaTimesCircle} from "react-icons/fa";

const Alert = ({type, text})=> {
  const classes = classNames({
    [styles.warning]: type === 'warning',
    [styles.error]: type === 'error',
    [styles.success]: type === 'success',

  });
  return (
    <div className={` ${styles.alert} ${classes}`}>
      {type === 'warning' && <FaExclamationTriangle/>}
      {type === 'success' && <FaCheck/>}
      {type === 'error' && <FaTimesCircle/>}
      {text}
    </div>
  )
}

export default Alert
