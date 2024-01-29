'use client';

import { useState } from 'react'
import cn from 'classnames'

//styles
import styles from './TabList.module.scss'

type TTabListProps = {
    dataList: string[],
    setSelectedTab: (s: string) => void,
    selectedTab: string
}

const TabList: React.FC<TTabListProps> = ({ dataList, selectedTab, setSelectedTab }) => {

    return (
        <ul className={styles.list}>
            {dataList.map((item, idx) => (
                <li
                    className={styles.list__item}
                    key={idx}
                >
                    <button
                        className={cn(styles.list__item__button,
                            item.toLowerCase() === selectedTab.toLowerCase() ?
                                styles.list__item__button__active : '')}
                        onClick={() => setSelectedTab(item)}
                    >
                        {item}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default TabList