import { Partner, SectionTitle} from "../index"
import styles from "./PartnerList.module.scss"

const PARTNERS = [
  { id:"1", name: 'Candelaria Lopez', age: 25, description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor.', profilePicture:'https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg' },
  { id:"2", name: 'Tomas Rueda', age: 30, description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor.', profilePicture:'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg' },
  { id:"3", name: 'Gonzalo Albrisi', age: 35, description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor.', profilePicture:'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg' },
  { id:"4", name: 'Federico Tanco', age: 40, description:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam aliquet a urna quis auctor.', profilePicture:'https://www.jeancoutu.com/globalassets/revamp/photo/conseils-photo/20160302-01-reseaux-sociaux-profil/photo-profil_301783868.jpg' },
]

const PartnerList = () => {
  const currentPartner = PARTNERS.map(partner => (
    <Partner key={partner.id} partner={partner} />
  )).slice(0, 3)

  return (
    <div className={`container ${styles.container}`}>
      <SectionTitle title="PROFESSIONALS" subTitle="OUR Partners"/> {/* traducir poner en idiomas*/}
      <div className={`${styles.partnerList} row`}>
        {currentPartner}
      </div>
    </div>
  )
}

export default PartnerList
