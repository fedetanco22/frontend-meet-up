import { CoursesList, Layout } from '../components';
import {Banner} from '../components/index';
import {useTranslations} from 'next-intl';

import bannerHome from "../../public/banner-home.jpg"
import useAppContext from '../context/useAppContext';

export default function Home() {
  const t = useTranslations('home');
  const {user} = useAppContext();
 
  return (
    <Layout pageTitle={t('title')}>
      <Banner 
        image={bannerHome}
        altText={"banner-home"}
      />
      <CoursesList />
      <div>
        <h1>{t('title')}</h1>
        <h1> {t("prueba")}</h1>
        <p>{t("auth.SignUp.title")}</p>
        <p>{t("auth.SignUp.form.placeholder")}</p>
      </div>
    </Layout>
  )
}

// pages/index.js
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