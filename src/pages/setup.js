import {
  ChangePassword,
  EditUser,
  LayoutPanel,
  Loading,
  TitlePanel,
} from '../components';
import { useEffect, useState } from 'react';

import router from 'next/router';
import useAppContext from '../context/useAppContext';
import { useTranslations } from 'next-intl';

const Dashboard = () => {
  const t = useTranslations('setup');
  const { user, getUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user !== null) {
      getUser();
    } else {
      router.push('/');
    }
  }, []);

  return (
    <LayoutPanel pageTitle={t('title')}>
      {isLoading && <Loading />}
      <div>
        <TitlePanel title={t('title')} />
        <div>
          <EditUser user={user} editUser={user} />
        </div>
        <div className='pt-3'>
          <ChangePassword user={user} />
        </div>
      </div>
    </LayoutPanel>
  );
};

export default Dashboard;

export function getStaticProps({ locale }) {
  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: require(`../lang/${locale}.json`),
    },
  };
}
