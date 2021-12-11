import {useState} from 'react'
import { Footer, Navbar, SEO } from '../index'


const Layout = ({children , pageTitle, pageDescription, pageKeywords}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <SEO title={pageTitle} description={pageDescription} keywords={pageKeywords}/> {/* Donde poner el SEO en cada pagina */}
      <Navbar handleMenu={handleToggle} open={isOpen}/>
      <main>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout
