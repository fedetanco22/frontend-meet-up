import React from "react";
import {Card, Button} from "../index";
import {useTranslations} from "next-intl";
import Image from "next/image";
import courseImage from "../../../public/course-image.png";

import styles from "./CardCourse.module.scss";

const CardCourse = ({course}) => {
  const t = useTranslations("cardCourse");
  console.log(course, "curso en card");

  const foto =
    course.image?.length > 0 ? (
      <Image
        src={`http://164.92.76.51:3000/coursesImages/${course.image}`}
        alt={course.title}
        layout="fill"
        objectFit="cover"
        objectPosition="50% 50%"
        quality={100}
      />
    ) : (
      <Image src={courseImage} alt={course.title} priority layout="fill" objectFit="cover" objectPosition="50% 50%" quality={100} />
    );

  // src={`http://164.92.76.51:3000/coursesImages/${course.image}`}

  return (
    <Card styleClass="mb-4 pb-0">
      <div className={`d-flex ${styles.cardCourse}`}>
        <div className={`col-12 col-md-4 ${styles.image}`}>{foto}</div>
        <div className="col-12 col-md-8 p-4">
          <h3 className={styles.title}>{course.title}</h3>
          <p className={styles.text}>{course.description}</p>
          <div className="d-flex justify-content-end w-100 border-top mt-3">
            <Button
              path={{
                pathname: "/all-courses/[courseId]",
                query: {courseId: course.course_id},
              }}
              asLink
              buttonType="blue_small"
              className="mt-3"
              text={t("button")}
            ></Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardCourse;
