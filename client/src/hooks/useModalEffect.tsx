import { useEffect } from 'react';

const useModalEffect = (isOpened: boolean, handleClose: () => void) => {
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        };

        document.body.addEventListener("keydown", closeOnEscapeKey);
        isOpened && document.body.classList.add('overlayed');

        return () => {
            document.body.removeEventListener("keydown", closeOnEscapeKey);
            document.body.classList.remove('overlayed');
        };
    }, [handleClose, isOpened]);
};

export default useModalEffect;