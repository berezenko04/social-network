'use client';

import { useEffect } from 'react'
import { useSelector } from 'react-redux';

//styles
import styles from './BookmarksList.module.scss'

//components
import PostItem from '../PostComponents/PostItem';
import PostSkeleton from '../Skeletons/PostSkeleton';

//redux
import { useAppDispatch } from '@/redux/store';
import { bookmarksSelector } from '@/redux/slices/bookmarks/selectors';
import { fetchBookmarks } from '@/redux/slices/bookmarks/asyncActions';
import { Status } from '@/@types/type';

const BookmarksList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data, status } = useSelector(bookmarksSelector);

    useEffect(() => {
        (async () => {
            await dispatch(fetchBookmarks());
        })();
    }, []);

    return (
        <div className={styles.bookmarks}>
            <ul className={styles.bookmarks__list}>
                {status === Status.SUCCESS ? data.map((post, idx) => (
                    <PostItem {...post} key={idx} />
                ))
                    :
                    [...Array(3).map(() => (
                        <PostSkeleton />
                    ))]
                }
            </ul>
            {(status === Status.SUCCESS && data.length === 0) &&
                <div className={styles.bookmarks__info}>
                    <h2>
                        Save posts for later
                    </h2>
                    <p>
                        Bookmark posts to easily find them again in the future.
                    </p>
                </div>
            }
        </div >
    )
}

export default BookmarksList