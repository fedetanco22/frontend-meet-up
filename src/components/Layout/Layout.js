import {useState} from 'react'
import { Navbar, MobileToggler, SEO } from '../index'


const Layout = ({children , pageTitle, pageDescription, pageKeywords}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <SEO title={pageTitle} description={pageDescription} keywords={pageKeywords}/> {/* Donde poner el SEO en cada pagina */}
      <Navbar handleMenu={handleToggle}/>
      {isOpen && <MobileToggler handleMenu={handleToggle}/>}
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout
