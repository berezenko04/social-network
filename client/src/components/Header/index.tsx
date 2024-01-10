import Link from 'next/link';

//styles
import styles from './Header.module.scss'

//components
import NavigationLink from '@/components/NavigationLink'
import Button from '../UI/Button';
import UserCard from '../UserCard';

//icons
import Logo from '@/assets/icons/logo.svg'
import HomeIcon from '@/assets/icons/home.svg'
import SearchIcon from '@/assets/icons/search.svg'
import BellIcon from '@/assets/icons/bell.svg'
import MessageIcon from '@/assets/icons/message.svg'
import BookmarkIcon from '@/assets/icons/bookmark.svg'
import UserIcon from '@/assets/icons/user.svg'


const Header: React.FC = () => {

    const navigation = [
        { name: 'Home', icon: <HomeIcon />, href: '/home' },
        { name: 'Explore', icon: <SearchIcon />, href: '/explore' },
        { name: 'Notifications', icon: <BellIcon />, href: '/notifications' },
        { name: 'Messages', icon: <MessageIcon />, href: '/messages' },
        { name: 'Bookmarks', icon: <BookmarkIcon />, href: '/bookmarks' },
        { name: 'Profile', icon: <UserIcon />, href: '/profile' },
    ];

    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <nav className={styles.header__navigation}>
                    <Link
                        href={'/home'}
                        className={styles.header__navigation__logo}
                    >
                        <Logo />
                    </Link>
                    <ul className={styles.header__navigation__menu}>
                        {navigation.map((item, index) => (
                            <li key={index}>
                                <NavigationLink
                                    {...item}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className={styles.header__post}>
                        <Button
                            variant='primary'
                            size='lg'
                        >
                            Post
                        </Button>
                    </div>
                </nav>
                <UserCard />
            </div>
        </header>
    )
}

export default Header