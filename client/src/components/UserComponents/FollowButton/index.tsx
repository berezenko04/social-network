'use client';

import { toast } from "react-toastify"
import { useEffect, useState } from "react"

//components
import Button from "@/components/UI/Button"

//API
import { follow, isFollowed } from "@/API/followsService"


type TFollowButtonProps = {
    targetId: string
}

const FollowButton: React.FC<TFollowButtonProps> = ({ targetId }) => {
    const [isFollow, setIsFollow] = useState<boolean>(false);

    const handleFollow = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        try {
            setIsFollow(prev => !prev);
            await follow(targetId);
        } catch (err) {
            toast.error('Error while following');
        }
    }

    useEffect(() => {
        try {
            (async () => {
                const data = await isFollowed(targetId);
                setIsFollow(data.isFollowed);
            })();
        } catch {
            toast.error('An error occured');
        }
    }, [targetId])

    return (
        <Button
            size='xs'
            variant={isFollow ? 'fourtiary' : 'secondary'}
            fullWidth={false}
            onClick={(e) => handleFollow(e)}
        >
            {isFollow ? 'Following' : 'Follow'}
        </Button>
    )
}

export default FollowButton