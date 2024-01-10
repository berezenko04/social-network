//styles
import styles from './PrimaryLayout.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'

//components
import Sidebar from "@/components/Sidebar"
import Header from '@/components/Header'

interface IPrimaryLayoutProps {
    children: React.ReactNode
}


const PrimaryLayout: React.FC<IPrimaryLayoutProps> = ({ children }) => {

    return (
        <div className={styles.layout}>
            <div className='container'>
                <div className={styles.layout__wrapper}>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default PrimaryLayout