import {
    Layout,
    NumberBlock,
    Banner,
    Services,
    CoursesList,
    ColorBanner,
    Contact,
} from '../components';
import { useTranslations } from 'next-intl';

import bannerHome from '../../public/banner-home.jpg';
import useAppContext from '../context/useAppContext';
import { useRouter } from 'next/router';

export default function Home({ courses }) {
    const t = useTranslations('home');

    return (
        <Layout pageTitle={t('title')}>
            <Banner image={bannerHome} altText={'banner-home'} />
            <Services />
            <NumberBlock />
            <CoursesList courseList={courses?.data.slice(0, 3)} />
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
    );
}

export async function getStaticProps({ locale }) {
    const res = await fetch(`${process.env.APP_REACT_MEET_UP}/${locale}/courses`);
    const courses = await res.json();
    return {
        props: {
            courses,
            messages: require(`../lang/${locale}.json`),
        },
    };
}
