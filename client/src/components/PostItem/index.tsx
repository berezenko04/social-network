'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';

//styles
import styles from './PostItem.module.scss'

//redux
import { IUserData } from '@/redux/slices/user/types';

//API
import { getUser } from '@/API/userService';

//components
import Avatar from '../UI/Avatar';
import IconButton from '../UI/IconButton';

//utils
import { formatDate } from '@/utils/formatDate';

//icons
import VerifiedIcon from '@/assets/icons/verified.svg'
import LikeIcon from '@/assets/icons/like.svg'
import ViewsIcon from '@/assets/icons/trends.svg'
import BookmarkIcon from '@/assets/icons/bookmark.svg'
import ShareIcon from '@/assets/icons/share.svg'


interface IPostItemProps {
    user: string,
    content: string,
    attached: string[],
    likes: number,
    views: number,
    createdAt: Date
}

const PostItem: React.FC<IPostItemProps> = ({ user, content, attached, likes, createdAt, views }) => {
    const [userData, setUserData] = useState<IUserData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await getUser(user);
            setUserData(data);
            setLoading(false);
        })();
    }, []);

    return (
        <>
            {(!loading && userData) &&
                <li className={styles.postItem} style={{ color: 'white' }}>
                    <div className={styles.postItem__wrapper}>
                        <Avatar size='sm' imgSrc={userData.avatarUrl} />
                        <div className={styles.postItem__main}>
                            <div className={styles.postItem__main__head}>
                                <Link href={`/${userData.name}`}>
                                    {userData.name}
                                    <VerifiedIcon />
                                </Link>
                                <p>@{userData.username}</p>
                                <span className={styles.divider} />
                                <p>{formatDate(createdAt)}</p>
                            </div>
                            <div className={styles.postItem__main__content}>
                                <p className={styles.postItem__main__content__text}>
                                    {content}
                                </p>
                                <div className={styles.postItem__main__content__attached}>
                                    {attached.map((item, idx) => (
                                        <div
                                            className={styles.postItem__main__content__attached__item}
                                            key={idx}
                                        >
                                            <Image
                                                width={300}
                                                height={240}
                                                src={item}
                                                alt=''
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.postItem__main__footer}>
                                <div className={styles.postItem__main__footer__actions}>
                                    <IconButton
                                        variant='red'
                                        icon={<LikeIcon />}
                                        text={`${likes}`}
                                    />
                                    <IconButton
                                        variant='blue'
                                        icon={<ViewsIcon />}
                                        text={`${views}`}
                                    />
                                </div>
                                <div className={styles.postItem__main__footer__share}>
                                    <IconButton
                                        variant='blue'
                                        icon={<BookmarkIcon />}
                                    />
                                    <IconButton
                                        variant='blue'
                                        icon={<ShareIcon />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            }
        </>
    )
}

export default PostItem