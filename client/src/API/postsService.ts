import axios from '@/middlewares/axios'

export const createPost = async (postData: FormData) => {
    await axios.post('/posts/create', postData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
}

export const getPosts = async () => {
    const { data } = await axios.get('/posts/all');
    return data;
}