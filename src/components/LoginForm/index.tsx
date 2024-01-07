import {InputText} from 'primereact/inputtext';
import {Password} from 'primereact/password';
import {Button} from 'primereact/button';
import style from './loginForm.module.scss';
import Image from 'next/image'
import Link from 'next/link';

type Props = {
    onLoginClick: () => void;
}

export default function LoginForm({onLoginClick}: Props) {

    return (<div className={style.formContainer}>
        <div className={style.formWrapper}>
            <div className={style.loginForm}>
                <p>Login</p>
                <InputText placeholder="Username"/>
                <Password  style={{width: '100%'}} placeholder="Password" toggleMask />
                <Link href={'/trackers'}>Login</Link>
            </div>
            <div className={style.registrationCta}>
                <Image width={95} height={95} src="user.svg" alt="register here"/>
                <div className={style.ctaWrapper}>
                    <p>Need an account?</p>
                    <Link href={"#"} style={{textDecoration: 'none'}}>Register here</Link>
                </div>
            </div>
        </div>
    </div>)
}