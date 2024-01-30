import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';

//styles 
import styles from './PostUserInfo.module.scss'

//components
import UserName from '../../UserComponents/UserName';
import IconButton from '../../UI/IconButton';
import ActionsDropdown from '@/components/ActionsDropdown';

//icons
import MoreIcon from '@/assets/icons/more.svg'
import ReportIcon from '@/assets/icons/report.svg'
import TrashIcon from '@/assets/icons/trash.svg'

//redux
import { IUserData } from '@/redux/slices/user/types';
import { userDataSelector } from '@/redux/slices/user/selectors';
import { deletePost } from '@/redux/slices/posts/asyncActions';
import ReportModal from '@/components/ReportModal';



interface IPostUserInfoProps extends IUserData {
    date: string,
    postId: string
}

const PostUserInfo: React.FC<IPostUserInfoProps> = ({ name, username, postId, _id, date }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const moreRef = useRef<HTMLButtonElement | null>(null);
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [isReportModalOpened, setIsReportModalOpened] = useState<boolean>(false);
    const userData = useSelector(userDataSelector);

    const handleDeletePost = async () => {
        await dispatch(deletePost(postId));
    }

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
                forwardedRef={moreRef}
                onClick={() => setIsOpened(true)}
            />
            {isOpened &&
                <div className={styles.user__overlay}>
                    <ActionsDropdown
                        forwardedRef={moreRef}
                        setIsOpened={setIsOpened}
                    >
                        {userData?._id === _id &&
                            <button
                                onClick={handleDeletePost}
                                style={{ color: '#f4212e' }}
                            >
                                <TrashIcon />
                                Delete post
                            </button>
                        }
                        <button onClick={() => setIsReportModalOpened(true)}>
                            <ReportIcon />
                            Report post
                        </button>
                    </ActionsDropdown>
                </div>
            }
            <ReportModal
                isOpened={isReportModalOpened}
                handleClose={() => setIsReportModalOpened(false)}
            />
        </div>
    )
}

export default PostUserInfo