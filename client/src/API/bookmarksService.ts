import axios from '@/middlewares/axios'


export const bookmarkPost = async (postId: string) => {
    await axios.post(`/bookmarks/add?postId=${postId}`);
}

export const isPostBookmarked = async (postId: string) => {
    const { data } = await axios.get(`/bookmarks/isBookmarked?postId=${postId}`);
    return data;
}

export const getBookmarks = async () => {
    const { data } = await axios.get(`/bookmarks/get`);
    return data;
}