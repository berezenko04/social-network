'use client';

import { useRouter } from 'next/navigation'

//styles
import styles from './ProfileHead.module.scss'

//components
import IconButton from '../UI/IconButton'

//icons
import ArrowBackIcon from '@/assets/icons/arrow-back.svg'


type TProfilePageHeadProps = {
    postsCount: number,
    name: string
}

const ProfilePageHead: React.FC<TProfilePageHeadProps> = ({ postsCount, name }) => {
    const router = useRouter();

    return (
        <div className={styles.head}>
            <div className={styles.head__wrapper}>
                <IconButton
                    variant='neutral'
                    icon={<ArrowBackIcon />}
                    onClick={() => router.back()}
                />
                <div className={styles.head__info}>
                    <h1>{name}</h1>
                    {postsCount &&
                        <p>
                            {postsCount} {postsCount > 1 ? 'posts' : 'post'}
                        </p>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProfilePageHead