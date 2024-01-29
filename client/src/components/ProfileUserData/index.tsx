import Image from 'next/image'
import Link from 'next/link'
import { useSelector } from 'react-redux'

//styles
import styles from './ProfileUserData.module.scss'

//components
import Avatar from '../UI/Avatar'
import Button from '../UI/Button'

//redux
import { IUserData } from '@/redux/slices/user/types'
import { userDataSelector } from '@/redux/slices/user/selectors'

//icons
import LinkIcon from '@/assets/icons/copy.svg'
import CalendarIcon from '@/assets/icons/calendar.svg'
import FollowButton from '../UserComponents/FollowButton'


const ProfilePageUser: React.FC<IUserData> = ({
    _id, name, username, posterUrl, avatarUrl, description,
    siteUrl, birthDate, following, followers
}) => {
    const myData = useSelector(userDataSelector);

    return (
        <div className={styles.user}>
            <div className={styles.user__wrappper}>
                <div className={styles.user__poster}>
                    {posterUrl ?
                        <Image
                            src={posterUrl}
                            width={800}
                            height={200}
                            alt='poster'
                        />
                        :
                        <div className={styles.user__poster__default} />
                    }
                </div>
                <div className={styles.user__main}>
                    <div className={styles.user__main__head}>
                        <div className={styles.user__main__head__avatar}>
                            <Avatar size='lg' imgSrc={avatarUrl} />
                        </div>
                        <div />
                        {myData?._id === _id ?
                            <Button
                                variant='fourtiary'
                                size='sm'
                                fullWidth={false}
                            >
                                Edit profile
                            </Button>
                            :
                            <FollowButton targetId={_id} />
                        }
                    </div>
                    <div className={styles.user__main__info}>
                        <div className={styles.user__main__info__name}>
                            <h2>{name}</h2>
                            <p>@{username}</p>
                        </div>
                        {description &&
                            <p className={styles.user__main__info__desc}>
                                {description}
                            </p>
                        }
                        <div className={styles.user__main__info__birth}>
                            {siteUrl &&
                                <div>
                                    <LinkIcon />
                                    <Link href={siteUrl}>{siteUrl}</Link>
                                </div>
                            }
                            <div>
                                <CalendarIcon />
                                <p>Joined {birthDate.slice(2)}</p>
                            </div>
                        </div>
                        <div className={styles.user__main__info__follows}>
                            <Link
                                href={`/profile/${username}/following`}
                                className={styles.user__main__info__follows__item}
                            >
                                <span>{following}</span>
                                <p>Following</p>
                            </Link>
                            <Link
                                href={`/profile/${username}/followers`}
                                className={styles.user__main__info__follows__item}
                            >
                                <span>{followers}</span>
                                <p>Followers</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePageUser