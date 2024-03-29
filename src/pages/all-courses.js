import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/router';
import axios from 'axios';
import { LayoutPanel, TitlePanel, Card, Loading, Button, CardCourse } from '../components';
import useAppContext from '../context/useAppContext';

const Allcourses = () => {
    const t = useTranslations('allCourses');
    const { user, setUser, endSesion } = useAppContext();
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

    const getCourses = async () => {
        const url = `${process.env.APP_REACT_MEET_UP}/en/courses/`;
        setIsLoading(true);
        locale === 'en'
            ? (url = `${process.env.APP_REACT_MEET_UP}/en/courses/`)
            : (url = `${process.env.APP_REACT_MEET_UP}/es/courses/`);

        try {
            const res = await axios.get(`${url}`);
            cursos = res?.data?.data;
            setIsCourses(cursos);
            if (res.status === 200) {
                setIsLoading(false);
            }
        } catch (error) {
            if (error.response?.status === 403) {
                endSesion();
                setUser(null);
            }
            console.log('error: ', error);
            setIsLoading(false);
        }
        return user;
    };

    const coursesList = isCourses?.map((course) => (
        <CardCourse key={course.course_id} course={course} student={false} />
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
