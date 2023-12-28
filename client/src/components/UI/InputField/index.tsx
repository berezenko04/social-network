'use client';

import { ChangeEvent, Fragment, InputHTMLAttributes, forwardRef, useEffect, useState } from 'react'
import cn from 'classnames'

//styles
import styles from './InputField.module.scss'


interface IInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder: string,
    counter?: boolean,
    maxLength?: number,
    error?: string,
}

const InputField = forwardRef<HTMLInputElement, IInputFieldProps>(({
    placeholder,
    maxLength = 0,
    counter = false,
    error = '',
    ...props
}, ref) => {
    const [fieldValue, setFieldValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (maxLength === 0 || inputValue.length <= maxLength) {
            setFieldValue(inputValue);
        }
    }

    return (
        <Fragment>
            <label
                className={cn(styles.field,
                    isFocused ? styles.field__focused : '',
                    fieldValue ? styles.field__filled : '',
                    error ? styles.field__error : '')}
            >
                <input
                    value={fieldValue}
                    onInput={handleChangeInput}
                    ref={ref}
                    onFocus={() => setIsFocused(true)}
                    autoComplete='new-password'
                    {...props}
                />
                <span className={styles.field__label}>{placeholder}</span>
                {counter && <span className={styles.field__count}>{fieldValue.length} / {maxLength}</span>}
            </label>
            <p className={styles.field__hint}>{error}</p>
        </Fragment>
    )
})

export default InputField