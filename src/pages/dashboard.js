import {useTranslations} from 'next-intl';
import { LayoutPanel } from '../components';

const Dashboard = () => {
  const t = useTranslations('dashboard'); 

  return (
    <LayoutPanel pageTitle={t('title')}>
      <div>
         <h1>{t('title')}</h1>
      </div>
    </LayoutPanel>
  )
}

export default Dashboard

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