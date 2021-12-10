import styles from './Card.module.scss'
import classNames from 'classnames'

const Card = ({children, styleClass}) => {
  const classes = classNames({
    [styles.centered]: styleClass === 'centered',
  }, styleClass);

  return (
    <div className={`${styles.card} ${classes}`}>
      {children}
    </div>
  )
}

export default Card
