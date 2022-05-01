import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";
import {LayoutPanel, TitlePanel, Loading, CourseEdit, AddImage} from "../../components";
import useAppContext from "../../context/useAppContext";

const EditCourse = () => {
  const router = useRouter();
  const t = useTranslations("courseView");
  const {user} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (user !== null) {
      if (user?.data?.role === "Student" ) {
        router.push("/dashboard");
      } else {
        const id = router.query.courseId;
      }
    } else {
      router.push("/");
    }
  }, []);

  const id = router.query.courseId;
  // const getCourse = async () => {
  //   setIsLoading(true);
  //   const url = "http://164.92.76.51:3000/en/courses/" + id;
  //   locale === "en" ? (url = "http://164.92.76.51:3000/en/courses/full/" + id) : (url = "http://164.92.76.51:3000/es/courses/full/" + id);

  //   try {
  //     const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
  //     if (res.status === 200) {
  //       setIsLoading(false);
  //       curso = res.data.data;
  //       setIsCourse(curso);
  //       console.log(curso);
  //     }
  //   } catch (error) {
  //     if (error.response.status === 403) {
  //       setUser(null);
  //       router.push("/");
  //     }
  //     console.log(error.response.status, "resp");
  //     console.log("error:", error);
  //     setIsLoading(false);
  //   }
  //   return user;
  // };
  const child = {
    path: user?.data?.role_id === 1 ? "../all-courses": "../my-courses",
    name: t("child"),
  };

  return (
    <LayoutPanel pageTitle={t("title")}>
      {isLoading && <Loading />}
      <div>
        <TitlePanel title={'Editar curso'} child={child} />
        {id ? <CourseEdit editCourseId={id} edit={true}/> : null}
        
      </div>
    </LayoutPanel>
  );
};

export default EditCourse;

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
