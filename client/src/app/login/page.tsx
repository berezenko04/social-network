//components
import AuthComponent from "@/components/AuthComponent"
import AuthLayout from "@/components/layouts/AuthLayout"

const Login = () => {
  return (
    <AuthLayout>
      <>
        <h1>Login</h1>
        <AuthComponent variant='register' />
      </>
    </AuthLayout>
  )
}

export default Login