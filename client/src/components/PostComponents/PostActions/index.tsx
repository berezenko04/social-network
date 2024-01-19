'use client';

import { useRef, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { usePathname, useRouter } from 'next/navigation';

//styles
import styles from './PostActions.module.scss'

//components
import IconButton from '@/components/UI/IconButton'
import SharePostDropdown from '../../SharePostDropdown';

//icons
import LikeIcon from '@/assets/icons/like.svg'
import LikeFilledIcon from '@/assets/icons/like-filled.svg'
import BookmarkIcon from '@/assets/icons/bookmark.svg'
import BookmarkFilledIcon from '@/assets/icons/bookmark-filled.svg'
import ShareIcon from '@/assets/icons/share.svg'
import RedirectIcon from '@/assets/icons/redirect.svg'

//API
import { likePost, getLikesCount, isPostLiked } from '@/API/likesService';
import { bookmarkPost, isPostBookmarked } from '@/API/bookmarksService';


type TPostActionsProps = {
    postId: string
}

const PostActions: React.FC<TPostActionsProps> = ({ postId }) => {
    const [likesCount, setLikesCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [isShareOpened, setIsShareOpened] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const shareRef = useRef<HTMLButtonElement | null>(null);


    useEffect(() => {
        (async () => {
            const likesData = await getLikesCount(postId);
            const isLikeData = await isPostLiked(postId);
            const isBookmarkedData = await isPostBookmarked(postId);

            setIsLiked(isLikeData.isLiked);
            setLikesCount(likesData.count);
            setIsBookmarked(isBookmarkedData.isBookmark);
        })();
    }, [postId]);

    const handleLike = async () => {
        try {
            await likePost(postId);
            setIsLiked(prev => !prev);
            let inc = 0;
            isLiked ? inc-- : inc++;
            setLikesCount(prev => prev + inc);

        } catch (err) {
            toast.error('Error when like / dislike');
        }
    }

    const handleBookmark = async () => {
        try {
            await bookmarkPost(postId);
            setIsBookmarked(prev => !prev);
            if (isBookmarked) {
                toast.info('Removed from your bookmarks');
            } else {
                toast.info('Added to your bookmarks');
            }
        } catch (err) {
            toast.error("Error when bookmarking");
        }
    }

    return (
        <div className={styles.actions}>
            <div className={styles.actions__default}>
                <IconButton
                    variant='red'
                    icon={isLiked ? <LikeFilledIcon /> : <LikeIcon />}
                    active={isLiked}
                    text={`${likesCount}`}
                    onClick={handleLike}
                />
            </div>
            <div className={styles.actions__share}>
                <IconButton
                    variant='blue'
                    active={isBookmarked}
                    onClick={handleBookmark}
                    icon={
                        isBookmarked ?
                            <BookmarkFilledIcon /> : <BookmarkIcon />
                    }
                />
                <IconButton
                    variant='blue'
                    icon={<ShareIcon />}
                    onClick={() => setIsShareOpened(true)}
                    forwardedRef={shareRef}
                />
                {isShareOpened &&
                    <div className={styles.actions__share__overlay}>
                        <SharePostDropdown
                            forwardedRef={shareRef}
                            setIsShareOpened={setIsShareOpened}
                            postId={postId}
                        />
                    </div>
                }
                {!pathname.includes('posts') &&
                    <IconButton
                        variant='blue'
                        onClick={() => router.push(`/posts/${postId}`)}
                        icon={<RedirectIcon />}
                    />
                }
            </div>
        </div>
    )
}

export default PostActions