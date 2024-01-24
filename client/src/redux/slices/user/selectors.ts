import { RootState } from '@/redux/store';

export const userDataSelector = (state: RootState) => state.user.data;