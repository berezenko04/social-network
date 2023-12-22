import Image from 'next/image'

//styles
import styles from './AuthLayout.module.scss'

interface IAuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout: React.FC<IAuthLayoutProps> = ({ children }) => {
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
                    {children}
                </div>
            </div>
        </main>
    )
}

export default AuthLayout