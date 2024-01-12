'use client';

import { useSelector } from 'react-redux'
import ReactTextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import cn from 'classnames'
import Image from 'next/image';
import { toast } from 'react-toastify';

//styles
import styles from './CreatePost.module.scss'
import 'react-circular-progressbar/dist/styles.css';

//components
import Avatar from '../UI/Avatar'
import Button from '../UI/Button';
import IconButton from '../UI/IconButton';

//redux
import { userDataSelector } from '@/redux/slices/user/selectors'

//icons
import PictureIcon from '@/assets/icons/picture.svg'
import RemoveIcon from '@/assets/icons/close.svg'

//API
import { createPost } from '@/API/postsService';



const CreatePost: React.FC = () => {
    const user = useSelector(userDataSelector);
    const inputRef = useRef<null | HTMLInputElement>(null);
    const maxLength = 300;
    const [fieldValue, setFieldValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [images, setImages] = useState<File[]>([]);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;

        if (inputValue.length <= maxLength) {
            setFieldValue(inputValue);
        }
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedImage = e.target.files[0];

            if (selectedImage) {
                setImages([...images, selectedImage]);
            }
        }
    };

    const handleClickInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const handleImageRemove = (imageName: string) => {
        const updatedImages = images.filter((img) => img.name !== imageName);

        setImages(updatedImages);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('content', fieldValue);

            images.forEach((image) => {
                formData.append(`images[]`, image);
            });

            await createPost(formData);

            setFieldValue('');
            setImages([]);
        } catch (err) {
            toast.error('An error occurred while posting');
        }
    }

    return (
        <div className={styles.createPost}>
            <div className={styles.createPost__wrapper}>
                <div className={styles.createPost__avatar}>
                    <Avatar size='sm' profileLink={'/'} imgSrc={user?.avatarUrl} />
                </div>
                <form
                    className={styles.createPost__main}
                    encType="multipart/form-data"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className={styles.createPost__main__wrapper}>
                        <ReactTextareaAutosize
                            className={styles.createPost__main__postContent}
                            placeholder='What is happening?!'
                            maxRows={16}
                            value={fieldValue}
                            onInput={handleInput}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                        />
                    </div>
                    {images &&
                        <div className={styles.createPost__main__preview}>
                            {images.map((img, index) => (
                                <div
                                    className={styles.createPost__main__preview__item}
                                    key={index}
                                >
                                    <Image
                                        width={300}
                                        height={500}
                                        src={URL.createObjectURL(img)}
                                        alt=''
                                    />
                                    <button
                                        type='button'
                                        onClick={() => handleImageRemove(img.name)}
                                    >
                                        <RemoveIcon />
                                    </button>
                                </div>
                            ))}
                        </div>
                    }
                    <div className={cn(styles.divider, isFocused && styles.divider__focused)} />
                    <div className={styles.createPost__main__footer}>
                        <div className={styles.createPost__main__footer__buttons}>
                            <label>
                                <IconButton
                                    variant='primary'
                                    icon={<PictureIcon />}
                                    onClick={handleClickInput}
                                    type='button'
                                    disabled={images.length >= 2}
                                />
                                <input
                                    type="file"
                                    accept='image/*'
                                    ref={inputRef}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                        <div className={styles.createPost__main__footer__submit}>
                            {fieldValue &&
                                <div className={styles.progressBar}>
                                    <CircularProgressbar
                                        value={fieldValue.length}
                                        maxValue={maxLength}
                                        strokeWidth={6}
                                        styles={buildStyles({
                                            trailColor: '#2f3337',
                                        })}
                                    />
                                </div>
                            }
                            <Button
                                variant='primary'
                                type='submit'
                                size='xs'
                                fullWidth={false}
                                disabled={!Boolean(fieldValue)}
                            >
                                Post
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePost