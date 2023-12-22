'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

//styles
import styles from './RegisterForm.module.scss'

//components
import InputField from '@/components/UI/InputField'
import Button from '@/components/UI/Button'
import Select from '@/components/UI/Select'

//utils
import { getYears } from '@/utils/getYears'
import { getDays } from '@/utils/getDays'
import { getMonths } from '@/utils/getMonts'


type TFormValues = {
    email: string,
    password: string,
    day: string,
    month: string,
    year: string
};

export type RegisterData = {
    email: string,
    password: string,
    birthDate: string
}

const RegisterForm: React.FC = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, watch, } = useForm<TFormValues>();

    const onSubmit: SubmitHandler<TFormValues> = async (data) => {
        try {
            const { day, month, year, ...restData } = data;
            const birthDate = `${day}/${month}/${year}`;
            const newData: RegisterData = {
                birthDate,
                ...restData
            }

            await register(newData);
            router.push('/home');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <InputField
                required
                type='text'
                name='Name'
                counter
                error='Hello world!'
                maxLength={50}
            />
            <InputField
                required
                type='email'
                name='Email'
            />
            <InputField
                required
                type='password'
                name='Password'
            />
            <div className={styles.form__selects}>
                <Select data={getMonths()} name='Month' />
                <Select data={getDays()} name='Day' />
                <Select data={getYears()} name='Year' />
            </div>
            <div className={styles.form__submit}>
                <Button
                    variant="secondary"
                    size="lg"
                    type="submit"
                    disabled
                >
                    Sign Up
                </Button>
            </div>
        </form>
    )
}

export default RegisterForm