'use client';

import Link from 'next/link'
import cn from 'classnames'
import { usePathname } from 'next/navigation'

//styles
import styles from './NavigationLink.module.scss'


interface INavigationLinkProps {
    href: string,
    icon: React.ReactNode,
    name: string
}

const NavigationLink: React.FC<INavigationLinkProps> = ({ href, icon, name }) => {
    const currentPath = usePathname();

    return (
        <Link
            href={href}
            className={cn(styles.link, currentPath === `/${name.toLowerCase()}` ? styles.link__active : '')}
        >
            <div className={styles.link__content}>
                {icon}
                <span>{name}</span>
            </div>
        </Link>
    )
}

export default NavigationLink