'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Joi from 'joi';
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

//styles
import styles from './LoginForm.module.scss'

//components
import InputField from '@/components/UI/InputField';
import Button from '@/components/UI/Button';

//types
import { TFormErrors } from '../RegisterForm';

//API
import { login } from '@/API/authService';


export type TFormValues = {
    email: string,
    password: string
}

const LoginForm: React.FC = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<TFormValues>({
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
                    errors: error.details.reduce((acc: TFormErrors, { path, message }: { path: string[] | string, message: string }) => {
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
        email: Joi.string().email({ tlds: false }).required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Invalid email'
        }),
        password: Joi.string().required().messages({
            'string.empty': 'Password is required',
        })
    });

    const onSubmit: SubmitHandler<TFormValues> = async (data) => {
        try {
            const response = await login(data);
            if ('token' in response) {
                Cookies.set('token', response.token as string, { expires: 7, path: '/' });
            }
            router.push('/home');
        } catch (err: any) {
            if (err.response && err.response.status == 401) {
                toast.error('Invalid email or password');
            }
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputField
                required
                type='email'
                error={errors.email?.message}
                placeholder='Email'
                {...register("email")}
            />
            <InputField
                required
                type='password'
                placeholder='Password'
                error={errors.password?.message}
                {...register("password")}
            />
            <div className={styles.form__submit}>
                <Button
                    variant="secondary"
                    size="lg"
                    type="submit"
                    disabled={!isValid}
                >
                    Login
                </Button>
            </div>
        </form>
    )
}

export default LoginForm