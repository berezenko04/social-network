'use client';

import InfiniteScroll from 'react-infinite-scroll-component'
import { useAppDispatch } from '@/redux/store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

//styles
import styles from './PostsList.module.scss'

//redux
import { fetchPosts } from '@/redux/slices/posts/asyncActions';
import { postsSelector } from '@/redux/slices/posts/selectors';

//components
import PostItem from '../PostItem';


const PostsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const posts = useSelector(postsSelector);
    const [page, setPage] = useState(1);

    const getPosts = async (pageNumber: number) => {
        await dispatch(fetchPosts(pageNumber));
    }

    useEffect(() => {
        getPosts(page);
    }, [page]);

    const fetchMorePosts = () => {
        setPage(page + 1);
    }

    return (
        <>
            {posts &&
                // <InfiniteScroll
                //     dataLength={posts.length}
                //     next={fetchMorePosts}
                //     hasMore={true}
                //     loader={<></>}
                // >
                <ul className={styles.list}>
                    {posts.map((post, idx) => (
                        <PostItem {...post} key={idx} />
                    ))}
                </ul>
                // </InfiniteScroll>
            }
        </>
    )
}

export default PostsList