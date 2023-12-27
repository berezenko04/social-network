'use client';

import { PacmanLoader } from "react-spinners"

//styles
import styles from './Loader.module.scss'


const Loader: React.FC = () => {
    return (
        <div className={styles.loader}>
            <PacmanLoader
                color="#ffffff"
                size={40}
            />
        </div>
    )
}

export default Loader