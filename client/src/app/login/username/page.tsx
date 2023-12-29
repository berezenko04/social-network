//components
import AuthLayout from "@/components/layouts/AuthLayout"
import ProfileInfoForm from '@/components/Forms/ProfileInfoForm'


const Username: React.FC = () => {
    return (
        <AuthLayout>
            <>
                <h1>Update info</h1>
                <ProfileInfoForm />
            </>
        </AuthLayout>
    )
}

export default Username