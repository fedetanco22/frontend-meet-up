import React from "react";

import styles from "./Loading.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading}>
      <div className={`spinner-border ${styles.spinner}`} role="status"></div>
    </div>
  );
};

export default Loading;
