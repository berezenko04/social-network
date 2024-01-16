import { NextPage } from "next"
import Link from "next/link"

//components
import SearchBar from "@/components/SearchBar"
import PrimaryLayout from "@/components/layouts/PrimaryLayout"

//styles
import styles from './Explore.module.scss'

//utils
import { formatTagCount } from "@/utils/formatCount"
import SidebarTags from "@/components/FollowList"


const Explore: NextPage = () => {
    const data = [
        { name: '#1000x', count: 1320031 },
        { name: '#103200x', count: 800 },
        { name: '#110010x', count: 13200 },
        { name: '#10100x', count: 13200 },
        { name: '#10030x', count: 13200 },
    ];

    return (
        <PrimaryLayout>
            <div className={styles.explore__searchbar}>
                <SearchBar />
            </div>
           
                <SidebarTags
                    variant="withoutBackground"
                />
        
        </PrimaryLayout>
    )
}

export default Explore