import Link from 'next/link';

//styles
import styles from './SidebarFooter.module.scss'

const SidebarFooter: React.FC = () => {
    const footerMenu = [
        'Terms of Service', 'Privacy Policy', 'More',
        'Cookie policy', 'Ads info',
    ];

    const currentYear = new Date().getUTCFullYear();

    return (
        <ul className={styles.footer}>
            {footerMenu.map((i, idx) => (
                <li key={idx}>
                    <Link href='#'>
                        {i}
                    </Link>
                </li>
            ))}
            <li>
                &copy; {currentYear} Reconnect
            </li>
        </ul>
    )
}

export default SidebarFooter