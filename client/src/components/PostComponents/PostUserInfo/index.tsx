import Link from 'next/link';

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
    createdAt: Date
}

const PostUserInfo: React.FC<IPostUserInfoProps> = ({ name, username, _id, createdAt }) => {
    return (
        <div className={styles.user}>
            <div className={styles.user__info}>
                <Link href={`/${name}`}>
                    <UserName
                        name={name}
                        userId={_id}
                        hovered
                    />
                </Link>
                <p>@{username}</p>
                <span className={styles.divider} />
                <p>{formatDate(createdAt)}</p>
            </div>
            <IconButton
                variant='blue'
                icon={<MoreIcon />}
            />
        </div>
    )
}

export default PostUserInfo