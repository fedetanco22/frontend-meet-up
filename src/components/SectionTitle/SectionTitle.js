import styles from './SectionTitle.module.scss'

const SectionTitle = ({title, subTitle}) => {
  return (
    <div className={`${styles.titleSection}`}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.subTitle}>{subTitle}</p>
    </div>
  )
}

export default SectionTitle
