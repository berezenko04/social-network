import { InputHTMLAttributes } from 'react'
import cn from 'classnames'

//styles
import styles from './RadioButton.module.scss'

//icons
import CheckIcon from '@/assets/icons/check.svg'

interface IRadioButton extends InputHTMLAttributes<HTMLInputElement> {
    isChecked: boolean
}

const RadioButton: React.FC<IRadioButton> = ({ isChecked, ...props }) => {

    return (
        <label className={styles.radio}>
            <div
                className={cn(styles.radio__wrapper,
                    isChecked ? styles.checked : '')}
            >
                <input
                    className={styles.radio__element}
                    type="radio"
                    {...props}
                />
                {isChecked && <CheckIcon />}
            </div>
        </label>
    )
}

export default RadioButton