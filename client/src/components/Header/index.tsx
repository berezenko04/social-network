//styles
import Link from 'next/link';
import styles from './Header.module.scss'

//components
import NavigationLink from '@/components/NavigationLink'
import Image from 'next/image';
import Button from '../UI/Button';

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
                <button className={styles.header__profile}>
                    <div className={styles.header__profile__wrapper}>
                        <div className={styles.header__profile__avatar}>
                            <Image
                                alt=''
                                src={''}
                                width={40}
                                height={40}
                            />
                        </div>
                        <div className={styles.header__profile__info}>
                            <span className={styles.header__profile__info__name}>
                                Roman
                            </span>
                            <span className={styles.header__profile__info__username}>
                                @luxurypluxury
                            </span>
                        </div>
                        <div className={styles.header__profile__details}>
                            <Image
                                alt=''
                                src={'/icons/more.svg'}
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                </button>
            </div>
        </header>
    )
}

export default Header