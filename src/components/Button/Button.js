import Link from 'next/link'
import classNames from 'classnames';
import styles from './Button.module.scss'

const Button = ({
  text,
  buttonType,
  callback,
  asLink,
  asSubmit,
  linkAsButton,
  active,
  path,
  className
}) => {

  const classes = classNames({
    [styles.button]: buttonType === 'button',
    [styles.button_secondary]: buttonType === 'secondary',
    [styles.button_light]: buttonType === 'light',
    [styles.button_transparent]: buttonType === 'transparent',
    [styles.link]: buttonType === 'link',
    [styles.button_blue]: buttonType === 'blue',
    [styles.button_blue_small]: buttonType === 'blue_small',
    [styles.button_outline_ligth]: buttonType === 'outline_ligth',
    [styles.button_white]: buttonType === 'white',
    [styles.button_white_primary]: buttonType === 'white_primary',
    [styles.button_white_secondary]: buttonType === 'white_secondary',
    [styles.active]: active === true,
  }, buttonType);

  const classNameProp = className ? className : '';

  const link = asLink &&
    <Link href={path}>
      <a className={`${classNameProp} ${classes}`} >{text}</a>
    </Link> 

  const submit = asSubmit && 
    <button className={`${classes} ${styles.button}`}  onClick={callback}>{text}</button>;

  const button = linkAsButton &&
    <Link href={path}>
      <a className={`${classNameProp} ${classes}`} >{text}</a>
      
    </Link>  

  return( 
    <>
      {link} 
      {submit}
      {button}
    </>
  )
}

export default Button
