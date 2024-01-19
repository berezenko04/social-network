'use client';
import { useEffect, useState } from 'react';

//styles
import styles from './UserName.module.scss'

//components
import UserModal from '../UserModal'

//icons
import VerifiedIcon from '@/assets/icons/verified.svg'

type TUserNameProps = {
    name: string,
    sliced?: boolean,
    userId: string,
    hovered?: boolean
}

const UserName: React.FC<TUserNameProps> = ({ name, userId, hovered = false, sliced = false }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isHovered && hovered) {
            timeout = setTimeout(() => {
                setShowModal(true);
            }, 200);
        } else {
            setShowModal(false);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isHovered, hovered]);

    return (
        <div
            className={styles.userName}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {sliced ?
                (name.length > 15 ?
                    `${name.slice(0, 15)}...`
                    :
                    name
                )
                :
                name
            }
            <VerifiedIcon />
            {showModal &&
                <div className={styles.userName__modal}>
                    <UserModal userId={userId} />
                </div>
            }
        </div>
    )
}

export default UserName