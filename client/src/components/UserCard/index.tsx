'use client';

import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

//styles
import styles from './UserCard.module.scss'

//components
import Avatar from "../UI/Avatar";

//redux
import { userDataSelector } from "@/redux/slices/user/selectors";
import { useAppDispatch } from "@/redux/store";
import { logout } from "@/redux/slices/user/slice";

//icons
import MoreIcon from '@/assets/icons/more.svg'


const UserCard: React.FC = () => {
    const user = useSelector(userDataSelector);
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [isOpened, setIsOpened] = useState(false);
    const cardRef = useRef<null | HTMLButtonElement>(null);

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login');
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
                setIsOpened(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [cardRef])

    return (
        <button
            className={styles.card}
            onClick={() => setIsOpened(!isOpened)}
            ref={cardRef}
        >
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
                {isOpened &&
                    <div className={styles.card__overlay}>
                        <button onClick={handleLogout}>
                            Log out @{user?.username}
                        </button>
                    </div>
                }
            </div>
        </button>
    )
}

export default UserCard