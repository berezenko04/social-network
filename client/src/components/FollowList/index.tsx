'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

//styles
import styles from './FollowList.module.scss'

//components
import FollowListItemSkeleton from '../Skeletons/FollowListItemSkeleton';

//types
import { IUserData } from '@/redux/slices/user/types';

//API
import { getUsers } from '@/API/userService';
import UserItem from '../UserComponents/UserItem';


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
                        key={idx}
                    >
                        <UserItem
                            sliced
                            hovered
                            withFollow {...user}
                        />
                    </li>
                ))
                    :
                    [...Array(3)].map((_, idx) => (
                        <li key={idx}>
                            <FollowListItemSkeleton />
                        </li>
                    ))
                }
                <li className={styles.followList__users__more}>
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