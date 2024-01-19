'use client';

import { toast } from 'react-toastify'

//components
import ActionsDropdown from '../ActionsDropdown'

//icons
import CopyIcon from '@/assets/icons/copy.svg'


type TSharePostDropdown = {
    forwardedRef: React.RefObject<HTMLButtonElement>,
    setIsShareOpened: (i: boolean) => void,
    postId: string
}

const SharePostDropdown: React.FC<TSharePostDropdown> = ({
    forwardedRef, postId, setIsShareOpened
}) => {
    const path = process.env.NEXT_PUBLIC_BASE_URL;

    const handleClipboard = () => {
        navigator.clipboard.writeText(`${path}/posts/${postId}`);
        toast.info('Copied to clipboard');
    }

    return (
        <ActionsDropdown
            forwardedRef={forwardedRef}
            setIsOpened={setIsShareOpened}
        >
            <button onClick={handleClipboard}>
                <CopyIcon />
                Copy link
            </button>
        </ActionsDropdown>
    )
}

export default SharePostDropdown