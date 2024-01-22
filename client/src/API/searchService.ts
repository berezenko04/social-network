import axios from '@/middlewares/axios'

export const searchByUser = async (username: string) => {
    const { data } = await axios.get(`/search/byUsername?username=${username}`);
    return data;
}