import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('home');
  const router = useRouter();
  console.log(router.locale);
  console.log(router.pathname);
  console.log(router);
  
 
  return (
    <div>
      <h1>{t('title')}</h1>
     <h1> {t("prueba")}</h1>
     <p>{t("auth.SignUp.title")}</p>
     <p>{t("auth.SignUp.form.placeholder")}</p>
     <p>{}</p>
    </div>
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