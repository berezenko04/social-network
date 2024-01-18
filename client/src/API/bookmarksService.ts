import axios from '@/middlewares/axios'


export const bookmarkPost = async (postId: string) => {
    await axios.post(`/bookmarks/add?postId=${postId}`);
}

export const isPostBookmarked = async (postId: string) => {
    const { data } = await axios.get(`/bookmarks/isBookmarked?postId=${postId}`);
    return data;
}

// export const getLikesCount = async (postId: string) => {
//     const { data } = await axios.get(`/likes/get?postId=${postId}`);
//     return data;
// }