import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LayoutPanel, TitlePanel, Loading, CourseEdit, AddImage } from '../../components';
import useAppContext from '../../context/useAppContext';

const EditCourse = () => {
    const router = useRouter();
    const t = useTranslations('courseView');
    const { user } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (user !== null) {
            if (user?.data?.role === 'Student') {
                router.push('/dashboard');
            } else {
                const id = router.query.courseId;
            }
        } else {
            router.push('/');
        }
    }, []);

    const id = router.query.courseId;
    const child = {
        path: user?.data?.role_id === 1 ? '../all-courses' : '../my-courses',
        name: t('child'),
    };

    return (
        <LayoutPanel pageTitle={t('title')}>
            {isLoading && <Loading />}
            <div>
                <TitlePanel title={'Editar curso'} child={child} />
                {id ? <CourseEdit editCourseId={id} edit={true} /> : null}
            </div>
        </LayoutPanel>
    );
};

export default EditCourse;

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
