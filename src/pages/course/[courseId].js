import Image from 'next/image';
import { Layout } from '../../components/index';
import styles from './course.module.scss';

const Course = ({ item }) => {
    const { image, title, description } = item.course;

    return (
        <Layout pageTitle={title}>
            <div className={styles.imageWrapper}>
                <Image
                    src={image}
                    alt={title}
                    layout='fill'
                    objectFit='cover'
                    objectPosition='0% 35%'
                    quality={100}
                />
            </div>
            <div className={`container py-5 ${styles.container}`}>
                <div className='row'>
                    <div className='col-12 col-md-8'>
                        <h1 className={styles.title}>{title}</h1>
                        <div className={styles.textBody}>
                            <h3>About Course</h3> {/*? TRADUCIR  */}
                            <p>{description}</p>
                        </div>
                        <div className={styles.textBody}></div>
                    </div>
                    <div className={`${styles.value} col-12 col-md-4 `}>
                        <div className={styles.value__text}>
                            <h3>Mision</h3>
                            <p>{'mision'}</p>
                        </div>
                        <div className={styles.value__text}>
                            <h3>Vision</h3>
                            <p>{'vision'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Course;

export async function getStaticProps({ params, locale }) {
    const res = await fetch(`http://164.92.76.51:3000/course/${params.courseId}`);
    const jsonCourse = await res.json();
    const item = jsonCourse.data;
    return {
        props: {
            item,
            messages: require(`../../lang/${locale}.json`),
        },
    };
}

export async function getStaticPaths() {
    const res = await fetch(`http://164.92.76.51:3000/courses`);
    const courses = await res.json();
    return {
        paths: courses.data.map((course) => {
            const courseId = course.course_id.toString();

            return {
                params: {
                    courseId,
                },
            };
        }),
        fallback: false,
    };
}
