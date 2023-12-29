import { NextPage } from 'next'

//components
import PrimaryLayout from '@/components/layouts/PrimaryLayout'


const Home: NextPage = () => {
    return (
        <PrimaryLayout>
            <>
                {[...Array(100)].map((_, idx) => (
                    <h1 key={idx}>qq</h1>
                ))}
            </>

        </PrimaryLayout>
    )
}

export default Home