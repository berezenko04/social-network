import { NextPage } from 'next'

import 'react-loading-skeleton/dist/skeleton.css'

//components
import PrimaryLayout from '@/components/layouts/PrimaryLayout'
import CreatePost from '@/components/CreatePost'


const Home: NextPage = () => {
    return (
        <PrimaryLayout>
            <CreatePost />
        </PrimaryLayout>
    )
}

export default Home