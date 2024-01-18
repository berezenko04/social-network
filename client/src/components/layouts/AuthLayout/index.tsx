'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

//styles
import styles from './AuthLayout.module.scss'
import 'react-toastify/dist/ReactToastify.css';

//components
import ToastContainer from '@/components/UI/ToastContainer';

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
            <ToastContainer />
        </main>
    )
}

export default AuthLayout