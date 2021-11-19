import Image from "next/image"

const Banner = ({image, altText}) => {
  return (
    <div>
      <Image 
        src={image}
        alt={altText}
        priority
      />
    </div>
  )
}

export default Banner
