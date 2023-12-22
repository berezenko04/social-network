//styles
import styles from './Register.module.scss'

//components
import AuthLayout from '@/components/layouts/AuthLayout'
import AlreadyHaveAccount from '@/components/AlreadyHaveAccount'
import RegisterForm from '@/components/Forms/RegisterForm'


const Register: React.FC = () => {
    return (
        <AuthLayout>
            <div className={styles.register}>
                <h1>
                    Create your account
                </h1>
                <RegisterForm />
                <AlreadyHaveAccount />
            </div>
        </AuthLayout>
    )
}

export default Register