'use client';

import { useEffect } from "react";
import { useAppDispatch } from "@/redux/store";
import { fetchAuthMe } from "@/redux/slices/user/asyncActions";

const CheckAuth: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAuthMe());
    }, []);

    return (
        <></>
    )
}

export default CheckAuth