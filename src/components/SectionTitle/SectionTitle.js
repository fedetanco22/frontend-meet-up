import styles from './SectionTitle.module.scss'

const SectionTitle = ({title, subTitle}) => {
  return (
    <div className={`${styles.titleSection}`}>
      <h2 data-aos="fade-up" className={styles.title}>{title}</h2>
      <p data-aos="flip-up" className={styles.subTitle}>{subTitle}</p>
    </div>
  )
}

export default SectionTitle
