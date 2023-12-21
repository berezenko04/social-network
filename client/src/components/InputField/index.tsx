'use client';

import { ChangeEvent, InputHTMLAttributes, useState } from 'react'

//styles
import styles from './InputField.module.scss'


interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string,
    counter?: boolean,
    maxLength?: number
}

const InputField: React.FC<IInputFieldProps> = ({ name, maxLength = 0, counter = false, ...props }) => {
    const [fieldValue, setFieldValue] = useState<string>('');

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (maxLength === 0 || inputValue.length <= maxLength) {
            setFieldValue(inputValue);
        }
    }

    return (
        <label className={styles.field} tabIndex={0}>
            <input {...props} value={fieldValue} onInput={handleChangeInput} />
            <span className={styles.field__label}>{name}</span>
            {counter && <span className={styles.field__count}>{fieldValue.length} / {maxLength}</span>}
        </label>
    )
}

export default InputField