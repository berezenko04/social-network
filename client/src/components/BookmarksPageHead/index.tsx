'use client';

import { useSelector } from 'react-redux'
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

//styles
import styles from './BookmarksPageHead.module.scss'

//components
import IconButton from '../UI/IconButton';
import ActionsDropdown from '../ActionsDropdown';

//redux
import { userDataSelector } from '@/redux/slices/user/selectors'
import { useAppDispatch } from '@/redux/store';
import { clearBookmarksData } from '@/redux/slices/bookmarks/slice';
import { bookmarksSelector } from '@/redux/slices/bookmarks/selectors';

//icons
import MoreIcon from '@/assets/icons/more.svg'

//API
import { clearBookmarks } from '@/API/bookmarksService';


const BookmarksPageHead: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data } = useSelector(bookmarksSelector);
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLButtonElement | null>(null);
    const userData = useSelector(userDataSelector);

    const handleClearBookmarks = async () => {
        try {
            dispatch(clearBookmarksData());
            await clearBookmarks();
        } catch (err) {
            toast.error('An error occurred');
        }
    }

    return (
        <div className={styles.head}>
            <div className={styles.head__wrapper}>
                <div className={styles.head__userInfo}>
                    <h1>Bookmarks</h1>
                    <p>@{userData?.username}</p>
                </div>
                {data.length &&
                    <IconButton
                        variant='neutral'
                        icon={<MoreIcon />}
                        forwardedRef={dropdownRef}
                        onClick={() => setIsOpened(true)}
                    />
                }
                {isOpened &&
                    <div className={styles.head__overlay}>
                        <ActionsDropdown
                            forwardedRef={dropdownRef}
                            setIsOpened={setIsOpened}
                        >
                            <button
                                style={{ color: '#f4212e' }}
                                onClick={handleClearBookmarks}
                            >
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