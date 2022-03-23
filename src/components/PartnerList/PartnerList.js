import Image from 'next/image';
import { SectionTitle } from '../index';
import tomasPicture from '../../../public/profile-tomi-rueda.png';
import franciscoPicture from '../../../public/profile-fran-albrisi.png';
import { Card } from '..';
import SocialMediaLinks from '../SocialMediaLinks/SocialMediaLinks';
import styles from './PartnerList.module.scss';

const PARTNERS = [
    {
        id: '1',
        name: 'Tomás Rueda',
        // age: 30,
        rol: 'Socio fundador',
        description: 'Master en Derecho Empresarial, Emprendedor.',
    },
    {
        id: '2',
        name: 'Gonzalo Albrisi',
        // age: 35,
        rol: 'Socio fundador',
        description: 'Licenciado en Turismo, Emprendedor, Desarrollista, cripto entusiasta.',
    },
];

const PartnerList = () => {
    return (
        <div className={`container ${styles.container}`}>
            <SectionTitle title='PROFESSIONALS' subTitle='OUR Partners' />{' '}
            {/* traducir poner en idiomas*/}
            <div className={`${styles.partnerList} row justify-content-center`}>
                <div className='col-12 col-sm-6 col-lg-4 mt-3'>
                    <Card className={styles.partnerList__card}>
                        <div className={styles.content}>
                            <div style={{ width: '100%' }} className={styles.profile}>
                                <Image
                                    src={tomasPicture}
                                    alt='name'
                                    width={166}
                                    height={166}
                                    objectFit='cover'
                                    quality={100}
                                />
                            </div>
                            <div className='text-center mb-4'>
                                <h5 className={styles.text__title}>{PARTNERS[0].name}</h5>
                                <h6>{PARTNERS[0].rol}</h6>

                                <p className={styles.text__description}>
                                    {PARTNERS[0].description}
                                </p>
                            </div>
                        </div>
                        <SocialMediaLinks />
                    </Card>
                </div>
                <div className='col-12 col-sm-6 col-lg-4 mt-3'>
                    <Card className={styles.partnerList__card}>
                        <div className={styles.content}>
                            <div style={{ width: '100%' }} className={styles.profile}>
                                <Image
                                    src={franciscoPicture}
                                    alt='name'
                                    width={166}
                                    height={166}
                                    objectFit='cover'
                                    quality={100}
                                />
                            </div>
                            <div className='text-center mb-4'>
                                <h5 className={styles.text__title}>{PARTNERS[1].name}</h5>
                                <h6>{PARTNERS[1].rol}</h6>
                                <p className={styles.text__description}>
                                    {PARTNERS[1].description}
                                </p>
                            </div>
                        </div>
                        <SocialMediaLinks />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PartnerList;
