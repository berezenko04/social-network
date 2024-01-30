'use client';

import Modal from '@/components/ReportModal'
import { NextPage } from 'next'
import React, { useState } from 'react'
import styles from './test.module.scss'
import ReportModal from '@/components/ReportModal';

const TestPage: NextPage = () => {
    const [isOpened, setIsOpened] = useState(true);

    return (
        <div>
            <ReportModal
                isOpened={isOpened}
                handleClose={() => setIsOpened(false)}
            />
        </div>
    )
}

export default TestPage