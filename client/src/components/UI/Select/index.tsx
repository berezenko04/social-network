'use client';

import { useEffect, useRef, useState } from 'react';
import cn from 'classnames'

//styles
import styles from './Select.module.scss'

interface ISelectProps {
    data: string[];
    name: string
}


const Select: React.FC<ISelectProps> = ({ data, name }) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>('');
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpened(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [ref])

    const handleSelectItem = (item: string) => {
        setSelectedItem(item);
        setIsOpened(false);
    }

    return (
        <div
            className={cn(styles.select, isOpened ? styles.select__opened : '',
                selectedItem ? styles.select__filled : '')}
            ref={ref}
        >
            <div className={styles.select__head} onClick={() => setIsOpened(true)}>
                <span>{name}</span>
                <div className={styles.select__head__current}>
                    <p>{selectedItem}</p>
                </div>
            </div>
            {isOpened &&
                <div className={styles.select__list}>
                    <ul>
                        {data.map((item, index) => (
                            <li
                                key={index}
                                className={cn(styles.select__list__item,
                                    item === selectedItem ? styles.select__list__item__active : '')}
                            >
                                <button onClick={() => handleSelectItem(item)}>
                                    {item}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            }
        </div >
    )
}

export default Select