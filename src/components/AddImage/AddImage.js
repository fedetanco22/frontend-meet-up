import { useState, createRef } from 'react';
import { useTranslations } from 'next-intl';
import { Card, Button, Alert, Loading } from '../../components';
import useAppContext from '../../context/useAppContext';
import Image from 'next/image';
import axios from 'axios';
import styles from '../CourseEdit/CourseEdit.module.scss';
import { FaSave, FaPlus, FaImage } from 'react-icons/fa';

const AddImage = ({ editCourseId, image }) => {
    const t = useTranslations('courseEdit');
    const { user, endSesion } = useAppContext();
    const [curseId, setCurseId] = useState(editCourseId);
    const [selectedFile, setSelectedFile] = useState('null');
    const [send, setSend] = useState(false);
    const [sendError, setSendError] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [urlFoto, setUrlFoto] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const cursoID = curseId;
    const [ref] = useState(createRef());
    const [imageUrl, setImageUrl] = useState(null);
    let fileTmp = selectedFile;
    let urlTmp = imageUrl;

    const alert = send ? (
        sendError ? (
            <Alert text={t('form.alert.error')} type='error' />
        ) : (
            <Alert text={t('form.alert.success')} type='success' />
        )
    ) : isPending ? (
        <Alert text={t('form.alert.warning')} type='warning' />
    ) : null;

    const saveImage = async () => {
        setIsLoading(true);
        const url = `${process.env.APP_REACT_MEET_UP}/courses/changeImage/` + cursoID;
        let formData = new FormData();
        formData.append('course_image', selectedFile);
        try {
            const res = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (res.status === 200) {
                setSend(true);
                setSendError(false);
                setIsPending(false);
                setIsLoading(false);
            } else {
                setSend(true);
                setSendError(true);
                setIsPending(false);
                setIsLoading(false);
            }
        } catch (error) {
            if (error.response.status === 403) {
                endSesion();
                setUser(null);
            }

            setSend(true);
            setSendError(true);
            setIsPending(false);
        }
    };
    const fotoTmp =
        imageUrl !== null ? (
            <Image
                src={imageUrl}
                alt={'course'}
                layout='fill'
                objectFit='cover'
                objectPosition='50% 50%'
                quality={100}
            />
        ) : null;
    const foto =
        image !== undefined && image !== null ? (
            <Image
                src={`${process.env.APP_REACT_MEET_UP}/coursesImages/${image}`}
                alt={'course'}
                layout='fill'
                objectFit='cover'
                objectPosition='50% 50%'
                quality={100}
            />
        ) : (
            <FaImage />
        );
    const selectImage = () => {
        ref.current.click();
    };

    const handleImage = (event) => {
        fileTmp = event.target.files[0];
        setSelectedFile(fileTmp);
        setIsPending(true);
        urlTmp = URL.createObjectURL(fileTmp);
        setImageUrl(urlTmp);
    };
    return (
        <Card styleClass='px-3 mt-3'>
            {isLoading && <Loading />}
            <div className='d-flex flex-wrap'>
                <div className='col-12 col-md p-4 my-3'>
                    <h3 className='cardTitle'>{t('titleImage')}</h3>
                    <div className='position-relative d-flex justify-content-center col-12 col-xl-8 mb-2'>
                        <div className={` ${styles.image}`}>{foto}</div>
                        <div className={` ${styles.imageTmp}`}>{fotoTmp}</div>
                    </div>

                    <div className='col-12 col-xl-8'>
                        <input
                            type='file'
                            onChange={handleImage}
                            ref={ref}
                            className='d-none'
                            accept='image/png/jpg'
                        />
                        <button type='submit' onClick={selectImage} className={styles.btn__add}>
                            <FaPlus />
                            {t('selectFile')}
                        </button>
                    </div>
                    <div className=' d-flex flex-wrap flex-md-nowrap w-100 border-top pt-3 mt-3'>
                        <div className='col-12 flex-fill mb-3'>{alert}</div>
                        <div className='col-12 col-md-auto text-end px-md-3'>
                            <Button
                                text={t('form.submit')}
                                className='w-100'
                                buttonType={'light'}
                                disabled={!isPending}
                                callback={() => saveImage()}
                                asSubmit
                            >
                                <FaSave />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AddImage;
