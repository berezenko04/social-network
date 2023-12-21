import Link from 'next/link'
import Image from 'next/image'

//styles
import styles from './Page.module.scss'

//components
import Button from '@/components/Button'
import AuthLayout from '@/components/layouts/AuthLayout'


export default function Home() {
  return (
    <AuthLayout>
      <div className={styles.homepage__auth}>
        <div className={styles.homepage__auth__wrapper}>
          <h1>Happening now</h1>
          <div className={styles.homepage__auth__form}>
            <h2>Join today</h2>
            <div className={styles.homepage__auth__form__buttons}>
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
              <Button variant='primary' size='sm'>Create Account</Button>
              <p className={styles.homepage__auth__form__accept}>
                By signing up, you agree to the <Link href={'#'}>Terms of Service</Link> and <Link href={'#'}>Privacy Policy</Link>, including <Link href={'#'}>Cookie Use</Link>.
              </p>
            </div>
          </div>
          <div className={styles.homepage__auth__login}>
            <p>Already have an account?</p>
            <Button variant='tertiary' size='sm' link href='/login'>Sign In</Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
