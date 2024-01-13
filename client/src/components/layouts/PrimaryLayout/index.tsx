'use client';

import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { ToastContainer } from 'react-toastify';

//styles
import styles from './PrimaryLayout.module.scss'
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css';

//components
import Sidebar from "@/components/Sidebar"
import Header from '@/components/Header'


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
                    <ToastContainer
                        position="bottom-center"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        theme="dark"
                    />
                </div>
            </div>
        </div>
    )
}

export default PrimaryLayout