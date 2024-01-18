import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

//styles
import '@/scss/main.scss';

//redux
import ReduxProvider from '@/redux/provider';

//components
import CheckAuth from '@/components/ClientSide/CheckAuth';
import { SkeletonTheme } from 'react-loading-skeleton';

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Social Network',
  description: 'Reconnect - find your way'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ReduxProvider>
          <SkeletonTheme baseColor="hsl(213, 4%, 46%)" highlightColor="hsl(0, 0%, 90%)">
            {children}
            <CheckAuth />
          </SkeletonTheme>
        </ReduxProvider>
      </body>
    </html>
  )
}
