'use client';

import Link from 'next/link'
import Image from 'next/image'
import cn from 'classnames'
import { usePathname } from 'next/navigation'

//styles
import styles from './NavigationLink.module.scss'


interface INavigationLinkProps {
    href: string,
    iconSource: string,
    name: string
}

const NavigationLink: React.FC<INavigationLinkProps> = ({ href, iconSource, name }) => {
    const currentPath = usePathname();

    return (
        <Link
            href={href}
            className={cn(styles.link, currentPath === `/${name.toLowerCase()}` ? styles.link__active : '')}
        >
            <div className={styles.link__content}>
                <Image
                    width={32}
                    height={32}
                    alt=''
                    src={`/icons/${iconSource}.svg`}
                />
                <span>{name}</span>
            </div>
        </Link>
    )
}

export default NavigationLink