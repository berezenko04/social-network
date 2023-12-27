import Link from 'next/link'
import Image from 'next/image'

//styles
import styles from './NavigationLink.module.scss'


interface INavigationLinkProps {
    href: string,
    iconSource: string,
    name: string
}

const NavigationLink: React.FC<INavigationLinkProps> = ({ href, iconSource, name }) => {
    return (
        <Link href={href} className={styles.link}>
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