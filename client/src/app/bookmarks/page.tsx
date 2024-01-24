import { NextPage } from 'next'

//styles 
import styles from './Bookmarks.module.scss'

//components
import PrimaryLayout from '@/components/layouts/PrimaryLayout'
import BookmarksPageHead from '@/components/BookmarksPageHead'
import BookmarksList from '@/components/BookmarksList'

const BookmarksPage: NextPage = () => {

    return (
        <PrimaryLayout>
            <BookmarksPageHead />
            <BookmarksList />
        </PrimaryLayout>
    )
}

export default BookmarksPage