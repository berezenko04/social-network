import Skeleton from 'react-loading-skeleton';

//styles
import styles from './PostSkeleton.module.scss'


const PostSkeleton: React.FC = () => {

    return (
        <li className={styles.postSkeleton} style={{ color: 'white' }}>
            <div className={styles.postSkeleton__wrapper}>
                <Skeleton circle width={40} height={40} />
                <div className={styles.postSkeleton__main}>
                    <div className={styles.postSkeleton__main__head}>
                        <Skeleton width={'25%'} inline style={{ marginRight: '8px' }} />
                        <Skeleton width={'20%'} inline style={{ marginRight: '8px' }} />
                        <Skeleton width={'10%'} inline />
                    </div>
                    <div className={styles.postSkeleton__main__content}>
                        {/* {[...Array(5)].map((_, idx) => (
                            <Skeleton width={`${50 - idx * 10}%`} />
                        ))} */}
                        <Skeleton height={100} />
                    </div>
                    <div className={styles.postSkeleton__main__footer}>
                        <div className={styles.postSkeleton__main__footer__actions}>
                            <Skeleton width={64} />
                            <Skeleton width={64} />
                        </div>
                        <Skeleton width={48} />
                    </div>
                </div>
            </div>
        </li>
    )
}

export default PostSkeleton