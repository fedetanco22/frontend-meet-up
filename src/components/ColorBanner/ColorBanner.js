import classNames from 'classnames';
import styles from './ColorBanner.module.scss';
import { FaPencilAlt } from 'react-icons/fa';
import { Button } from '../index';

const ColorBanner = ({ backgroundColor, title, description, icon, btnText }) => {
    const classes = classNames(
        {
            [styles.colorBanner_primary]: backgroundColor === 'primary',
            [styles.colorBanner_secondary]: backgroundColor === 'secondary',
        },
        backgroundColor
    );

    const button = backgroundColor === 'primary' ? 'white_primary' : 'white_secondary';

    return (
        <div className={`${classes} ${styles.banner}`}>
            <div className='container  '>
                <div className='row align-items-center'>
                    <div
                        className={`${styles.colorBanner__icon} col-12 col-md-8 d-flex align-items-center`}
                    >
                        {icon && <FaPencilAlt />}
                        <div className='col-10'>
                            <h2 className={styles.colorBanner__title}>{title}</h2>
                            <p className={styles.colorBanner__description}>{description}</p>
                        </div>
                    </div>
                    <div className={`${styles.button} col-12 col-md-4 text-end mt-4 mt-md-0`}>
                        <Button text={btnText} linkAsButton path={'/test'} buttonType={button} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ColorBanner;
