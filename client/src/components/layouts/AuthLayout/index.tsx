'use client';

import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

//styles
import styles from './AuthLayout.module.scss'
import 'react-toastify/dist/ReactToastify.css';


interface IAuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const user = localStorage.getItem('token');
        user && router.push('/home');
    }, []);

    return (
        <main className={styles.layout}>
            <div className={styles.layout__wrapper}>
                <div className={styles.layout__logo}>
                    <Image
                        src={'./icons/logo.svg'}
                        alt='logo'
                        width={32}
                        height={32}
                    />
                </div>
                <div className={styles.layout__form}>
                    <div className={styles.layout__form__wrapper}>
                        {children}
                    </div>
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                theme="dark"
            />
        </main>
    )
}

export default AuthLayout