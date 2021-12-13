import { Course, Button, SectionTitle } from "../index"
import {useTranslations} from "next-intl";
import styles from "./CoursesList.module.scss"

const courses= [
  {
    id: 1,
    title: "English Level 1",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor. Praesent vestibulum felis ut purus posuere viverra. Nullam sit amet consectetur lorem.",
    level: 1,  
    image: "https://i.imgur.com/qkdpN.jpg",
    price: "Free",
    duration: "1 month",
    instructor: "John Doe",
    instructorImage: "https://i.imgur.com/qkdpN.jpg",
    instructorDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor. Praesent vestibulum felis ut purus posuere viverra. Nullam sit amet consectetur lorem.",
    instructorRating: 4.5,
    instructorRatingCount: 16,
    students: 1656,
    planEstuio:'',
    turno:'',
    schedule:[
      {
        date: "2020-01-01",
        time: "10:00",
        location: "Online"

      },
    ]
  },
  {
    id: 2,
    title: "English Level 2",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor. Praesent vestibulum felis ut purus posuere viverra. Nullam sit amet consectetur lorem.",
    level: 2,
    image: "https://i.imgur.com/qkdpN.jpg",
    price: "Free",
    duration: "1 month",
    instructor: "John Doe",
    instructorImage: "https://i.imgur.com/qkdpN.jpg",
    instructorDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor. Praesent vestibulum felis ut purus posuere viverra. Nullam sit amet consectetur lorem.",
    instructorRating: 4.5,
    instructorRatingCount: 16,
    students: 1656,
    schedule:[
      {
        date: "2020-01-01",
        time: "10:00",
        location: "Online"
      },
    ]
  },
  {
    id: 3,
    title: "English Level 3",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor. Praesent vestibulum felis ut purus posuere viverra. Nullam sit amet consectetur lorem.",
    level: 2,
    image: "https://i.imgur.com/qkdpN.jpg",
    price: "Free",
    duration: "1 month",
    instructor: "John Doe",
    instructorImage: "https://i.imgur.com/qkdpN.jpg",
    instructorDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor. Praesent vestibulum felis ut purus posuere viverra. Nullam sit amet consectetur lorem.",
    instructorRating: 4.5,
    instructorRatingCount: 16,
    students: 1656,
    schedule:[
      {
        date: "2020-01-01",
        time: "10:00",
        location: "Online"
      },
    ]
  },
  {
    id: 4,
    title: "English Level 4",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor. Praesent vestibulum felis ut purus posuere viverra. Nullam sit amet consectetur lorem.",
    level: 2,
    image: "https://i.imgur.com/qkdpN.jpg",
    price: "Free",
    duration: "1 month",
    instructor: "John Doe",
    instructorImage: "https://i.imgur.com/qkdpN.jpg",
    instructorDescription:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor. Praesent vestibulum felis ut purus posuere viverra. Nullam sit amet consectetur lorem.",
    instructorRating: 4.5,
    instructorRatingCount: 16,
    students: 1656,
    schedule:[
      {
        date: "2020-01-01",
        time: "10:00",
        location: "Online"
      },
    ]
  },

]

const CoursesList = () => {
  const currentCourses = courses.map(course => (
    <Course key={course.id} course={course} />
  )).slice(0, 3)
  const t = useTranslations("coursesList");
    
  return (
    <div className={`container ${styles.container}`}>
      <SectionTitle title={t("title")} subTitle={t("subtitle")}/>
      <div className={`${styles.coursesList} row`}>
        {currentCourses}
      </div>
      <div className="text-center ">
          <Button 
            text={t("buttonAll.text")}
            link="/courses"
            buttonType="blue"
            linkAsButton
            path={t("buttonAll.url")}
          />  
      </div>      
    </div>
  )
}

export default CoursesList
