'use client';

import { useEffect, useState } from 'react'

//styles
import styles from './BookmarksList.module.scss'

//components
import PostItem from '../PostComponents/PostItem';
import PostSkeleton from '../Skeletons/PostSkeleton';

//redux
import { TPost } from '@/redux/slices/posts/types';

//API
import { getBookmarks } from '@/API/bookmarksService';


const BookmarksList: React.FC = () => {
    const [data, setData] = useState<TPost[]>([]);

    useEffect(() => {
        (async () => {
            const bookmarks = await getBookmarks();
            setData(bookmarks);
        })();
    }, []);

    return (
        <div className={styles.bookmarks}>
            <ul className={styles.bookmarks__list}>
                {data ? data.map((post, idx) => (
                    <PostItem {...post} key={idx} />
                ))
                    :
                    [...Array(3)].map((_, idx) => (
                        <li key={idx}>
                            <PostSkeleton />
                        </li>
                    ))
                }
            </ul>
            {!data.length && <p>Not found</p>}
        </div>
    )
}

export default BookmarksList