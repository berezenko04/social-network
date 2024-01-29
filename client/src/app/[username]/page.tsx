'use client';

import { NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react'

//components
import PrimaryLayout from '@/components/layouts/PrimaryLayout'
import ProfilePageHead from '@/components/ProfileHead'
import ProfilePageUser from '@/components/ProfileUserData'
import TabList from '@/components/TabList'
import PostItem from '@/components/PostComponents/PostItem';

//API
import { getUserByUsername } from '@/API/userService';
import { getLikedPosts, getUserPosts } from '@/API/postsService';

//redux
import { IUserData } from '@/redux/slices/user/types';
import { TPost } from '@/redux/slices/posts/types';



export type TProfilePageProps = {
    params: {
        username: string
    }
}

const ProfilePage: NextPage<TProfilePageProps> = ({ params }) => {
    const username = params.username;
    const tabList = ['Posts', 'Likes'];
    const [user, setUser] = useState<IUserData>();
    const [postsCount, setPostsCount] = useState<number>(0);
    const [selectedTab, setSelectedTab] = useState<string>(tabList[0]);
    const [userPosts, setUserPosts] = useState<TPost[]>([]);
    const [likedPosts, setLikedPosts] = useState<TPost[]>([]);

    useEffect(() => {
        (async () => {
            const userData = await getUserByUsername(username);
            const postsData = await getUserPosts(username);
            setUser(userData.user);
            setPostsCount(postsData.count);
            setUserPosts(postsData.posts);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const likesData = await getLikedPosts(username);
            setLikedPosts(likesData.posts);
        })();
    }, [selectedTab])

    return (
        <PrimaryLayout>
            {user &&
                <Fragment>
                    <ProfilePageHead
                        name={user.name}
                        postsCount={postsCount}
                    />
                    <ProfilePageUser {...user} />
                    <TabList
                        setSelectedTab={setSelectedTab}
                        selectedTab={selectedTab}
                        dataList={[
                            'Posts',
                            'Likes',
                        ]}
                    />
                    <ul>
                        {
                            selectedTab === 'Posts' ?
                                userPosts.map((post) => (
                                    <PostItem {...post} />
                                ))
                                :
                                likedPosts.map((post) => (
                                    <PostItem {...post} />
                                ))
                        }
                    </ul>

                </Fragment>
            }
        </PrimaryLayout>
    )
}

export default ProfilePage