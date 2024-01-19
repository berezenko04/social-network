//styles
import styles from './Sidebar.module.scss'

//components
import SearchBar from '../SearchBar'
import FollowList from '../FollowList'
import UserModal from '../UserComponents/UserModal';
import SidebarFooter from '../SidebarFooter';


const Sidebar: React.FC = () => {

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__wrapper}>
                <SearchBar />
                <FollowList />
                <SidebarFooter />
            </div>
        </div>
    )
}

export default Sidebar