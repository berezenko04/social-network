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

export const getPost = async (postId: string) => {
    const { data } = await axios.get(`/posts/single?postId=${postId}`);
    return data;
}

export const removePost = async (postId: string) => {
    const { data } = await axios.post(`/posts/delete?postId=${postId}`);
    return data;
}

export const getUserPosts = async (username: string) => {
    const { data } = await axios.get(`/posts/getPosts?username=${username}`);
    return data;
}

export const getLikedPosts = async (username: string) => {
    const { data } = await axios.get(`/posts/getLiked?username=${username}`);
    return data;
}
