'use client';

import { useSelector } from 'react-redux'
import ReactTextareaAutosize from 'react-textarea-autosize';
import { ChangeEvent, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import cn from 'classnames'

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
import EmojiIcon from '@/assets/icons/emoji.svg'
import PictureIcon from '@/assets/icons/picture.svg'


const CreatePost: React.FC = () => {
    const user = useSelector(userDataSelector);
    const maxLength = 300;
    const [fieldValue, setFieldValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;

        if (inputValue.length <= maxLength) {
            setFieldValue(inputValue);
        }
    }

    return (
        <div className={styles.createPost}>
            <div className={styles.createPost__wrapper}>
                <div className={styles.createPost__avatar}>
                    <Avatar size='sm' profileLink={'/'} imgSrc={user?.avatarUrl} />
                </div>
                <form className={styles.createPost__main}>
                    <ReactTextareaAutosize
                        className={styles.createPost__main__postContent}
                        placeholder='What is happening?!'
                        maxRows={16}
                        value={fieldValue}
                        onInput={handleInput}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                    />
                    <div className={cn(styles.divider, isFocused && styles.divider__focused)} />
                    <div className={styles.createPost__main__footer}>
                        <div className={styles.createPost__main__footer__buttons}>
                            <IconButton
                                variant='primary'
                                icon={<PictureIcon />}
                            />
                            <IconButton
                                variant='primary'
                                icon={<EmojiIcon />}
                            />
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
                                disabled
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