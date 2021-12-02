import {useState} from 'react'
import { NavbarPanel, SEO } from '../index'


const LayoutPanel = ({children , pageTitle, pageDescription, pageKeywords}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <SEO title={pageTitle} description={pageDescription} keywords={pageKeywords}/> {/* Donde poner el SEO en cada pagina */}
      <NavbarPanel handleMenu={handleToggle} open={isOpen}/>
      <main className="bg-panel">
        {children}
      </main>
    </div>
  )
}

export default LayoutPanel
