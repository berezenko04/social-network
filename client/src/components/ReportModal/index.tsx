'use client';
import Link from 'next/link';
import cn from 'classnames'
import { useRef, useState } from 'react';

//styles
import styles from './ReportModal.module.scss'

//components
import ReactPortal from '../ReactPortal'
import IconButton from '../UI/IconButton';
import Button from '../UI/Button';
import Checkbox from '../UI/RadioButton';

//hooks
import useModalEffect from '@/hooks/useModalEffect';

//icons
import CloseIcon from '@/assets/icons/close.svg'

//data
import { reportItems } from '@/data';



type TModalProps = {
    isOpened: boolean,
    handleClose: () => void
}

const ReportModal: React.FC<TModalProps> = ({ isOpened, handleClose }) => {
    const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLUListElement | null>(null);
    const [isFullScrolled, setIsFullScrolled] = useState<boolean>(false);
    const [selectedRadio, setSelectedRadio] = useState<string>('');
    useModalEffect(isOpened, handleClose);

    const handleScroll = () => {
        if (scrollableContainerRef.current && listRef.current) {
            const { scrollHeight, clientHeight } = listRef.current;
            const { scrollTop } = scrollableContainerRef.current;
            setIsFullScrolled(scrollTop + clientHeight >= scrollHeight);
        }
    };

    if (!isOpened) return null;

    return (
        <ReactPortal>
            <div className={styles.reportModal}>
                <div className={styles.reportModal__head}>
                    <IconButton
                        variant='neutral'
                        icon={<CloseIcon />}
                        onClick={handleClose}
                    />
                    <h1>Gathering info</h1>
                </div>
                <div className={styles.reportModal__main}
                    ref={scrollableContainerRef}
                    onScroll={handleScroll}
                >
                    <div className={styles.reportModal__main__head}>
                        <h2>
                            What type of issue are you reporting?
                        </h2>
                        <Link href='#'>
                            Why are we asking this?
                        </Link>
                    </div>
                    <ul
                        className={styles.reportModal__main__list}
                        ref={listRef}
                    >
                        {reportItems.map((item, idx) => (
                            <li
                                className={styles.reportModal__main__list__item}
                                key={idx}
                            >
                                <label
                                    className={styles.reportModal__main__list__item__container}
                                    htmlFor={`element${idx}`}
                                >
                                    <div className={styles.reportModal__main__list__item__container__info}>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                    <Checkbox
                                        id={`element${idx}`}
                                        name='report'
                                        onChange={() => setSelectedRadio(item.title)}
                                        isChecked={selectedRadio === item.title}
                                    />
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cn(styles.reportModal__submit,
                    !isFullScrolled ? styles.reportModal__submit__active : '')}>
                    <Button
                        variant='secondary'
                        size='lg'
                        disabled={!selectedRadio.length}
                    >
                        Send
                    </Button>
                </div>
            </div>
        </ReactPortal>
    )
}

export default ReportModal