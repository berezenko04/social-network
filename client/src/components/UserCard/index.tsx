'use client';

import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

//styles
import styles from './UserCard.module.scss'

//redux
import { userDataSelector } from "@/redux/slices/user/selectors";

//icons
import MoreIcon from '@/assets/icons/more.svg'
import Avatar from "../UI/Avatar";


const UserCard: React.FC = () => {
    const user = useSelector(userDataSelector);

    return (
        <>
            <button className={styles.card}>
                <div className={styles.card__wrapper}>
                    <Avatar size="sm" imgSrc={user?.avatarUrl} />
                    <div className={styles.card__info}>
                        <span className={styles.card__info__name}>
                            {user ? user.name : <Skeleton width={150} height={16} />}
                        </span>
                        <span className={styles.card__info__username}>
                            {user ? `@${user.username}` : <Skeleton width={100} />}
                        </span>
                    </div>
                    <div className={styles.card__details}>
                        <MoreIcon />
                    </div>
                </div>
            </button>
        </>
    )
}

export default UserCard