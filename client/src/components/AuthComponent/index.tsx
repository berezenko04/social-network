
//styles 
import styles from './AuthComponent.module.scss'

//components
import Button from '../UI/Button'

interface IAuthComponent {
    variant: 'register' | 'login'
}

const AuthComponent: React.FC<IAuthComponent> = ({ variant }) => {
    return (
        <div className={styles.block}>
            <p>{variant === 'register' ? 'Have not account?' : 'Already have an account?'}</p>
            <Button
                variant='tertiary'
                size='sm'
                link
                href={variant === 'register' ? '/register' : '/login'}>
                {variant === 'register' ? 'Sign Up' : 'Sign In'}
            </Button>
        </div>
    )
}

export default AuthComponent