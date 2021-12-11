import { Teacher, SectionTitle} from "../index"
import styles from "./TeacherList.module.scss"

const teachers = [
  { name: 'Candelaria Lopez', age: 25, description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor.', profilePicture:'https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg' },
  { name: 'Tomas Rueda', age: 30, description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor.', profilePicture:'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg' },
  { name: 'Gonzalo Albrisi', age: 35, description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor.', profilePicture:'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg' },
  { name: 'Federico Tanco', age: 40, description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor.', profilePicture:'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg' },
]

const TeacherList = () => {
  const currentTeacher = teachers.map(teacher => (
    <Teacher key={teacher.id} teacher={teacher} />
  )).slice(0, 3)

  return (
    <div className={`container ${styles.container}`}>
      <SectionTitle title="PROFESSIONALS" subTitle="OUR TEACHERS"/>
      <div className={`${styles.teacherList} row`}>
        {currentTeacher}
      </div>
    </div>
  )
}

export default TeacherList
