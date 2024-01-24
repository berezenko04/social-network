import { usePathname } from 'next/navigation';

//styles
import styles from './Sidebar.module.scss'

//components
import SearchBar from '../SearchBar'
import FollowList from '../FollowList'
import SidebarFooter from '../SidebarFooter';


const Sidebar: React.FC = () => {
    const pathname = usePathname();

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__wrapper}>
                {!pathname.includes('explore') && <SearchBar />}
                <FollowList />
                <SidebarFooter />
            </div>
        </div>
    )
}

export default Sidebar