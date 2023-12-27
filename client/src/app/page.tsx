import Link from 'next/link'
import Image from 'next/image'

//styles
import styles from './Page.module.scss'

//components
import Button from '@/components/UI/Button'
import AuthLayout from '@/components/layouts/AuthLayout'
import AuthComponent from '@/components/AuthComponent'
import Loader from '@/components/Loader'


export default function Home() {
  return (
    <AuthLayout>
      <>
        <h1>Happening now</h1>
        <div className={styles.homepage__form}>
          <h2>Join today</h2>
          <div className={styles.homepage__form__buttons}>
            <Button variant='secondary' size='sm'>
              <Image
                src={'/icons/logos/google.svg'}
                alt=''
                width={20}
                height={20}
              />
              Sign up with Google
            </Button>
            <div className={styles.separator}>
              <div></div>
              <p>or</p>
              <div></div>
            </div>
            <Button variant='primary' size='sm' link href='/register'>Create Account</Button>
            <p className={styles.homepage__form__accept}>
              By signing up, you agree to the <Link href={'#'}>Terms of Service</Link> and <Link href={'#'}>Privacy Policy</Link>, including <Link href={'#'}>Cookie Use</Link>.
            </p>
          </div>
        </div>
        <AuthComponent variant='login' />
      </>
    </AuthLayout>
  )
}
