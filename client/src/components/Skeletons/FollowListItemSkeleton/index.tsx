import Skeleton from 'react-loading-skeleton'

//styles
import styles from './FollowListItemSkeleton.module.scss'

const FollowListItemSkeleton: React.FC = () => {
    return (
        <div className={styles.item}>
            <Skeleton circle width={40} height={40} />
            <div className={styles.item__user__info}>
                <Skeleton width={160} />
                <Skeleton width={120} />
            </div>
        </div>
    )
}

export default FollowListItemSkeleton