import {useState} from "react";
import {useTranslations} from "next-intl";
import {Card, Schedule} from "../../components";
import useAppContext from "../../context/useAppContext";
import styles from "../CourseView/CourseView.module.scss";

const CourseViewStudent = ({course}) => {

  const t = useTranslations("courseView");
  const {user} = useAppContext();
  return (
    <Card styleClass="px-3">
     
      {course !== {} ? (
        <>
          {" "}
          <div className="d-flex flex-wrap border-bottom">
            <div className="col-12 col-md p-4 my-3">
              <h3 className={styles.title}>{course.course[0]?.title}</h3>
              <p>
                {t("level")}: {course.course[0]?.level}
              </p>
              <p>
                {t("duration")}: {course.course[0]?.duration}
              </p>
              <p className={styles.text}>{course.course[0]?.description}</p>
            </div>
          </div>
          <Schedule schedules={course.schedules} role={user?.data?.role_id} />
        </>
      ): null}

      {/* <Module modules={course.modules} /> */}
    </Card>
  );
};

export default CourseViewStudent;
