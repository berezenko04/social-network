import { Bounce, ToastContainer as Container } from 'react-toastify'

const ToastContainer: React.FC = () => {
    return (
        <Container
            position="bottom-center"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            theme="dark"
            transition={Bounce}
            stacked
        />
    )
}

export default ToastContainer