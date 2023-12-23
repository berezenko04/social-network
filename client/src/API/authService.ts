import axios from "@/middlewares/axios";

//types
import { RegisterData } from "@/components/Forms/RegisterForm";


export const signUp = async (formData: RegisterData) => {
    const { data } = await axios.post('/register', formData);
    return data;
}