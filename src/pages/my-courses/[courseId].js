import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {LayoutPanel, TitlePanel, Loading, CourseViewStudent} from "../../components";
import axios from "axios";
import useAppContext from "../../context/useAppContext";

const Course = () => {
  const router = useRouter();
  const t = useTranslations("courseView");
  const {user, setUser, endSesion} = useAppContext();
  const [isCourse, setIsCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {locale} = router;

  useEffect(() => {
    if (user !== null) {
      if (user?.data?.role === "Student") {
        getCourseStudent();
      } else {
        router.push("/404");
      }
    } else {
      router.push("/");
    }
  }, []);

  const id = router.query.courseId;
  const getCourseStudent = async () => {
    setIsLoading(true);
    const url = "http:///164.92.76.51:3000/students/inscriptions/" + id;
    try {
      const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
      if (res.status === 200 && res.data.data.length !== 0) {
        if ((res.data?.data[0]?.course[0]?.course_id).toString() === id) {
          setIsCourse(res.data?.data[0]);
          setIsLoading(false);
        } else {
          router.push("/404");
        }
        
      } else {
        router.push("/404");
      }
    } catch (error) {
      if (error.response?.status === 403) {
        endSesion();
        setUser(null);
      }
      console.log("error:", error);
      setIsLoading(false);
    }
  };
  const child = {
    path: user?.data?.role_id === 1 ? "../all-courses" : "../my-courses",
    name: t("child"),
  };

  return (
    <LayoutPanel pageTitle={t("title")}>
      {isLoading && <Loading />}
      <div>
        <TitlePanel title={t("title")} child={child} />
        { isCourse !== null && <CourseViewStudent course={isCourse} />}
        
        <div className="pt-3"></div>
      </div>
    </LayoutPanel>
  );
};

export default Course;

export function getServerSideProps({locale}) {
  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: require(`../../lang/${locale}.json`),
    },
  };
}
