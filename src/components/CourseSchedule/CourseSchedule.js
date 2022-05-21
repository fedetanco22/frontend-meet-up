import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import Moment from 'react-moment';
import Button from '../Button/Button';
import styles from './CourseSchedule.module.scss';

const CourseSchedule = ({ schedule, textButton, selectSchedule }) => {
    const { modality, date_init, date_end, days, time, schedule_id } = schedule;

    const handleSelectedSchedule = () => {
        selectSchedule(schedule_id);
    };

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
            <Button
                text={textButton}
                asSubmit
                callback={handleSelectedSchedule}
                // path={`/courses/`}
                buttonType='blue_small'
            />
        </div>
    );
};

export default CourseSchedule;
