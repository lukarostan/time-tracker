import style from './loginForm.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';

type Props = {
  onLoginClick: () => void;
};

export function LoginForm({ onLoginClick }: Props) {
  return (
    <div className={style.formContainer}>
      <div className={style.formWrapper}>
        <div className={style.loginForm}>
          <p>Login</p>
          <span>Mocked form - just hit login!</span>
          <InputText placeholder="Username" />
          <InputText placeholder="Password" />
          <Link href={'/trackers'}>Login</Link>
        </div>
        <div className={style.registrationCta}>
          <Image width={95} height={95} src="user.svg" alt="register here" />
          <div className={style.ctaWrapper}>
            <p>Need an account?</p>
            <Link href={'#'} style={{ textDecoration: 'none' }}>
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
