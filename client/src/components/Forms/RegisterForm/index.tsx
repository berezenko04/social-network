'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Joi from 'joi';
import { toast } from 'react-toastify';

//styles
import styles from './RegisterForm.module.scss'

//components
import InputField from '@/components/UI/InputField'
import Button from '@/components/UI/Button'
import Select from '@/components/UI/Select'

//utils
import { getYears } from '@/utils/getYears'
import { getDays } from '@/utils/getDays'
import { getMonths } from '@/utils/getMonths'

//API
import { signUp } from '@/API/authService';

//types
import { TFormErrors } from '@/@types/type';


type TFormValues = {
    name: string
    email: string,
    password: string,
    day: string,
    month: string,
    year: string
};


const RegisterForm: React.FC = () => {
    const router = useRouter();

    const {
        register, handleSubmit, setValue,
        trigger, control, formState: { errors, isValid } } = useForm<TFormValues>({
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
        name: Joi.string().required().min(5).regex(/[a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+/).messages({
            'string.base': 'Full name should be a text',
            'string.empty': 'Full name is required',
            'string.min': 'Too short',
            'string.pattern.base': 'Full name should be contains name and last name',
        }),
        email: Joi.string().email({ tlds: false }).required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Invalid email'
        }),
        password: Joi.string().required().min(8).messages({
            'string.empty': 'Password is required',
            'string.min': 'Too short',
        }),
        day: Joi.string().required(),
        month: Joi.string().required(),
        year: Joi.string().required()
    });

    const onSubmit: SubmitHandler<TFormValues> = async (data) => {
        try {
            const { day, month, year, ...restData } = data;
            const birthDate: string = `${day} ${month} ${year}`;
            const newData = {
                birthDate,
                ...restData
            }
            await signUp(newData);
            router.push('/login');
        } catch (err: any) {
            if (err.response && err.response.status == 409) {
                toast.error('This email has been registered already');
            }
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputField
                control={control}
                required
                type='text'
                name='name'
                counter
                error={errors.name?.message}
                maxLength={16}
                placeholder='Name'
            />
            <InputField
                control={control}
                required
                name='email'
                type='email'
                error={errors.email?.message}
                placeholder='Email'
            />
            <InputField
                control={control}
                required
                type='password'
                counter
                name='password'
                maxLength={32}
                placeholder='Password'
                error={errors.password?.message}
            />
            <div className={styles.form__selects}>
                <Select
                    data={getMonths()}
                    {...register('month')}
                    placeholder='Month'
                    onSelect={(value) => {
                        setValue('month', value);
                        trigger('month');
                    }}
                />
                <Select
                    data={getDays()}
                    {...register('day')}
                    placeholder='Day'
                    onSelect={(value) => {
                        setValue('day', value);
                        trigger('day');
                    }}
                />
                <Select
                    data={getYears()}
                    {...register('year')}
                    placeholder='Year'
                    onSelect={(value) => {
                        setValue('year', value);
                        trigger('year');
                    }}
                />
            </div>
            <div className={styles.form__submit}>
                <Button
                    variant="secondary"
                    size="lg"
                    type="submit"
                    disabled={!isValid}
                >
                    Sign Up
                </Button>
            </div>
        </form>
    )
}

export default RegisterForm