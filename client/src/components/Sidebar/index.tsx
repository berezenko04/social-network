import Link from 'next/link';

//styles
import styles from './Sidebar.module.scss'

//components
import SearchBar from '../SearchBar'
import FollowList from '../FollowList'


const Sidebar: React.FC = () => {
    const footerMenu = [
        'Terms of Service', 'Privacy Policy', 'More',
        'Cookie policy', 'Ads info',
    ];

    const currentYear = new Date().getUTCFullYear();

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__wrapper}>
                <SearchBar />
                <FollowList />
                <ul className={styles.sidebar__footer}>
                    {footerMenu.map((i, idx) => (
                        <li key={idx}>
                            <Link href='#'>
                                {i}
                            </Link>
                        </li>
                    ))}
                    <li>
                        &copy; {currentYear} Reconnect
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar