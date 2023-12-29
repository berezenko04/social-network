import axios from '@/middlewares/axios'

//types
import { IUpdateInfo } from '@/redux/slices/user/types';

export const updateInfo = (data: Partial<IUpdateInfo>) => {
    axios.post('/user/update-info', data);
}