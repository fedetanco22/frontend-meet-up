import React from "react";
import Link from "next/link";
import styles from "./Breadcrumb.module.scss";

const Breadcrumb = ({title, child}) => {
  return (
    <nav>
      <ul className={styles.breadcrumb}>
        <li>
          <Link href="/">Home</Link> /{" "}
        </li>
        {child && <li className={styles.active}><Link href={child.path}>{child.name}</Link> /{" "}</li>}
        <li className={styles.active}>{title}</li>
      </ul>
    </nav>
  );
};

export default Breadcrumb;
