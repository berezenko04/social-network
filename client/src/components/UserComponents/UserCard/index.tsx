'use client';

import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

//styles
import styles from './UserCard.module.scss'

//components
import Avatar from "../../UI/Avatar";

//redux
import { userDataSelector } from "@/redux/slices/user/selectors";
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/user/slice";

//icons
import MoreIcon from '@/assets/icons/more.svg'
import VerifiedIcon from '@/assets/icons/verified.svg'
import ActionsDropdown from "../../ActionsDropdown";


const UserCard: React.FC = () => {
    const user = useSelector(userDataSelector);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const cardRef = useRef<null | HTMLButtonElement>(null);
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    }


    return (
        <button
            className={styles.card}
            onClick={() => setIsOpened(prev => !prev)}
            ref={cardRef}
        >
            <div className={styles.card__wrapper}>
                <Avatar size="sm" imgSrc={user?.avatarUrl} />
                <div className={styles.card__info}>
                    <span className={styles.card__info__name}>
                        {user ? user.name : <Skeleton width={150} height={16} />}
                        <VerifiedIcon />
                    </span>
                    <span className={styles.card__info__username}>
                        {user ? `@${user.username}` : <Skeleton width={100} />}
                    </span>
                </div>
                <div className={styles.card__details}>
                    <MoreIcon />
                </div>
                {isOpened &&
                    <div className={styles.card__overlay}>
                        <ActionsDropdown
                            forwardedRef={cardRef}
                            setIsOpened={setIsOpened}
                        >
                            <button onClick={handleLogout}>
                                Log out @{user?.username}
                            </button>
                        </ActionsDropdown>
                    </div>
                }
            </div>
        </button>
    )
}

export default UserCard