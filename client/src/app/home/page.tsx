import { NextPage } from 'next'

//components
import PrimaryLayout from '@/components/layouts/PrimaryLayout'
import ProfileInfoForm from '@/components/Forms/ProfileInfoForm'


const Home: NextPage = () => {
    return (
        <PrimaryLayout>
            <ProfileInfoForm />
        </PrimaryLayout>
    )
}

export default Home