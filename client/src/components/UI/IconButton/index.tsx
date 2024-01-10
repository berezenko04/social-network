import cn from 'classnames'

//styles
import styles from './IconButton.module.scss'

interface IIconButtonProps {
    variant: 'primary' | 'green' | 'red',
    icon: React.ReactNode,
    text?: string
}

const IconButton: React.FC<IIconButtonProps> = ({ variant, icon, text }) => {
    const variants = cn(styles[`button__${variant}`]);

    return (
        <button className={cn(styles.button, variants)}>
            {icon}
            {text}
        </button>
    )
}

export default IconButton