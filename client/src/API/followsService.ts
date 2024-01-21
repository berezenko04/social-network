import axios from '@/middlewares/axios'

export const follow = async (userId: string) => {
    const { data } = await axios.post(`/follows/follow?userId=${userId}`);
    return data;
}

export const isFollowed = async (userId: string) => {
    const { data } = await axios.get(`/follows/isFollowed?userId=${userId}`);
    return data;
}