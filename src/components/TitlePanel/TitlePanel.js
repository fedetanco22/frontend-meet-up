import React from 'react'
import Link from 'next/link'
import styles from "./TitlePanel.module.scss";
import { Breadcrumb } from '..';

const TitlePanel = ({title, child}) => {
  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <Breadcrumb title={title} child={child}/>
    </div>
  )
}

export default TitlePanel
