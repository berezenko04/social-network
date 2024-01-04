'use client';

import { useSelector } from "react-redux";
import Image from "next/image";

//styles
import styles from './UserCard.module.scss'

//redux
import { userDataSelector } from "@/redux/slices/user/selectors";

//icons
import MoreIcon from '@/assets/icons/more.svg'



const UserCard: React.FC = () => {
    const user = useSelector(userDataSelector);

    return (
        <>
            {user &&
                <button className={styles.card}>
                    <div className={styles.card__wrapper}>
                        <div className={styles.card__avatar}>
                            <Image
                                alt='avatar'
                                src={user.avatarUrl}
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className={styles.card__info}>
                            <span className={styles.card__info__name}>
                                {user.name}
                            </span>
                            <span className={styles.card__info__username}>
                                @{user.username}
                            </span>
                        </div>
                        <div className={styles.card__details}>
                            <MoreIcon />
                        </div>
                    </div>
                </button>
            }
        </>
    )
}

export default UserCard