'use client';

import { useRouter } from 'next/navigation';

//styles
import styles from './UserItem.module.scss'

//components
import Avatar from '@/components/UI/Avatar';
import UserName from '../UserName';
import FollowButton from '../FollowButton';

//redux
import { IUserData } from '@/redux/slices/user/types';


interface IUserItemProps extends IUserData {
    withFollow?: boolean,
    sliced?: boolean,
    hovered?: boolean
}

const UserItem: React.FC<IUserItemProps> = ({
    withFollow = true, _id, username, name, avatarUrl, sliced, hovered }) => {
    const router = useRouter();

    return (
        <div className={styles.item}>
            <div
                className={styles.item__container}
                onClick={() => router.push(`/${username}`)}
            >
                <Avatar size='sm' imgSrc={avatarUrl} />
                <div className={styles.item__info}>
                    <UserName
                        name={name}
                        userId={_id}
                        sliced={sliced}
                        hovered={hovered}
                    />
                    <span>@{username}</span>
                </div>
            </div>
            {withFollow && <FollowButton targetId={_id} />}
        </div>
    )
}

export default UserItem