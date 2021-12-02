import Link from 'next/link'
import classNames from 'classnames';
import styles from './Button.module.scss'

const Button = ({text, buttonType, callback, asLink, active, path, className}) => {

  const classes = classNames({
    [styles.button_secondary]: buttonType === 'button',
    [styles.button_secondary]: buttonType === 'secondary',
    [styles.button_light]: buttonType === 'light',
    [styles.button_transparent]: buttonType === 'transparent',
    [styles.link]: buttonType === 'link',
    [styles.active]: active === true,
  }, buttonType);

  const classNameProp = className ? className : '';

  const link = asLink ? 
    <Link href={path}>
      <a className={`${classNameProp} ${classes}`} >{text}</a>
    </Link>  
    : 
    <button className={styles.button, classes} onClick={callback}>{text}</button>;
  
  return( 
    <>
      {link} 
    </>
  )
}

export default Button
