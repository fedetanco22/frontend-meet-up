import React from "react";
import {useTranslations} from "next-intl";
import Accordion from "react-bootstrap/Accordion";
import styles from "../CourseView/CourseView.module.scss";

const Module = ({modules}) => {
  const t = useTranslations("courseView");
  return (
    <div className="p-3 accordion-panel">
      <h3 className={styles.title}>{t("module.title")}</h3>
      <Accordion defaultActiveKey="0">
      {modules?.map((item, idx) => (
        <Accordion.Item eventKey={idx} key={item.module_id}>
          <Accordion.Header>{item.title}</Accordion.Header>
          <Accordion.Body>
          {item.description}
          </Accordion.Body>
        </Accordion.Item>
        
      ))}
      </Accordion>
    </div>
  );
};

export default Module;