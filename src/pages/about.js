import {useTranslations} from 'next-intl';
import { Layout } from '../components';

const About = () => {
const t = useTranslations('about');
  return (
    <Layout pageTitle={t('title')}>
      <div>
         <h1>{t('title')}</h1>
       <h1> {t("prueba")}</h1>
       <p>{t("auth.SignUp.title")}</p>
       <p>{t("auth.SignUp.form.placeholder")}</p>
      </div>
    </Layout>
  )
}

export default About

export function getStaticProps({locale}) {
  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read 
      // the desired one based on the `locale` received from Next.js. 
      messages: require(`../lang/${locale}.json`)
    }
  };
}