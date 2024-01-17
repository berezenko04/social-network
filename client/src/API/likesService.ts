import axios from '@/middlewares/axios'


export const likePost = async (postId: string) => {
    await axios.post(`/likes/add?postId=${postId}`);
}

export const isPostLiked = async (postId: string) => {
    const { data } = await axios.post(`/likes/isLiked?postId=${postId}`);
    return data;
}

export const getLikesCount = async (postId: string) => {
    const { data } = await axios.get(`/likes/get?postId=${postId}`);
    return data;
}