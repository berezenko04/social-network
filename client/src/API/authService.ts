import axios from "@/middlewares/axios";

//types
import { TFormValues as TLoginData } from "@/components/Forms/LoginForm";

type TRegisterData = {
    name: string,
    email: string,
    password: string,
    birthDate: string
}

export const signUp = async (formData: TRegisterData) => {
    const { data } = await axios.post('/register', formData);
    return data;
}

export const login = async (formData: TLoginData) => {
    const { data } = await axios.post('/login', formData);
    return data;
}

export const getAuthMe = async () => {
    const { data } = await axios.get('/me');
    return data;
}