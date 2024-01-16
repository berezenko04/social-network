import axios from '@/middlewares/axios'

export const createPost = async (postData: FormData) => {
    const { data } = await axios.post('/posts/create', postData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    console.log(data);
    return data;
}

export const getPosts = async () => {
    const { data } = await axios.get(`/posts/get`);
    return data;
}

export const getLikes = async (postId: string) => {
    const { data } = await axios.get(`/posts/likes?postId=${postId}`);
    return data;
}