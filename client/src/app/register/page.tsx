
//styles
import styles from './Register.module.scss'

//components
import InputField from '@/components/InputField'
import AuthLayout from '@/components/layouts/AuthLayout'

const Register: React.FC = () => {
    return (
        <AuthLayout>
            <div className={styles.register}>
                <h1>
                    Create your account
                </h1>
                <form className={styles.register__form}>
                    <InputField required type='text' name='Name' counter maxLength={50} />
                    <InputField required type='email' name='Email' />
                </form>
            </div>
        </AuthLayout>
    )
}

export default Register