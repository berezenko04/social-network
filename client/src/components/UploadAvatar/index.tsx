'use client';

import { ChangeEvent, useState } from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';

//styles
import styles from './UploadAvatar.module.scss'

//redux
import { userDataSelector } from '@/redux/slices/user/selectors';
import { useController } from 'react-hook-form';


interface IUploadAvatar {
    name: string,
    control: any,
    defaultValue?: string
}


const UploadAvatar: React.FC<IUploadAvatar> = ({ name, control, defaultValue }) => {
    const avatarUrl = useSelector(userDataSelector)?.avatarUrl;
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [sizeError, setSizeError] = useState<boolean>(false);

    const {
        field: { ref, onChange },
    } = useController({
        name,
        control,
        defaultValue,
    });


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange();

        const file = e.target.files && e.target.files[0];

        if (file && file.size > 2 * 1024 * 1024) {
            console.log(file?.size);
            setSizeError(true);
            return;
        }

        setPreviewUrl(file ? URL.createObjectURL(file) : '');
        setSizeError(false);
    }

    return (
        <div className={styles.upload}>
            <div className={styles.upload__wrapper}>
                {avatarUrl &&
                    <>
                        <Image
                            className={styles.upload__avatar}
                            src={previewUrl ? previewUrl : avatarUrl}
                            alt="avatar"
                            width={120}
                            height={120}
                        />
                        <label className={styles.upload__label}>
                            <input
                                onChange={handleFileChange}
                                accept='image/*'
                                type='file'
                                ref={ref}
                            />
                            <Image
                                src={'/icons/photo.svg'}
                                width={24}
                                height={24}
                                alt=''
                            />
                        </label>
                    </>
                }
            </div>
            {sizeError &&
                <span className={styles.upload__error}>
                    File should be at least 2MB
                </span>
            }
        </div>
    )
}

export default UploadAvatar