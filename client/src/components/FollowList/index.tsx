'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

//styles
import styles from './FollowList.module.scss'

//components
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';

//types
import { IUserData } from '@/redux/slices/user/types';

//API
import { getUsers } from '@/API/userService';

//icons
import VerifiedIcon from '@/assets/icons/verified.svg'


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
                {users.map((user, idx) => (
                    <li
                        className={styles.followList__users__item}
                        key={idx}
                    >
                        <Link
                            href={`/${user.username}`}
                        >
                            <Avatar size='sm' imgSrc={user.avatarUrl} />
                            <div className={styles.followList__users__item__info}>
                                <p>
                                    {user.name.length > 15 ?
                                        `${user.name.slice(0, 15)}...`
                                        :
                                        user.name
                                    }
                                    <VerifiedIcon />
                                </p>
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
                ))}
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