// import Image from 'next/image';
// import { Layout, Contact, ColorBanner, Card, CourseSchedule } from '../../components/index';
// import { useTranslations } from 'next-intl';
// import styles from './course.module.scss';

// const Course = ({ item }) => {
//     const t = useTranslations('courses');
//     const { image, title, description, level } = item.course;
//     const scheduleModality = item?.schedules?.map((schedule, idx) => {
//         return <CourseSchedule key={idx} schedule={schedule} />;
//     });

//     return (
//         <Layout pageTitle={title}>
//             <div className={styles.imageWrapper}>
//                 <Image
//                     src={image}
//                     alt={title}
//                     layout='fill'
//                     objectFit='cover'
//                     objectPosition='0% 35%'
//                     quality={100}
//                 />
//             </div>
//             <div className={`container py-5 ${styles.container}`}>
//                 <div className='row'>
//                     <div className='col-12 col-md-8'>
//                         <h1 className={styles.title}>{title}</h1>
//                         <div className={styles.textBody}>
//                             <h3>About Course</h3> {/*? TRADUCIR  */}
//                             <p>{description}</p>
//                         </div>
//                         <div className={styles.textBody}></div>
//                     </div>
//                     <Card className={`${styles.value} col-12 col-md-4 `}>
//                         <div className={styles.value__title}>
//                             <h3>For {level}</h3>
//                         </div>
//                         <div className={styles.value__text}>
//                             <div className={styles.value__text__title}>
//                                 <h6>Schedule</h6>
//                                 {scheduleModality}
//                             </div>
//                             <div className={styles.value__text__title}>
//                                 <h6>Material Includes</h6>
//                             </div>
//                         </div>
//                     </Card>
//                 </div>
//             </div>
//             <ColorBanner
//                 backgroundColor={'secondary'}
//                 title={t('bannerColor.title')}
//                 description={t('bannerColor.description')}
//                 btnText={t('bannerColor.button')}
//                 buttonLink={'/test'}
//                 icon
//             />
//             <Contact />
//         </Layout>
//     );
// };

// export default Course;

// export async function getStaticProps({ params, locale }) {
//     const res = await fetch(`http://164.92.76.51:3000/course/${params.courseId}`);
//     const jsonCourse = await res.json();
//     const item = jsonCourse.data;
//     return {
//         props: {
//             item,
//             messages: require(`../../lang/${locale}.json`),
//         },
//     };
// }

// export async function getStaticPaths() {
//     const res = await fetch(`http://164.92.76.51:3000/courses`);
//     const courses = await res.json();
//     return {
//         paths: courses.data.map((course) => {
//             const courseId = course.course_id.toString();

//             return {
//                 params: {
//                     courseId,
//                 },
//             };
//         }),
//         fallback: false,
//     };
// }
