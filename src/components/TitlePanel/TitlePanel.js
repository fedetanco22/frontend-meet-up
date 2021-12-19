import React from 'react'
import Link from 'next/link'
import styles from "./TitlePanel.module.scss";

const TitlePanel = ({title}) => {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <nav>
        <ul className={styles.breadcrumb}>
          <li><Link href='/' >Home</Link> / </li>
          <li className={styles.active}>{title}</li>
        </ul>
      </nav>
    </div>
  )
}

export default TitlePanel
