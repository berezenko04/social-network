'use client';

import { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

//styles
import styles from './PostItem.module.scss'

//API
import { getUser } from '@/API/userService';
import { likePost, getLikesCount, isPostLiked } from '@/API/likesService';
import { bookmarkPost, isPostBookmarked } from '@/API/bookmarksService';

//components
import Avatar from '../UI/Avatar';
import IconButton from '../UI/IconButton';

//utils
import { formatDate } from '@/utils/formatDate';

//icons
import VerifiedIcon from '@/assets/icons/verified.svg'
import LikeIcon from '@/assets/icons/like.svg'
import LikeFilledIcon from '@/assets/icons/like-filled.svg'
import ViewsIcon from '@/assets/icons/trends.svg'
import BookmarkIcon from '@/assets/icons/bookmark.svg'
import BookmarkFilledIcon from '@/assets/icons/bookmark-filled.svg'
import ShareIcon from '@/assets/icons/share.svg'
import RedirectIcon from '@/assets/icons/redirect.svg'

//redux
import { TPost } from '@/redux/slices/posts/types';
import { IUserData } from '@/redux/slices/user/types';
import UserName from '../UserName';


const PostItem: React.FC<TPost> = ({ _id, user, content, attached, views, createdAt }) => {
    const [userData, setUserData] = useState<IUserData>();
    const [likesCount, setLikesCount] = useState<number>(0);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const router = useRouter();


    useEffect(() => {
        (async () => {
            const userData = await getUser(user);
            const likesData = await getLikesCount(_id);
            const isLikeData = await isPostLiked(_id);
            const isBookmarkedData = await isPostBookmarked(_id);

            setIsLiked(isLikeData.isLiked);
            setLikesCount(likesData.count);
            setUserData(userData);
            setIsBookmarked(isBookmarkedData.isBookmark);
        })();
    }, [_id]);


    const handleLike = async () => {
        try {
            await likePost(_id);
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
            await bookmarkPost(_id);
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
        <>
            {(userData) &&
                <li className={styles.postItem}>
                    <div className={styles.postItem__wrapper}>
                        <Avatar size='sm' imgSrc={userData?.avatarUrl} />
                        <div className={styles.postItem__main}>
                            <div className={styles.postItem__main__head}>
                                <Link href={`/${userData.name}`}>
                                    <UserName
                                        name={userData.name}
                                        userId={userData._id}
                                        hovered
                                    />
                                </Link>
                                <p>@{userData.username}</p>
                                <span className={styles.divider} />
                                <p>{formatDate(createdAt)}</p>
                            </div>
                            <div className={styles.postItem__main__content}>
                                <p className={styles.postItem__main__content__text}>
                                    {content}
                                </p>
                                {!!attached.length &&
                                    <div className={styles.postItem__main__content__attached}>
                                        {attached.map((item, idx) => (
                                            <div
                                                className={styles.postItem__main__content__attached__item}
                                                key={idx}
                                            >
                                                <Image
                                                    width={300}
                                                    height={240}
                                                    src={item}
                                                    alt=''
                                                />
                                            </div>
                                        ))}
                                    </div>
                                }
                            </div>
                            <div className={styles.postItem__main__footer}>
                                <div className={styles.postItem__main__footer__actions}>
                                    <IconButton
                                        variant='red'
                                        icon={isLiked ? <LikeFilledIcon /> : <LikeIcon />}
                                        active={isLiked}
                                        text={`${likesCount}`}
                                        onClick={handleLike}
                                    />
                                    <IconButton
                                        variant='blue'
                                        icon={<ViewsIcon />}
                                        text={`${views}`}
                                    />
                                </div>
                                <div className={styles.postItem__main__footer__share}>
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
                                    />
                                    <IconButton
                                        variant='blue'
                                        onClick={() => router.push(`/posts/${_id}`)}
                                        icon={<RedirectIcon />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            }
        </>
    )
}

export default PostItem