import {useState, useEffect} from "react";
import {useTranslations} from "next-intl";
import {useRouter} from "next/router";
import axios from "axios";
import {LayoutPanel, TitlePanel, Card, Loading, Button, CardCourse} from "../components";
import useAppContext from "../context/useAppContext";
import Swal from 'sweetalert2';

const MyCourses = () => {
  const t = useTranslations("myCourses");
  const {user, setUser , endSesion} = useAppContext();
  const [isCourses, setIsCourses] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const cursos = isCourses;
  const router = useRouter();
  const {locale} = router;

  useEffect(() => {
    if (user !== null) {
        getCourses()
    } else {
      router.push("/");
    }
  }, [locale]);

  const getCourses = async () => {
    setIsLoading(true)
    const url = "http://164.92.76.51:3000/students/inscriptions";
    if (user?.data?.role === "Student"){
      url = "http://164.92.76.51:3000/students/inscriptions";
    }else if(user?.data?.role === "Teacher"){
      url = "http://164.92.76.51:3000/teacher/courses";
    }
      
      try {
        const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user?.token}`}});
        if(res.status === 200){
          console.log(url)
          cursos = res?.data?.data
          console.log(res?.data , 'datos')
          setIsCourses(cursos)
          setIsLoading(false);
        }
      } catch (error) {
        if (error.response?.status === 403) {
          endSesion()
          setUser(null);
          
        }
        console.log(error, 'error')
        setIsLoading(false)
      }
    
  };

  const coursesList = isCourses?.map((course) => (
    <CardCourse key={course.course_id} course={course} />
));


  return (
    <LayoutPanel pageTitle={t("title")}>
      {isLoading && <Loading />}
      <div>
        <TitlePanel title={t("title")} />
        {coursesList}
      </div>
    </LayoutPanel>
  );
};

export default MyCourses;

export function getStaticProps({locale}) {
  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: require(`../lang/${locale}.json`),
    },
  };
}
