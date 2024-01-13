import axios from '@/middlewares/axios'

export const createPost = async (postData: FormData) => {
    await axios.post('/posts/create', postData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const getPosts = async (page: number) => {
    const { data } = await axios.get(`/posts/get?page=${page}`);
    return data;
}