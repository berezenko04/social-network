'use client';

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

//styles
import styles from './PrimaryLayout.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';

//components
import Sidebar from "@/components/Sidebar"
import Header from '@/components/Header'
import ToastContainer from '@/components/UI/ToastContainer';


interface IPrimaryLayoutProps {
    children: React.ReactNode
}


const PrimaryLayout: React.FC<IPrimaryLayoutProps> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        !Cookies.get('token') && router.push('/login');
    }, [])

    return (
        <div className={styles.layout}>
            <div className='container'>
                <div className={styles.layout__wrapper}>
                    <Header />
                    <main>
                        {children}
                    </main>
                    <Sidebar />
                    <ToastContainer />
                </div>
            </div>
        </div>
    )
}

export default PrimaryLayout