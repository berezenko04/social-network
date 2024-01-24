import Image from 'next/image'
import cn from 'classnames'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

//styles
import styles from './Avatar.module.scss'


interface IAvatarProps {
    imgSrc?: string,
    profileLink?: string,
    size: 'sm' | 'md' | 'lg'
}

const Avatar: React.FC<IAvatarProps> = ({ size, imgSrc, profileLink }) => {
    const sizes = cn(styles[`avatar__${size}`]);

    return (
        <div className={cn(styles.avatar, sizes)}>
            {imgSrc ? (profileLink ?
                <Link href={profileLink}>
                    <Image
                        src={imgSrc}
                        height={64}
                        width={64}
                        alt='avatar'
                    />
                </Link>
                :
                <Image
                    src={imgSrc}
                    height={64}
                    width={64}
                    alt='avatar'
                />)
                :
                <Skeleton
                    circle
                    height="100%"
                    width="100%"
                />
            }
        </div>
    )
}

export default Avatar