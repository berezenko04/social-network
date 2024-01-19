import { useEffect } from 'react'

//styles
import styles from './ActionsDropdown.module.scss'

type TActionsDropdownProps = {
    children: React.ReactNode,
    forwardedRef: React.RefObject<HTMLButtonElement>
    setIsOpened: (i: boolean) => void
}

const ActionsDropdown: React.FC<TActionsDropdownProps> = ({ children, forwardedRef, setIsOpened }) => {

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (forwardedRef.current && !forwardedRef.current.contains(e.target as Node)) {
                setIsOpened(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [forwardedRef])

    return (
        <>
            <div className={styles.dropdown}>
                {children}
            </div>
        </>
    )
}

export default ActionsDropdown