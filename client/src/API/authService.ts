import axios from "axios";

//types
import { RegisterData } from "@/components/Forms/RegisterForm";


export const register = async (formData: RegisterData) => {
    const { data } = await axios.post('/register', formData);
    return data;
}