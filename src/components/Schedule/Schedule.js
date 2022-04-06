import React from "react";
import {useTranslations} from "next-intl";
import {Button} from "../../components";
import {FaUsers, FaVideo, FaFolderOpen} from "react-icons/fa";
import Accordion from "react-bootstrap/Accordion";
import Moment from "react-moment";
import styles from "../CourseView/CourseView.module.scss";

const Schedule = ({schedules, role}) => {
  const t = useTranslations("courseView");
  return (
    <div className="p-3 accordion-panel">
      <h3 className={styles.title}>{t("schedule.title")}</h3>
      <Accordion defaultActiveKey="0">
        {schedules?.map((item, idx) => (
          <Accordion.Item eventKey={idx} key={item.schedule_id}>
            <Accordion.Header>{item.title}</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex flex-wrap">
                <div className="col-12 col-md-6">
                  <ul>
                    <li>
                      {t("schedule.day")}: {item.days}
                    </li>
                    <li>
                      {t("schedule.time")}: {item.time}{" "}
                    </li>
                    <li>
                      {t("schedule.start")}: <Moment format="DD/MM/YY" date={item.date_init} />
                    </li>
                    <li>
                      {t("schedule.end")}: <Moment format="DD/MM/YY" date={item.date_end} />
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-md-6">
                  <ul>
                    <li>
                      {t("schedule.teacher")}: {item.last_name}, {item.name}
                    </li>
                    <li>
                      {t("schedule.modality")}: {item.modality}{" "}
                    </li>
                    {role === 1 ? (
                      <>
                        <li>
                          {t("schedule.registrationStart")}: <Moment format="DD/MM/YY" date={item.date_registration_inity} />
                        </li>
                        <li>
                          {t("schedule.registrationEnd")}: <Moment format="DD/MM/YY" date={item.date_registration_end} />
                        </li>
                      </>
                    ) : null}
                  </ul>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-stretch pt-3">
                <Button
                  path={item.link_class ? item.link_class : "/"}
                  buttonType="light"
                  className="mt-1 mx-md-2 flex-auto w-100"
                  asLink
                  text={t("onlineClass")}
                  disabled={item.link_class ? false : true}
                >
                  <FaVideo />
                </Button>
                <Button
                  path={item.link_docs ? item.link_docs : "/"}
                  buttonType="light"
                  className="mt-1 mx-md-2 flex-auto w-10"
                  asLink
                  text={t("openFiles")}
                  disabled={item.link_docs ? false : true}
                >
                  <FaFolderOpen />
                </Button>
                {role === 2 || role === 1 ? (
                  <Button path={"./course-edit"} buttonType="light" className="mt-1 flex-auto w-100" asLink text={t("enrolled")}>
                    <FaUsers />
                  </Button>
                ) : null}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Schedule;
