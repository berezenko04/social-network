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
import { TPost } from '@/redux/slices/posts/types';

//components
import PostItem from '../PostItem';
import PostSkeleton from '../Skeletons/PostSkeleton';


const PostsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { data, count } = useSelector(postsSelector);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState<TPost[]>([]);
    const MAX_PER_PAGE = 10;

    const getPosts = async (pageNumber: number) => {
        const response = await dispatch(fetchPosts(pageNumber));
        const newPosts = response.payload.posts || [];
        return newPosts;
    }

    useEffect(() => {
        (async () => {
            console.log('Fetch in state Posts');
            const newPosts = await getPosts(page);
            setPosts(prev => [...prev, ...newPosts]);
        })();
    }, [page]);

    const fetchMorePosts = () => {
        setPage(page + 1);
    }

    return (

        <ul className={styles.list}>
            {data &&
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchMorePosts}
                    hasMore={count > MAX_PER_PAGE * page}
                    loader={<p>Loading...</p>}
                >
                    {posts.map((post, idx) => (
                        <PostItem {...post} key={idx} />
                    ))}
                </InfiniteScroll>
                // :
                // [...Array(6)].map((_, idx) => (
                //     <PostSkeleton key={idx} />
                // ))
            }
        </ul>
    )
}

export default PostsList