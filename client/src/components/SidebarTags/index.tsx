import Link from 'next/link';

//styles
import styles from './SidebarTags.module.scss'

const SidebarTags: React.FC = () => {
    const data = [
        { name: '#1000x', count: 1320031 },
        { name: '#103200x', count: 800 },
        { name: '#110010x', count: 13200 },
        { name: '#10100x', count: 13200 },
        { name: '#10030x', count: 13200 },
    ];

    const formatCount = (count: number) => {
        if (count < 1000) {
            return count;
        } else if (count >= 1000 && count < 1000000) {
            return `${count / 1000}K`;
        } else if (count >= 1000000 && count < 1000000000) {
            return `${(count / 1000000).toFixed(2)}M`;
        }
    }

    return (
        <div className={styles.tags}>
            <h3>Trends for you</h3>
            <ul className={styles.tags__list}>
                {data.map((i, idx) => (
                    <li key={idx}>
                        <Link href={`/search?q=${i.name}`}>
                            <span>{i.name}</span>
                            <p>{formatCount(i.count)} posts</p>
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href={'/search'}>
                        Show more
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SidebarTags