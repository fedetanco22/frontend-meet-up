import {
  Button,
  Card,
  CardCourse,
  LayoutPanel,
  Loading,
  TitlePanel,
} from '../components';
import { useEffect, useState } from 'react';

import axios from 'axios';
import useAppContext from '../context/useAppContext';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';

const Allcourses = () => {
  const t = useTranslations('allCourses');
  const { user } = useAppContext();
  const [isCourses, setIsCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const cursos = isCourses;
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (user !== null) {
      if (user?.data?.role !== 'Administrator') {
        router.push('/dashboard');
      } else {
        getCourses();
      }
    } else {
      router.push('/');
    }
  }, [locale]);

  console.log(locale, 'locale al iniciar');

  const getCourses = async () => {
    console.log('entro y te digo que el locale es:', locale);
    const url = 'http://164.92.76.51:3000/en/courses/';
    setIsLoading(true);
    locale === 'en'
      ? (url = 'http://164.92.76.51:3000/en/courses/')
      : (url = 'http://164.92.76.51:3000/es/courses/');

    try {
      const res = await axios.get(`${url}`);
      cursos = res?.data?.data;
      console.log(cursos, 'cursos');
      setIsCourses(cursos);
      if (res.status === 200) {
        setIsLoading(false);
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

  const coursesList = isCourses?.map((course) => (
    <CardCourse key={course.course_id} course={course} />
  ));

  return (
    <LayoutPanel pageTitle={t('title')}>
      {isLoading && <Loading />}
      <div>
        <TitlePanel title={t('title')} />
        {coursesList}

        <Card>
          <div className='p-5 d-flex align-items-center justify-content-center'>
            <Button
              path={'./add-course'}
              buttonType='blue'
              className='mt-3'
              asLink
              text={t('addCourse')}
            ></Button>
          </div>
        </Card>
      </div>
    </LayoutPanel>
  );
};

export default Allcourses;

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
