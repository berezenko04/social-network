//styles
import styles from './Sidebar.module.scss'

//components
import SearchBar from '../SearchBar'
import SidebarTags from '../SidebarTags'


const Sidebar: React.FC = () => {

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__wrapper}>
                <SearchBar />
                <SidebarTags />
            </div>
        </div>
    )
}

export default Sidebar