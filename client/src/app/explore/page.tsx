import { NextPage } from "next"

//components
import SearchBar from "@/components/SearchBar"
import PrimaryLayout from "@/components/layouts/PrimaryLayout"

//styles
import styles from './Explore.module.scss'


const Explore: NextPage = () => {

    return (
        <PrimaryLayout>
            <div className={styles.explore__searchbar}>
                <SearchBar />
            </div>
        </PrimaryLayout>
    )
}

export default Explore