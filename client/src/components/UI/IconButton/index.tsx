import cn from 'classnames'

//styles
import styles from './IconButton.module.scss'
import { ButtonHTMLAttributes } from 'react';

interface IIconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'blue' | 'red',
    icon: React.ReactNode,
    text?: string
}

const IconButton: React.FC<IIconButtonProps> = ({ variant, icon, text, ...props }) => {
    const variants = cn(styles[`button__${variant}`]);

    return (
        <button className={cn(styles.button, variants)} {...props}>
            <span>
                {icon}
            </span>
            {text}
        </button>
    )
}

export default IconButton