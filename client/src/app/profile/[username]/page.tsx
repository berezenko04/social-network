'use client';

import { NextPage } from 'next'
import { Fragment, useEffect, useState } from 'react';

//components
import PrimaryLayout from '@/components/layouts/PrimaryLayout'
import ProfilePageHead from '@/components/ProfilePageHead';
import ProfilePageUser from '@/components/ProfilePageUser';

//API
import { getPostsCount, getUserByUsername } from '@/API/userService';

//redux
import { IUserData } from '@/redux/slices/user/types';



type TProfilePageProps = {
    params: {
        username: string
    }
}

const ProfilePage: NextPage<TProfilePageProps> = ({ params }) => {
    const username = params.username;
    const [user, setUser] = useState<IUserData>();
    const [postsCount, setPostsCount] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const data = await getUserByUsername(username);
            const countData = await getPostsCount(username);
            setUser(data.user);
            setPostsCount(countData.count);
        })();
    }, []);

    return (
        <PrimaryLayout>
            {user &&
                <Fragment>
                    <ProfilePageHead
                        name={user.name}
                        postsCount={postsCount}
                    />
                    <ProfilePageUser {...user} />
                </Fragment>
            }
        </PrimaryLayout>
    )
}

export default ProfilePage