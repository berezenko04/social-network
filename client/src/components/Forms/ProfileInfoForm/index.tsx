//styles
import styles from './ProfileInfoForm.module.scss'

//components
import InputField from '@/components/UI/InputField'
import Button from '@/components/UI/Button'

const ProfileInfoForm: React.FC = () => {
    return (
        <div className={styles.info}>
            <div className={styles.info__wrapper}>
                <h1>Profile info</h1>
                <form className={styles.info__form}>
                    <InputField
                        required
                        type='text'
                        placeholder='Username'
                    />
                    <Button
                        variant='primary'
                        size='sm'
                    >
                        Done
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default ProfileInfoForm