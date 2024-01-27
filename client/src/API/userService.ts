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

export const getUserByUsername = async (username: string) => {
    const { data } = await axios.get(`/user/getByUsername?username=${username}`);
    return data;
}

export const getUsers = async (limit: number) => {
    const { data } = await axios.get(`/user/all?limit=${limit}`);
    return data;
}

export const getPostsCount = async (username: string) => {
    const { data } = await axios.get(`/user/getPostsCount?username=${username}`);
    return data;
}