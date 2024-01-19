import { NextPage } from 'next'

import 'react-loading-skeleton/dist/skeleton.css'

//components
import PrimaryLayout from '@/components/layouts/PrimaryLayout'
import CreatePost from '@/components/CreatePost'
import PostsList from '@/components/PostComponents/PostsList'


const Home: NextPage = () => {
    return (
        <PrimaryLayout>
            <CreatePost />
            <PostsList />
        </PrimaryLayout>
    )
}

export default Home