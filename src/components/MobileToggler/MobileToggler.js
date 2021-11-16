import { useTranslations } from 'next-intl'
import Link from 'next/link'

const MobileToggler = ({handleMenu}) => {
  const t = useTranslations('nav')
  
  return (
    <div onClick={handleMenu} className=''>
      <div className='col d-flex  flex-column'>
        <div className='col d-flex flex-column justify-content-start'>
          <Link href= {t("home.link")} >
            <a className='py-1'>{t('home.title')}</a>
          </Link>
          <Link href= {t("courses.link")} >
            <a className='py-1'>{t('courses.title')}</a>
          </Link>
          <Link href= {t("test.link")} >
            <a className='py-1'>{t('test.title')}</a>
          </Link>
          <Link href= {t("about.link")} >
            <a className='py-1'>{t('about.title')}</a>
          </Link>
        </div>
        <div className='col d-flex flex-column justify-content-end'>
          <Link href= {t("login.link")} >
            <a className='py-1'>{t('login.title')}</a>
          </Link>
          <Link href= {t("signup.link")} >
            <a className='py-1'>{t('signup.title')}</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MobileToggler
