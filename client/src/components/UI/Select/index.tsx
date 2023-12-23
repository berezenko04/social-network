'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import cn from 'classnames'

//styles
import styles from './Select.module.scss'

interface ISelectProps {
    data: string[];
    placeholder: string
    onSelect: (value: string) => void,
}

const Select = forwardRef<HTMLDivElement, ISelectProps>(({ data, onSelect, placeholder }, ref) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<string>('');
    const selectRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setIsOpened(false);
            }
        }
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [selectRef])

    const handleSelectItem = (item: string) => {
        setSelectedItem(item);
        onSelect(item);
        setIsOpened(false);
    }

    return (
        <div
            className={cn(styles.select, isOpened ? styles.select__opened : '',
                selectedItem ? styles.select__filled : '')}
            ref={selectRef}
        >
            <div className={styles.select__head} onClick={() => setIsOpened(true)}>
                <span>{placeholder}</span>
                <div className={styles.select__head__current}>
                    <p ref={ref}>{selectedItem}</p>
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
        </div>
    )
})

export default Select