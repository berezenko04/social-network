'use client';

import { ChangeEvent, useState } from 'react';
import cn from 'classnames'

//styles
import styles from './SearchBar.module.scss'

//icons
import SearchIcon from '@/assets/icons/search.svg'
import CloseIcon from '@/assets/icons/close.svg'

const SearchBar: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

    return (
        <label className={cn(styles.searchbar, isFocused ? styles.searchbar__active : '')}>
            <SearchIcon className={styles.searchbar__searchIcon} />
            <input
                value={searchValue}
                onInput={handleInput}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                type="text"
                placeholder='Search'
            />
            {searchValue &&
                <button
                    className={styles.searchbar__reset}
                    onClick={() => setSearchValue('')}
                >
                    <CloseIcon />
                </button>
            }
            {isFocused &&
                <div className={styles.searchbar__list}>
                    <p>Try searching for people or keywords</p>
                </div>
            }
        </label>
    )
}

export default SearchBar