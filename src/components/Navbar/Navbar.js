import { useTranslations } from 'next-intl'
import { useRouter } from 'next/router';


const Navbar = () => {
  const t = useTranslations('nav')
  const router = useRouter()
  const { locale, pathname } = router
  console.log("🚀 ~ file: Navbar.js ~ line 9 ~ Navbar ~ pathname", pathname)
  
  const handleLangChange = (e) => {
    const locale = e.target.value
    router.push(pathname, pathname, {locale})
  }
  return (
    <div>      
      <a href= {t("home.link")}>{t('home.title')}</a>
      <a href= {t("about.link")}>{t('about.title')}</a>
      <a href= {t("contact.link")}>{t('contact.title')}</a>
      <select defaultValue={locale} onChange={handleLangChange}>
        <option value="es">ES</option>
        <option value="en">EN</option>
      </select>
    </div>
  )
}

export default Navbar
