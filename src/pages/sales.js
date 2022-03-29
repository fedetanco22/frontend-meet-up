import {
  Card,
  IconButton,
  LayoutPanel,
  Loading,
  TitlePanel,
} from '../components';
import { useEffect, useState } from 'react';

import { FaSearchPlus } from 'react-icons/fa';
import axios from 'axios';
import router from 'next/router';
import useAppContext from '../context/useAppContext';
import { useTranslations } from 'next-intl';

// import styles from "../styles/Setup.module.scss";

const Sales = () => {
  const t = useTranslations('sales');
  const { user, getUser } = useAppContext();
  const [users, setUsers] = useState([]);
  const [usersFilters, setUsersFilters] = useState(users);
  const [roles, setRoles] = useState([]);
  const [roleSelectedState, setRoleSelectedState] = useState(0);
  const [inputTextState, setInputTextState] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  console.log(users, 'usuarios');
  console.log(usersFilters, 'filtrados');
  let roleSelected = roleSelectedState;
  let inputText = inputTextState;

  useEffect(() => {
    if (user !== null) {
      if (user?.data?.role !== 'Administrator') {
        router.push('/dashboard');
      } else {
      }
    } else {
      router.push('/');
    }
  }, []);

  // const getUsers = async () => {
  //   setIsLoading(true)
  //   if (user?.data?.role === "Administrator") {
  //     const url = "http://164.92.76.51:3000/users";
  //     try {
  //       const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
  //       console.log(res.data?.data, 'resultado')
  //       setUsers(res.data?.data);
  //       setUsersFilters(res.data?.data);
  //       setIsLoading(false)
  //     } catch (error) {
  //       router.push("/");
  //       console.log(error, 'error')
  //       setIsLoading(false)
  //     }
  //   }
  // };

  // const getRoles = async () => {
  //   if (user?.data?.role === "Administrator") {
  //     const url = "http://164.92.76.51:3000/roles";
  //     try {
  //       const res = await axios.get(`${url}`, {headers: {Authorization: `Bearer ${user.token}`}});
  //       setRoles(res.data.data);
  //     } catch (error) {}
  //   }
  // };

  // const handleRole = (event) => {
  //   roleSelected = event.target.value;
  //   filterUser();
  // };
  // const searchUser = (event) => {
  //   inputText = event.target.value;
  //   filterUser();
  // };

  // const filterUser = () => {
  //   setRoleSelectedState(roleSelected);
  //   setInputTextState(inputText);
  //   console.log(usersFilters, "usuarios antes de filtrar");
  //   if (roleSelected === "0") {
  //     if (inputText.length === 0) {
  //       setUsersFilters(users);
  //     } else {
  //       setUsersFilters(
  //         users.filter((e) => e.last_name.toLowerCase().match(inputText.toLowerCase()) || e.name.toLowerCase().match(inputText.toLowerCase()))
  //       );
  //     }
  //   } else {
  //     setUsersFilters(
  //       users.filter(
  //         (e) =>
  //           (e.last_name.toLowerCase().match(inputText.toLowerCase()) || e.name.toLowerCase().match(inputText.toLowerCase())) &&
  //           e.role === roleSelected
  //       )
  //     );
  //   }
  // };

  // const usersData = usersFilters.map((user, idx) => {
  //   return (
  //     <tr key={idx}>
  //       <td>{user.email}</td>
  //       <td>
  //         {user.last_name} , {user.name}
  //       </td>
  //       <td>{user.role}</td>
  //       <td className="d-flex justify-content-end">
  //         <IconButton
  //           path={{
  //             pathname: "/users/[userId]",
  //             query: {userId: user.user_id},
  //           }}
  //           buttonType="blue"
  //           className="me-2"
  //           asLink
  //         >
  //           <FaPencilAlt />
  //         </IconButton>
  //       </td>
  //     </tr>
  //   );
  // });
  return (
    <LayoutPanel pageTitle={t('title')}>
      {isLoading && <Loading />}
      <div>
        <TitlePanel title={t('title')} />
        <Card>
          <div className='p-3 pb-0'>
            <h4 className=''>{t('list')}</h4>
            <div className='d-flex justify-content-end flex-wrap'>
              <div className='mb-3 col-12 col-md-6 col-lg-3 col-xxl-2'>
                <input
                  type='text'
                  className='form-control'
                  placeholder={t('search')}
                />
              </div>
              <div className='mb-3 col-12 col-md-6 col-lg-4 col-xxl-3 d-flex align-items-center'>
                <p className='mb-0 ps-0 ps-md-5 pe-3'>{t('status')}</p>
                <select
                  className='form-select form-control'
                  aria-label='Default select example'
                >
                  <option value='0'>{t('inputStatusAll')}</option>
                  <option value='1'>One</option>
                  <option value='2'>Two</option>
                  <option value='3'>Three</option>
                </select>
              </div>
            </div>
            <div className='table-responsive'>
              <table className='table responsive'>
                <thead>
                  <tr>
                    <th scope='col'>{t('table.order')}</th>
                    <th scope='col'>{t('table.user')}</th>
                    <th scope='col'>{t('table.product')}</th>
                    <th scope='col'>{t('table.status')}</th>
                    <th scope='col' className='text-end'>
                      {t('table.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0105</td>
                    <td>darioviada@gmail.com</td>
                    <td>English Level 1</td>
                    <td>Completed</td>
                    <td className='d-flex justify-content-end'>
                      <IconButton
                        path={'/'}
                        buttonType='blue'
                        className='me-2'
                        asLink
                      >
                        <FaSearchPlus />
                      </IconButton>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='d-flex justify-content-end'>
              <p>Total Users: 0</p>
            </div>
          </div>
        </Card>
      </div>
    </LayoutPanel>
  );
};

export default Sales;

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
