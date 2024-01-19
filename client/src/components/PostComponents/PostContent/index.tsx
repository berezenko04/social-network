import Image from 'next/image'

//styles
import styles from './PostContent.module.scss'


type TPostContentProps = {
    content: string,
    attached: string[]
}

const PostContent: React.FC<TPostContentProps> = ({ content, attached }) => {
    return (
        <div className={styles.content}>
            <p className={styles.content__text}>
                {content}
            </p>
            {!!attached.length &&
                <div className={styles.content__attached}>
                    {attached.map((item, idx) => (
                        <div
                            className={styles.content__attached__item}
                            key={idx}
                        >
                            <Image
                                width={300}
                                height={240}
                                src={item}
                                alt=''
                            />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default PostContent