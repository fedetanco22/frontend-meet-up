import Image from 'next/image'
const Course = ({course}) => {
  const {id, title, description, url, image} = course;
  return (
    <div className="col col-md-3" >
      <div style={{width:'100%'}}>
        <Image src={image} alt="" 
          width={700}
          height={400}
          objectFit="cover"
          quality={100}
        />
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
      <a href={url}>{url}</a>
    </div>
  )
}

export default Course
