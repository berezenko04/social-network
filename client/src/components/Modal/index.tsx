'use client';

import { KeyboardEvent, KeyboardEventHandler, useEffect } from 'react'

//styles
import styles from './Modal.module.scss'

//components
import ReactPortal from '../ReactPortal'


type TModalProps = {
    isOpened: boolean,
    children: React.ReactNode,
    handleClose: () => void
}

const Modal: React.FC<TModalProps> = ({ isOpened, children, handleClose }) => {
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        }

        document.body.addEventListener("keydown", closeOnEscapeKey);
        isOpened && document.body.classList.add('overlayed');

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
            document.body.classList.remove('overlayed');
        };
    }, [handleClose, isOpened]);

    if (!isOpened) return null;

    return (
        <ReactPortal>
            <div className={styles.modal}>
                {children}
            </div>
        </ReactPortal>
    )
}

export default Modal