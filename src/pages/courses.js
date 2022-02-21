import { Layout, Banner, CoursesList, Contact, ColorBanner } from '../components';
import bannerAbout from '../../public/banner-about-us.png';
import { useTranslations } from 'next-intl';

const Courses = ({ courses }) => {
  const t = useTranslations('courses');
  const courseList = courses?.data;

  return (
    <>
      <Layout pageTitle={t('title')}>
        <Banner image={bannerAbout} altText={'banner-home'} />
        <CoursesList courseList={courseList} />
        <ColorBanner
          backgroundColor={'secondary'}
          title={t('bannerColor.title')}
          description={t('bannerColor.description')}
          btnText={t('bannerColor.button')}
          buttonLink={'/test'}
          icon
        />
        <Contact />
        <ColorBanner
          backgroundColor={'primary'}
          title={t('bannerColor2.title')}
          description={t('bannerColor2.description')}
          btnText={t('bannerColor2.button')}
          buttonLink={'/test'}
        />
      </Layout>
    </>
  );
};

export default Courses;

export async function getStaticProps({ locale }) {
  const res = await fetch('http://164.92.76.51:3000/courses');
  const courses = await res.json();
  return {
    props: {
      courses,
      messages: require(`../lang/${locale}.json`),
    },
  };
}
