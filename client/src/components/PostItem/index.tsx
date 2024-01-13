'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';

//styles
import styles from './PostItem.module.scss'

//redux
import { IUserData } from '@/redux/slices/user/types';

//API
import { getUser } from '@/API/userService';

//components
import Avatar from '../UI/Avatar';

//utils
import { formatDate } from '@/utils/formatDate';

//icons
import VerifiedIcon from '@/assets/icons/verified.svg'
import Image from 'next/image';

interface IPostItemProps {
    user: string,
    content: string,
    attached: string[],
    likes: number,
    views: number,
    date: Date
}

const PostItem: React.FC<IPostItemProps> = ({ user, content, attached, likes, date, views }) => {
    const [userData, setUserData] = useState<IUserData>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const data = await getUser(user);
            setUserData(data);
            setLoading(false);
        })();
    }, []);

    console.log(attached);

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
                                <p>{formatDate(date)}</p>
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
                        </div>
                    </div>
                </li>
            }
        </>
    )
}

export default PostItem