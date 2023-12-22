
//styles 
import styles from './AlreadyHaveAccount.module.scss'

//components
import Button from '../UI/Button'

const AlreadyHaveAccount: React.FC = () => {
    return (
        <div className={styles.block}>
            <p>Already have an account?</p>
            <Button variant='tertiary' size='sm' link href='/login'>Sign In</Button>
        </div>
    )
}

export default AlreadyHaveAccount