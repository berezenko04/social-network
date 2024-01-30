'use client';

import { ChangeEvent, useCallback, useState } from 'react';
import cn from 'classnames'
import debounce from 'lodash.debounce'

//styles
import styles from './SearchBar.module.scss'

//components
import UserItem from '../UserComponents/UserItem';

//icons
import SearchIcon from '@/assets/icons/search.svg'
import CloseIcon from '@/assets/icons/close.svg'

//redux
import { IUserData } from '@/redux/slices/user/types';

//API
import { searchByUser } from '@/API/searchService';


const SearchBar: React.FC = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [searchResult, setSearchResult] = useState<IUserData[]>([]);

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);
        inputValue && debounceHandleSearch(inputValue);
    }

    const handleSearch = async (value: string) => {
        const data = await searchByUser(value);
        setSearchResult(data.users);
    }

    const debounceHandleSearch = useCallback(debounce(handleSearch, 500), []);

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
                    {!searchValue ? <p>Try searching for people</p>
                        :
                        searchResult.length ?
                            searchResult.map((user, idx) => (
                                <UserItem
                                    sliced={false}
                                    hovered={false}
                                    withFollow={false}
                                    key={idx}
                                    {...user}
                                />
                            ))
                            :
                            <p>No result found</p>
                    }
                </div>
            }
        </label>
    )
}

export default SearchBar