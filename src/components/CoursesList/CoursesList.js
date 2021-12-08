import { Course, Button } from "../index"
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
  }
]



const CoursesList = () => {
  const currentCourses = courses.map(course => (
    <Course key={course.id} course={course} className=""/>
  ))
    
  return (
    <div className={`container`}>
      <div className={`${styles.courses}`}>
        <h2 className={styles.title}>Courses</h2>
        <p className={styles.description}>Popular Courses</p>
      </div>
        <div className="row justify-content-center">
          {currentCourses}
        </div>
        <div className="text-center pt-4">
          <Button 
            text="View All Courses"
            link="/courses"
            buttonType="secondary"
          />  
        </div>      
    </div>
  )
}

export default CoursesList
