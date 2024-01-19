'use client';

import { Fragment, useEffect, useState } from 'react'

//styles
import styles from './PostItem.module.scss'

//components
import Avatar from '../../UI/Avatar';
import PostUserInfo from '../PostUserInfo';
import PostContent from '../PostContent';
import PostActions from '../PostActions';

//redux
import { TPost } from '@/redux/slices/posts/types';
import { IUserData } from '@/redux/slices/user/types';

//API
import { getUser } from '@/API/userService';



const PostItem: React.FC<TPost> = ({ _id, user, content, attached, createdAt }) => {
    const [userData, setUserData] = useState<IUserData>();

    useEffect(() => {
        (async () => {
            const userData = await getUser(user);
            setUserData(userData);
        })();
    }, [_id]);

    return (
        <Fragment>
            {(userData) &&
                <li className={styles.postItem}>
                    <div className={styles.postItem__wrapper}>
                        <Avatar size='sm' imgSrc={userData?.avatarUrl} />
                        <div className={styles.postItem__main}>
                            <PostUserInfo
                                createdAt={createdAt}
                                {...userData}
                            />
                            <PostContent
                                content={content}
                                attached={attached}
                            />
                            <PostActions postId={_id} />
                        </div>
                    </div>
                </li>
            }
        </Fragment>
    )
}

export default PostItem