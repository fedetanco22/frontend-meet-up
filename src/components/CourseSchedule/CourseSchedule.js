import { FaCheck } from 'react-icons/fa';
import Moment from 'react-moment';
import styles from './CourseSchedule.module.scss';

const CourseSchedule = ({ schedule }) => {
    const { modality, date_init, date_end, days, time } = schedule;
    return (
        <div className={styles.schedule}>
            <p className={styles.schedule__modality}>
                <span>Modality:</span> {modality}
            </p>
            <div className={styles.schedule__checks}>
                <FaCheck className={styles.schedule__checks__icon} />
                <p>
                    <span>Days:</span> {days}
                </p>
            </div>
            <div className={styles.schedule__checks}>
                <FaCheck className={styles.schedule__checks__icon} />
                <p>
                    <span>AT:</span> {time} hrs
                </p>
            </div>
            <div className={styles.schedule__checks}>
                <FaCheck className={styles.schedule__checks__icon} />
                <p>
                    <span>Starts:</span> <Moment format='DD/MM/YYYY' date={date_init} />
                </p>
            </div>
            <div className={styles.schedule__checks}>
                <FaCheck className={styles.schedule__checks__icon} />
                <p>
                    <span>Ends:</span> <Moment format='DD/MM/YYYY' date={date_end} />
                </p>
            </div>
        </div>
    );
};

export default CourseSchedule;
