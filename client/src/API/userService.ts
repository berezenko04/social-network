import axios from '@/middlewares/axios'

//types
import { IUpdateInfo } from '@/redux/slices/user/types';

export const updateInfo = async (data: Partial<IUpdateInfo>) => {
    await axios.post('/user/update-info', data);
}

export const getUser = async (userId: string) => {
    const { data } = await axios.get(`/user/get?userId=${userId}`);
    return data;
}