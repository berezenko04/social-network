'use client';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

//styles
import styles from './AuthLayout.module.scss'
import 'react-toastify/dist/ReactToastify.css';

//icons
import Logo from '@/assets/icons/logo.svg'


interface IAuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        Cookies.get('token') && router.push('/home');
    }, []);

    return (
        <main className={styles.layout}>
            <div className={styles.layout__wrapper}>
                <div className={styles.layout__logo}>
                    <Logo />
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