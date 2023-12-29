'use client';

import { ChangeEvent, Fragment, useState } from 'react'
import { useController, Control } from 'react-hook-form';
import cn from 'classnames'

//styles
import styles from './InputField.module.scss'


interface IInputFieldProps {
    placeholder: string,
    counter?: boolean,
    maxLength?: number,
    error?: string,
    name: string,
    control: any,
    type: string,
    defaultValue?: string,
    required?: boolean
}

const InputField: React.FC<IInputFieldProps> = ({
    placeholder,
    maxLength = 0,
    counter = false,
    error = '',
    name,
    control,
    type,
    required,
    defaultValue = '',
}) => {
    const [fieldValue, setFieldValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const {
        field: { onBlur, ref, onChange },
    } = useController({
        name,
        control,
        defaultValue,
    });

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;

        if (maxLength === 0 || inputValue.length <= maxLength) {
            setFieldValue(inputValue);
        }
    }

    const handleBlur = () => {
        onBlur();
        setIsFocused(false);
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
                    onBlur={handleBlur}
                    onChange={onChange}
                    onFocus={() => setIsFocused(true)}
                    autoComplete='new-password'
                    type={type}
                    required={required}
                />
                <span className={styles.field__label}>{placeholder}</span>
                {counter && <span className={styles.field__count}>{fieldValue.length} / {maxLength}</span>}
            </label>
            <p className={styles.field__hint}>{error}</p>
        </Fragment>
    )
}

export default InputField