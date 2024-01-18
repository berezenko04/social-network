'use client';

import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

//styles
import styles from './PostPage.module.scss'

//components
import PrimaryLayout from '@/components/layouts/PrimaryLayout'
import IconButton from '@/components/UI/IconButton'
import PostItem from '@/components/PostItem';
import PostSkeleton from '@/components/Skeletons/PostSkeleton';

//icons
import ArrowBackIcon from '@/assets/icons/arrow-back.svg'

//redux
import { TPost } from '@/redux/slices/posts/types';

//API
import { getPost } from '@/API/postsService';


type TPostPageProps = {
    params: {
        postId: string
    }
}

const PostPage: NextPage<TPostPageProps> = ({ params }) => {
    const router = useRouter();
    const [post, setPost] = useState<TPost>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getPost(params.postId);
                setPost(data.post);

            } catch (err) {
                toast.error('Error while receiving post');
            }
        }

        fetchData();
    }, []);

    return (
        <PrimaryLayout>
            <div className={styles.page__head}>
                <IconButton
                    variant='neutral'
                    icon={<ArrowBackIcon />}
                    onClick={() => router.back()}
                />
                <h1>Post</h1>
            </div>
            <div className={styles.page__post}>
                {post ? <PostItem {...post} /> : <PostSkeleton />}
            </div>
        </PrimaryLayout>
    )
}

export default PostPage