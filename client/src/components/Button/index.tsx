import { ButtonHTMLAttributes } from 'react'
import cn from 'classnames'
import Link from 'next/link'

//styles
import styles from './Button.module.scss'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode,
    size: 'lg' | 'sm',
    variant: 'primary' | 'secondary' | 'tertiary',
    fullWidth?: boolean,
    link?: boolean,
    href?: string
}

const Button: React.FC<IButtonProps> = ({ children, size, fullWidth = true, variant, link = false, href = '', ...props }) => {
    const themes = cn(styles.button, styles[`button__${variant}`]);
    const sizes = cn(styles.button, styles[`button__${size}`]);

    const width = cn(styles.button, {
        [styles.button__full]: fullWidth
    })

    return (
        <>
            {link ?
                <Link href={href} className={cn(width, themes, sizes)}>
                    {children}
                </Link>
                :
                <button className={cn(width, themes, sizes)} {...props}>
                    {children}
                </button>
            }
        </>
    )
}

export default Button