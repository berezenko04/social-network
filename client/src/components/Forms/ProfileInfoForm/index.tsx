'use client';

import Joi from 'joi'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation';

//styles
import styles from './ProfileInfoForm.module.scss'

//components
import InputField from '@/components/UI/InputField'
import Button from '@/components/UI/Button'
import UploadAvatar from '@/components/UploadAvatar'

//types
import { TFormErrors } from '@/@types/type'

//redux
import { useAppDispatch } from '@/redux/store';
import { updateUser } from '@/redux/slices/user/asyncActions';


type TFormValues = {
    avatar: File,
    username: string
}


const ProfileInfoForm: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { register, handleSubmit, control, formState: { errors, isValid } } = useForm<TFormValues>({
        resolver: async (data) => {
            try {
                const values = await schema.validateAsync(data, { abortEarly: false });
                return {
                    values,
                    errors: {},
                };
            } catch (error: any) {
                return {
                    values: {},
                    errors: error.details.reduce((acc: TFormErrors, { path, message }:
                        { path: string[] | string, message: string }) => {
                        const fieldName = Array.isArray(path) ? path[0] : path as keyof TFormValues;
                        acc[fieldName] = { message };
                        return acc;
                    }, {} as TFormErrors),
                };
            }
        },
        mode: 'onChange'
    });

    const schema = Joi.object({
        avatar: Joi.object(),
        username: Joi.string().min(5).max(16).required().pattern(/^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/).messages({
            'string.empty': 'Username is required',
            'string.min': 'Too short',
            'string.max': 'Too long',
            'string.pattern.base': 'Username should be least at one character',
        })
    });

    const onSubmit: SubmitHandler<TFormValues> = async (data) => {
        try {
            dispatch(updateUser(data));
            // router.push('/home');
        } catch (err: any) {
            console.error(err);
        }
    }

    return (
        <form
            className={styles.form}
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
        >
            <UploadAvatar
                name='avatar'
                control={control}
            />
            <InputField
                required
                control={control}
                type='text'
                name='username'
                placeholder='Username'
                error={errors.username?.message}
            />
            <Button
                variant='primary'
                size='lg'
                type='submit'
                disabled={!isValid}
            >
                Done
            </Button>
        </form>
    )
}

export default ProfileInfoForm