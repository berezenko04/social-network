'use client';

import { Fragment, useEffect, useState } from 'react'

//styles
import styles from './UserModal.module.scss'

//components
import Avatar from '../../UI/Avatar'
import FollowButton from '../FollowButton';
import UserName from '../UserName';

//redux
import { IUserData } from '@/redux/slices/user/types'

//API
import { getUser } from '@/API/userService';
import { useSelector } from 'react-redux';
import { userDataSelector } from '@/redux/slices/user/selectors';


type TUserModalProps = {
    userId: string
}

const UserModal: React.FC<TUserModalProps> = ({ userId }) => {
    const [user, setUser] = useState<IUserData>();
    useEffect(() => {
        (async () => {
            const data = await getUser(userId);
            setUser(data);
        })();
    }, []);

    const me = useSelector(userDataSelector);

    return (
        <div className={styles.modal}>
            <div className={styles.modal__wrapper}>
                {user &&
                    <Fragment>
                        <div className={styles.modal__head}>
                            <Avatar size='md' imgSrc={user?.avatarUrl} />
                            {me && (me._id !== userId &&
                                <FollowButton targetId={user._id} />
                            )}
                        </div>
                        <div className={styles.modal__user}>
                            <UserName name={user?.name} userId={userId} />
                            <span>
                                @{user.username}
                            </span>
                        </div>
                        {user.description &&
                            <p className={styles.modal__desc}>
                                {user.description}
                            </p>
                        }
                        <ul className={styles.modal__following}>
                            <li>
                                <span>{user.following}</span>
                                <p>Following</p>
                            </li>
                            <li>
                                <span>{user.followers}</span>
                                <p>Followers</p>
                            </li>
                        </ul>
                    </Fragment>
                }
            </div>
        </div>
    )
}

export default UserModal