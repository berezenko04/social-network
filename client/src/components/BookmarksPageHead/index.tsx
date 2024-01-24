'use client';

import { useSelector } from 'react-redux'
import { useRef, useState } from 'react';

//styles
import styles from './BookmarksPageHead.module.scss'

//components
import IconButton from '../UI/IconButton';

//redux
import { userDataSelector } from '@/redux/slices/user/selectors'

//icons
import MoreIcon from '@/assets/icons/more.svg'
import ActionsDropdown from '../ActionsDropdown';



const BookmarksPageHead: React.FC = () => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLButtonElement | null>(null);
    const userData = useSelector(userDataSelector);

    return (
        <div className={styles.head}>
            <div className={styles.head__wrapper}>
                <div className={styles.head__userInfo}>
                    <h1>Bookmarks</h1>
                    <p>@{userData?.username}</p>
                </div>
                <IconButton
                    variant='neutral'
                    icon={<MoreIcon />}
                    forwardedRef={dropdownRef}
                    onClick={() => setIsOpened(true)}
                />
                {isOpened &&
                    <div className={styles.head__overlay}>
                        <ActionsDropdown
                            forwardedRef={dropdownRef}
                            setIsOpened={setIsOpened}
                        >
                            <button style={{ color: '#f4212e' }}>
                                Clear all Bookmarks
                            </button>
                        </ActionsDropdown>
                    </div>
                }
            </div>
        </div>
    )
}

export default BookmarksPageHead