//components
import AuthLayout from '@/components/layouts/AuthLayout'
import RegisterForm from '@/components/Forms/RegisterForm'
import AuthComponent from '@/components/AuthComponent'


const Register: React.FC = () => {
    return (
        <AuthLayout>
            <>
                <h1>
                    Create your account
                </h1>
                <RegisterForm />
                <AuthComponent variant='login' />
            </>
        </AuthLayout>
    )
}

export default Register