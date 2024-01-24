import { NextPage } from "next"

//components
import AuthComponent from "@/components/AuthComponent"
import LoginForm from "@/components/Forms/LoginForm"
import AuthLayout from "@/components/layouts/AuthLayout"


const Login: NextPage = () => {
  return (
    <AuthLayout>
      <>
        <h1>Unlock your world</h1>
        <LoginForm />
        <AuthComponent variant='register' />
      </>
    </AuthLayout>
  )
}

export default Login