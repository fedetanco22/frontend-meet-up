import Link from 'next/link'
import classNames from 'classnames';
import styles from './IconButton.module.scss'

const IconButton = ({
  children,
  path,
  buttonType,
}) => {

  const classes = classNames({
    [styles.blue]: buttonType === 'blue',
    [styles.green]: buttonType === 'green',
    [styles.red]: buttonType === 'red',
    
  }, buttonType);

  return( 
    <>
    <Link href={path}>
      <a className={`${styles.iconButton} ${classes}`} >{children}</a>
    </Link> 
    </>
  )
}

export default IconButton
