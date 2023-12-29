import Link from 'next/link';
import Image from 'next/image';

//styles
import styles from './Header.module.scss'

//components
import NavigationLink from '@/components/NavigationLink'
import Button from '../UI/Button';
import UserCard from '../UserCard';


const Header: React.FC = () => {

    const navigation = [
        { name: 'Home', iconSource: 'home', href: '/home' },
        { name: 'Explore', iconSource: 'search', href: '/explore' },
        { name: 'Notifications', iconSource: 'bell', href: '/notifications' },
        { name: 'Messages', iconSource: 'message', href: '/messages' },
        { name: 'Bookmarks', iconSource: 'bookmark', href: '/bookmarks' },
        { name: 'Profile', iconSource: 'user', href: '/profile' },

    ];

    return (
        <header className={styles.header}>
            <div className={styles.header__wrapper}>
                <nav className={styles.header__navigation}>
                    <Link
                        href={'/home'}
                        className={styles.header__navigation__logo}
                    >
                        <Image
                            src={'/icons/logo.svg'}
                            width={32}
                            height={32}
                            alt='logo'
                        />
                    </Link>
                    {navigation.map((item, index) => (
                        <NavigationLink
                            key={index}
                            {...item}
                        />
                    ))}
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