import {
  Alert,
  Button,
  Card,
  EditUser,
  LayoutPanel,
  Loading,
  SendPassword,
  TitlePanel,
} from '../../components';
import { useEffect, useState } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import useAppContext from '../../context/useAppContext';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

const User = () => {
  const router = useRouter();
  const t = useTranslations('user');
  const { user } = useAppContext();
  const [editUser, setEditUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [send, setSend] = useState(false);
  const [sendError, setSendError] = useState(false);

  useEffect(() => {
    if (user !== null) {
      if (user?.data?.role !== 'Administrator') {
        router.push('/dashboard');
      } else {
        getEditUser();
      }
    } else {
      router.push('/');
    }
  }, []);

  const confirmDelete = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log('usuario eliminado:', editUser);
    const url = 'http://164.92.76.51:3000/users/' + editUser?.data?.user_id;
    try {
      const res = await axios.delete(`${url}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (res.status === 200) {
        router.push('/users');
      } else {
        setSend(true);
        setSendError(true);
      }
    } catch (error) {
      if (error.response.status === 403) {
        router.push('/');
      }
      console.log(error);
      setSend(true);
      setSendError(true);
    }
  };

  const id = router.query.userId;

  const getEditUser = async () => {
    setIsLoading(true);
    const url = 'http://164.92.76.51:3000/user/' + id;
    try {
      const res = await axios.get(`${url}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (res.status === 200) {
        setIsLoading(false);
        setEditUser({ data: res.data.data[0] });
      }
    } catch (error) {
      if (error.response.status === 403) {
        router.push('/');
      }
      console.log('error: ', error);
      setIsLoading(false);
    }
    return user;
  };
  const child = {
    path: '../users',
    name: t('child'),
  };

  const alert = send ? (
    sendError ? (
      <Alert text={t('alert.error')} type='error' />
    ) : (
      <Alert text={t('alert.success')} type='success' />
    )
  ) : null;

  return (
    <LayoutPanel pageTitle={t('title')}>
      {isLoading && <Loading />}
      <div>
        <TitlePanel title={t('title')} child={child} />
        <div>
          {editUser !== null && <EditUser user={user} editUser={editUser} />}
        </div>
        <div className='pt-3'>
          {editUser !== null && <SendPassword editUser={editUser} />}
        </div>
        <div className='pt-3'>
          <Card styleClass='p-3'>
            <h4 className='cardTitle'>{t('delete.title')}</h4>
            <div className='d-flex flex-wrap'>{t('delete.content')}</div>
            <div className='d-flex flex-wrap flex-md-nowrap w-100'>
              <div className='col-12 flex-fill mb-3'>{alert}</div>
              <div className='col-12 col-md-auto text-end px-md-3'>
                <form onSubmit={confirmDelete}>
                  <Button
                    text={t('delete.button')}
                    className='w-100'
                    buttonType={'light'}
                    asSubmit
                  >
                    <FaTrashAlt />
                  </Button>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </LayoutPanel>
  );
};

export default User;

export function getServerSideProps({ locale }) {
  return {
    props: {
      // You can get the messages from anywhere you like, but the recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: require(`../../lang/${locale}.json`),
    },
  };
}
