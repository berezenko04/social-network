//styles
import styles from './PrimaryLayout.module.scss'

//components
import Sidebar from "@/components/Sidebar"
import Header from '@/components/Header'


const PrimaryLayout: React.FC = () => {

    return (
        <div className={styles.layout}>
            <div className='container'>
                <div className={styles.layout__wrapper}>
                    <Header />
                    <main>

                    </main>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default PrimaryLayout