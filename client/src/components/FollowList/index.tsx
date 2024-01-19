'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

//styles
import styles from './FollowList.module.scss'

//components
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';
import UserName from '../UserComponents/UserName';
import FollowListItemSkeleton from '../Skeletons/FollowListItemSkeleton';

//types
import { IUserData } from '@/redux/slices/user/types';

//API
import { getUsers } from '@/API/userService';



const FollowList: React.FC = () => {
    const [users, setUsers] = useState<IUserData[]>([]);

    useEffect(() => {
        (async () => {
            const data = await getUsers(3);
            setUsers(data);
        })();
    }, [])

    return (
        <div className={styles.followList}>
            <h3>Who to follow</h3>
            <ul className={styles.followList__users}>
                {users.length > 0 ? users.map((user, idx) => (
                    <li
                        className={styles.followList__users__item}
                        key={idx}
                    >
                        <Link
                            href={`/${user.username}`}
                        >
                            <Avatar size='sm' imgSrc={user.avatarUrl} />
                            <div className={styles.followList__users__item__info}>
                                <UserName
                                    name={user.name}
                                    userId={user._id}
                                    sliced
                                    hovered
                                />
                                <span>@{user.username}</span>
                            </div>
                        </Link>
                        <Button
                            size='xs'
                            variant='secondary'
                            fullWidth={false}
                        >
                            Follow
                        </Button>
                    </li>
                ))
                    :
                    [...Array(3)].map((_, idx) => (
                        <li key={idx}>
                            <FollowListItemSkeleton />
                        </li>
                    ))
                }
                <li className={styles.followList__users__item}>
                    <Link
                        href={'/explore/follow'}
                    >
                        Show more
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default FollowList