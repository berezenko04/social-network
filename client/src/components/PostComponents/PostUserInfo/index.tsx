import { useRouter } from 'next/navigation';

//styles 
import styles from './PostUserInfo.module.scss'

//components
import UserName from '../../UserComponents/UserName';
import IconButton from '../../UI/IconButton';

//utils
import { formatDate } from '@/utils/formatDate';

//icons
import MoreIcon from '@/assets/icons/more.svg'

//redux
import { IUserData } from '@/redux/slices/user/types';


interface IPostUserInfoProps extends IUserData {
    date: string
}

const PostUserInfo: React.FC<IPostUserInfoProps> = ({ name, username, _id, date }) => {
    const router = useRouter();

    return (
        <div className={styles.user}>
            <div className={styles.user__info}>
                <div
                    className={styles.user__info__name}
                    onClick={() => router.push(`/${username}`)}
                >
                    <UserName
                        name={name}
                        userId={_id}
                        hovered
                    />
                </div>
                <p>@{username}</p>
                <span className={styles.divider} />
                <p>{date}</p>
            </div>
            <IconButton
                variant='blue'
                icon={<MoreIcon />}
            />
        </div>
    )
}

export default PostUserInfo